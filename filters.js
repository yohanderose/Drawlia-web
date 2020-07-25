let Filters = (function () {
  let pub = {};

  // https://jsfiddle.net/xta2ccdt/13/
  function ScrollZoom(container, max_scale, factor) {
    var target = container.children().first();
    // console.log(target);
    var size = { w: target.width(), h: target.height() };
    var pos = { x: 0, y: 0 };
    var zoom_target = { x: 0, y: 0 };
    var zoom_point = { x: 0, y: 0 };
    var scale = 1;
    target.css("transform-origin", "0 0");
    target.on("mousewheel DOMMouseScroll", scrolled);

    var clicking = false;
    var previousX;
    var previousY;
    target.on("mousedown", (e) => {
      e.preventDefault();
      previousX = e.clientX;
      previousY = e.clientY;
      clicking = true;
    });
    target.on("mouseup", () => {
      clicking = false;
    });
    target.on("mouseleave", () => {
      clicking = false;
    });
    target.on("mousemove", pan);

    function pan(e) {
      if (clicking) {
        e.preventDefault();
        pos.x += -(previousX - e.clientX) * 2;
        pos.y += -(previousY - e.clientY) * 2;
        // console.log(pos);
        previousX = e.clientX;
        previousY = e.clientY;

        // Keep in bounds
        if (pos.x > 0) pos.x = 0;
        if (pos.x + size.w * scale < size.w) pos.x = -size.w * (scale - 1);
        if (pos.y > 0) pos.y = 0;
        if (pos.y + size.h * scale < size.h) pos.y = -size.h * (scale - 1);

        update();
      }
    }

    function scrolled(e) {
      var offset = container.offset();
      zoom_point.x = e.pageX - offset.left;
      zoom_point.y = e.pageY - offset.top;

      e.preventDefault();
      var delta = e.delta || e.originalEvent.wheelDelta;
      if (delta === undefined) {
        // we are on firefox
        delta = e.originalEvent.detail;
      }
      delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency

      // determine the point on where the slide is zoomed in
      zoom_target.x = (zoom_point.x - pos.x) / scale;
      zoom_target.y = (zoom_point.y - pos.y) / scale;

      // apply zoom
      scale += delta * factor * scale;
      scale = Math.max(1, Math.min(max_scale, scale));

      // calculate x and y based on zoom
      pos.x = -zoom_target.x * scale + zoom_point.x;
      pos.y = -zoom_target.y * scale + zoom_point.y;

      // Make sure the slide stays in its container area when zooming out
      if (pos.x > 0) pos.x = 0;
      if (pos.x + size.w * scale < size.w) pos.x = -size.w * (scale - 1);
      if (pos.y > 0) pos.y = 0;
      if (pos.y + size.h * scale < size.h) pos.y = -size.h * (scale - 1);

      update();
    }

    function update() {
      target.css(
        "transform",
        "translate(" +
          pos.x +
          "px," +
          pos.y +
          "px) scale(" +
          scale +
          "," +
          scale +
          ")"
      );
    }
  }

  window.applyGrid = function (size) {
    let c_canvas = document.getElementById("c");
    c_canvas.style.width = "100%";
    c_canvas.style.height = "100%";
    c_canvas.width = c_canvas.offsetWidth;
    c_canvas.height = c_canvas.offsetHeight;

    let context = c_canvas.getContext("2d");
    let width = $("#image").width();
    let height = $("#image").height();

    let s = parseInt(size);
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.strokeStyle = "pink";
    context.globalAlpha = 0.2;

    for (var y = 0.5; y < height; y += s) {
      for (var x = 0.5; x < width; x += s) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.moveTo(0, y);
        context.lineTo(width, y);
        //Diagonals
        context.moveTo(x, y);
        context.lineTo(x + s, y + s);
        context.moveTo(x + s, y);
        context.lineTo(x, y + s);
      }
    }

    context.stroke();
  };

  function drawProject(input, canvas, context, grayscale) {
    context.drawImage(base_image, 0, 0, canvas.width, canvas.height);
    if (grayscale) {
      var width = input.width;
      var height = input.height;
      var imgPixels = context.getImageData(0, 0, width, height);

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var i = y * 4 * width + x * 4;
          var avg =
            (imgPixels.data[i] +
              imgPixels.data[i + 1] +
              imgPixels.data[i + 2]) /
            3;
          imgPixels.data[i] = avg;
          imgPixels.data[i + 1] = avg;
          imgPixels.data[i + 2] = avg;
        }
      }

      context.putImageData(
        imgPixels,
        0,
        0,
        0,
        0,
        imgPixels.width,
        imgPixels.height
      );
    }
  }

  pub.setup = () => {
    var scroll_zoom = new ScrollZoom($("#container"), 4, 0.5);
    applyGrid(200);

    var grayscale = false;
    var canvas = document.getElementById("image");
    // Correct dpi - https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
    let dpi = window.devicePixelRatio;
    let style_height = +getComputedStyle(canvas)
      .getPropertyValue("height")
      .slice(0, -2);
    let style_width = +getComputedStyle(canvas)
      .getPropertyValue("width")
      .slice(0, -2);
    //scale the canvas
    canvas.setAttribute("height", style_height * dpi);
    canvas.setAttribute("width", style_width * dpi);

    var context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;

    base_image = new Image();
    base_image.src = "model.jpg";
    base_image.onload = function () {
      drawProject(base_image, canvas, context, grayscale);
    };

    // Filter application area
    $("#grayscale-toggle").on("click", () => {
      grayscale = !grayscale;
      drawProject(base_image, canvas, context, grayscale);
    });

    $("#posterize-toggle").on("click", () => {
      // console.log($("#posterize-toggle").attr("value"));
      let posterize = parseInt($("#posterize-toggle").attr("value"));
      if (posterize) {
        $("#image").css("filter", "url(#posterize)");
        $("#posterize-toggle").attr("value", "0");
      } else {
        $("#image").css("filter", "none");
        $("#posterize-toggle").attr("value", "1");
      }
    });
  };

  return pub;
})();

$(document).ready(Filters.setup);
