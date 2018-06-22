let Engine = (function (global) {

    let doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
    canvas.width = 606;
    canvas.height = 600;
    doc.body.appendChild(canvas);

    // Entry point
    function main() {

        let now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    }

// Initial settings
    function init() {

        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

// Update all objects
    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
        stone.update();
    }

    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        let rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png',    // Row 2 of 2 of grass
                'images/char-boy.png',
                'images/char-cat-girl.png',
                'images/char-horn-girl.png',
                'images/char-pink-girl.png',
                'images/char-princess-girl.png'
            ],
            numRows = 7,
            numCols = 6,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw initial game on canvas
        for (row = 0; row < numRows - 1; row++) {
            for (col = 1; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        let count = 0;
        for (let a = 6; a <= 10; a++) {
            ctx.drawImage(Resources.get(rowImages[a]), 0, count * 110);
            count++;
        }
        renderEntities();
    }

    // Render all objects
    function renderEntities() {

        allEnemies.forEach(function (enemy) {
            enemy.render();
        });

        player.render();
        stone.render();
        star.render();
    }

    // Load all the required images
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Rock.png',
        'images/Star.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;


    // Select which player you want to play
    function selectSprite() {
        let canvasArea = document.getElementsByTagName('canvas');
        canvasArea[0].onclick = function (event) {
            if (event.layerX < 110 && event.layerY > 500) {
                player.sprite = 'images/char-princess-girl.png';
            }
            else if (event.layerX < 110 && event.layerY > 400) {
                player.sprite = 'images/char-pink-girl.png';
            }
            else if (event.layerX < 110 && event.layerY > 300) {
                player.sprite = 'images/char-horn-girl.png';
            }
            else if (event.layerX < 110 && event.layerY > 200) {
                player.sprite = 'images/char-cat-girl.png';
            }
            else if (event.layerX < 110 && event.layerY > 100) {
                player.sprite = 'images/char-boy.png';
            }

        };
    }

    selectSprite();
    let bodySelect = document.getElementsByTagName('body');
    let divNode = doc.createElement('DIV');
    divNode.setAttribute('id', 'score');
    bodySelect[0].appendChild(divNode);

})(this);
