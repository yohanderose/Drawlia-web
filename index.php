<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drawlia</title>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
    <script src="filters.js" type="text/javascript"></script>
</head>

<body>
    <style>
    table>td {
        border: 1px solid #dfdfdf;
        padding: 0;
        margin: 0;
    }

    table.grxd {
        width: 100%;
        height: 100%;
    }

    #container {
        width: 100vw;
        height: auto;
        overflow: hidden;
    }

    #slide {
        width: 100%;
        height: 100%;
        position: relative;
        transition: transform .3s;
    }

    img {
        width: 100vw;
        height: auto;
        max-width: 100%;
        cursor: move;
    }

    canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, .0);
    }
    </style>

    <h1> DRAWLIA</h1>
    <label>Blur</label>
    <input type="range" min="0" max="10" value="0" step="1" onchange="applyFilter()" data-filter="blur"
        data-scale="px"><br>
    <label>Grid Size</label>
    <input type="range" min="10" max="100" value="10" step="10" onchange="applyGrid(this.value)"> <br>
    <input id="grayscale" type="hidden" value="0" data-filter="grayscale" data-scale="%" style="display: hidden;"><br>
    <button id="grayscale-toggle">BW</button><br>
    <br>

    <div id="container">
        <div id="slide">
            <img id="image" src="model.jpg" alt="Project Image"><br>
            <canvas id="c" width="500" height="375"></canvas>

        </div>
    </div>
</body>

</html>