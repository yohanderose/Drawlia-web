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

    #image {
        width: 100vw;
        max-width: 100%;
        cursor: move;
    }

    #c {
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, .0);
    }
    </style>

    <h1> DRAWLIA</h1>
    <button id="grayscale-toggle">BW</button><br><br>
    <label>Grid Size</label>
    <input id="grid-input" type="range" min="10" max="200" value="200" step="10" onchange="applyGrid(this.value)"> <br>
    <button id="posterize-toggle" value="1">Posterize</button><br>
    <br>

    <div id="container">
        <div id="slide">
            <canvas id="image" width="100vw" height="80vh"></canvas><br>
            <canvas id="c"></canvas>
        </div>
    </div>

    <!-- // The posterization filter -->
    <svg width="500" height="335" viewBox="0 0 500 335">
        <filter id="posterize">
            <feComponentTransfer>
                <feFuncR type="discrete" tableValues=".25 .4 .5 .75 1" />
                <feFuncG type="discrete" tableValues=".25 .4 .5 .75 1" />
                <feFuncB type="discrete" tableValues=".25 .4 .5 .75 1" />
            </feComponentTransfer>
        </filter>

    </svg>


    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
    <script src="filters.js" type="text/javascript"></script>
</body>

</html>