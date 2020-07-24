<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drawlia</title>
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
        transition: transform .3s;
        position: relative;
    }

    img {
        width: 100vw;
        max-width: 100%;
        cursor: move;
    }

    canvas {
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
    <input id="grayscale" type="hidden" value="0" data-filter="grayscale" data-scale="%" style="display: hidden;"><br>
    <button id="grayscale-toggle">BW</button><br><br>
    <label>Grid Size</label>
    <input type="range" min="10" max="200" value="10" step="10" onchange="applyGrid(this.value)"> <br>
    <button id="posterize-toggle" value="1">Posterize</button><br>
    <br>

    <div id="container">
        <div id="slide">
            <img id="image" src="model.jpg" alt="Project Image" style="filter: none;"><br>
            <canvas id="c"></canvas>

        </div>
    </div>

    <!-- // The filter -->
    <svg>
        <filter id="posterize">
            <feComponentTransfer>
                <feFuncR type="discrete" tableValues="0 0.25 0.5 0.75 1" />
                <feFuncG type="discrete" tableValues="0 0.25 0.5 0.75 1" />
                <feFuncB type="discrete" tableValues="0 0.25 0.5 0.75 1" />
            </feComponentTransfer>
        </filter>
    </svg>


    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
    <script src="filters.js" type="text/javascript"></script>
</body>

</html>