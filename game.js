/*
  An experiement of responsive canvas design
  Inspired by Les James's Pen - http://codepen.io/lesjames/pen/hmzwG
*/

function init() {
  var terrainCanvas = document.getElementById('terrain');
  var playerCanvas = document.getElementById('player');
  var environmentCanvas = document.getElementById('environment');
  var hudCanvas = document.getElementById('hud');

  var tCtx = terrainCanvas.getContext('2d');
  var pCtx = playerCanvas.getContext('2d');
  var eCtx = environmentCanvas.getContext('2d');
  var hCtx = hudCanvas.getContext('2d');

  var previousSize = {width: terrainCanvas.width, height: terrainCanvas.height};
  var imageNumTiles = 16;
  var rowTileCount = 20;
  var colTileCount = 32;
  var tileSize = 32;
  var ground = [
    [172, 172, 172, 79, 34, 34, 34, 34, 34, 34, 34, 34, 56, 57, 54, 55, 56, 147, 67, 67, 68, 79, 79, 171, 172, 172, 173, 79, 79, 55, 55, 55],
    [172, 172, 172, 79, 34, 34, 34, 34, 34, 34, 146, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 142, 172, 159, 189, 79, 79, 55, 55, 55],
    [172, 172, 172, 79, 79, 34, 34, 34, 34, 34, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 159, 189, 79, 79, 79, 55, 55, 55],
    [188, 188, 188, 79, 79, 79, 79, 34, 34, 34, 36, 172, 172, 143, 142, 157, 79, 79, 79, 79, 79, 79, 187, 159, 189, 79, 79, 79, 55, 55, 55, 55],
    [79, 79, 79, 79, 79, 79, 79, 79, 34, 34, 36, 172, 159, 158, 172, 143, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 39, 51, 51, 51, 55, 55],
    [79, 79, 79, 79, 79, 79, 79, 79, 79, 34, 36, 172, 143, 142, 172, 172, 143, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 55],
    [79, 79, 79, 79, 79, 79, 79, 79, 79, 34, 52, 172, 172, 172, 172, 172, 172, 143, 156, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79],
    [79, 79, 79, 79, 79, 79, 79, 79, 79, 34, 52, 172, 172, 172, 172, 172, 172, 159, 188, 189, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79],
    [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 188, 158, 172, 172, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 187, 158, 159, 189, 79, 79, 79],
    [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 159, 188, 189, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
    [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
    [155, 142, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 187, 188, 188, 189, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
    [171, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 173, 79, 79, 79, 79],
    [171, 172, 143, 156, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 187, 189, 79, 79, 79, 79],
    [187, 188, 158, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79],
    [79, 79, 79, 188, 189, 79, 79, 79, 79, 79, 79, 155, 156, 156, 157, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 156],
    [34, 34, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 142, 172],
    [34, 34, 34, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172],
    [34, 34, 34, 34, 79, 79, 79, 79, 79, 79, 155, 172, 172, 159, 189, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 171, 172, 172],
    [34, 34, 34, 34, 34, 34, 79, 79, 79, 79, 171, 172, 172, 173, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 155, 142, 172, 172]
  ];
  var layer = [
    [0, 0, 32, 33, 0, 236, 0, 0, 236, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 0, 0, 32, 33],
    [0, 0, 48, 49, 0, 236, 220, 220, 236, 0, 0, 147, 72, 73, 70, 71, 72, 73, 83, 83, 84, 85, 0, 0, 0, 0, 0, 48, 49],
    [0, 0, 64, 65, 54, 0, 236, 236, 0, 0, 162, 163, 84, 89, 86, 87, 88, 89, 99, 99, 100, 101, 0, 0, 0, 0, 7, 112, 113],
    [0, 0, 80, 81, 70, 54, 55, 50, 0, 0, 0, 179, 100, 105, 102, 103, 104, 105, 0, 0, 0, 0, 0, 0, 16, 22, 23, 39],
    [0, 0, 96, 97, 86, 70, 65, 144, 193, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 49],
    [0, 0, 0, 0, 102, 86, 81, 160, 161, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 65, 174, 175, 67, 66, 54],
    [0, 0, 0, 0, 0, 102, 97, 176, 177, 0, 0, 37, 0, 252, 0, 0, 0, 201, 202, 0, 0, 0, 0, 0, 80, 81, 190, 191, 83, 82, 70, 71],
    [0, 0, 0, 0, 0, 0, 0, 48, 49, 0, 0, 53, 0, 0, 0, 0, 0, 217, 218, 0, 0, 0, 0, 0, 96, 97, 222, 223, 99, 98, 86, 87],
    [201, 202, 0, 0, 0, 0, 0, 64, 65, 66, 68, 69, 0, 0, 0, 0, 0, 233, 234, 0, 0, 0, 0, 0, 238, 239, 0, 0, 238, 239, 102, 103],
    [217, 218, 0, 0, 0, 0, 0, 80, 81, 82, 84, 85, 0, 0, 0, 0, 0, 249, 250, 0, 0, 0, 0, 0, 254, 255, 0, 0, 254, 255],
    [233, 234, 0, 0, 0, 0, 0, 96, 97, 98, 100, 101, 0, 0, 0, 0, 0, 0, 0],
    [249, 250, 0, 0, 201, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 238, 239, 0, 0, 238, 239],
    [0, 0, 0, 0, 217, 218, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 254, 255, 0, 0, 254, 255],
    [0, 0, 0, 0, 233, 234, 196, 197, 198],
    [2, 3, 4, 0, 249, 250, 228, 229, 230],
    [18, 19, 20, 8, 0, 0, 244, 245, 246, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 201, 202],
    [0, 35, 40, 24, 25, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 217, 218],
    [0, 0, 0, 40, 41, 20, 8, 9, 0, 0, 0, 0, 0, 0, 0, 16, 17, 18, 19, 20, 21, 0, 0, 0, 0, 0, 0, 0, 233, 234],
    [0, 0, 0, 0, 40, 19, 24, 25, 8, 9, 0, 0, 0, 0, 0, 48, 49, 50, 51, 52, 115, 3, 4, 0, 0, 0, 0, 0, 249, 250],
    [0, 0, 0, 0, 0, 0, 40, 41, 20, 21, 0, 0, 0, 0, 0, 64, 65, 66, 67, 52, 19, 19, 20, 21]
  ];
  var layer02 = [
    [0, 0, 0, 0, 0, 220, 0, 0, 220],
    [],
    [],
    [],
    [],
    [0, 0, 0, 0, 0, 0, 0, 0, 201, 202],
    [0, 0, 0, 0, 0, 0, 0, 0, 217, 218],
    [0, 0, 0, 0, 0, 0, 0, 0, 233, 234],
    [0, 0, 0, 0, 0, 0, 0, 0, 249, 250],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 196, 197, 198],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 228, 229, 230],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 245, 246],
    []
  ]

  imageLoader = new function() {
    this.backgroundSprite = new Image();
    this.sprite = new Image();

    // http://lunar.lostgarden.com/uploaded_images/ExteriorTest-760306.jpg
    this.backgroundSprite.setAttribute('data-small', 'http://sklambert.com/php/phpThumb/phpThumb.php?src=background.png&w=240');
    this.backgroundSprite.setAttribute('data-medium', 'http://sklambert.com/php/phpThumb/phpThumb.php?src=background.png&w=336');
    this.backgroundSprite.setAttribute('data-large', 'http://sklambert.com/php/phpThumb/phpThumb.php?src=background.png&w=512');

    // http://www.nes-snes-sprites.com/LegendofZeldaTheALinktothePastBruiceJuice.html
    this.sprite.setAttribute('data-small', 'http://sklambert.com/php/phpThumb/phpThumb.php?src=link.png&w=135');
    this.sprite.setAttribute('data-medium', 'http://sklambert.com/php/phpThumb/phpThumb.php?src=link.png&w=189');
    this.sprite.setAttribute('data-large', 'http://sklambert.com/php/phpThumb/phpThumb.php?src=link.png&w=288');

    this.backgroundSprite.onload = function() {
      previousSize = {width: terrainCanvas.width, height: terrainCanvas.height};
      terrainCanvas.width = playerCanvas.width = environmentCanvas.width = hudCanvas.width = imageLoader.backgroundSprite.width * 2;
      terrainCanvas.height = playerCanvas.height = environmentCanvas.height = hudCanvas.height = imageLoader.backgroundSprite.height / imageNumTiles * rowTileCount;
      tileSize = imageLoader.backgroundSprite.width / (colTileCount / 2);
      drawLevel();
      hud.draw();
      player.resize();
    }
    this.sprite.onload = function() {
      player.draw();
    }
  }

  window.imageLoader = imageLoader;

  player = new function() {
    this.x = 500;
    this.y = 400;
    this.speed = 2;

    var numFrames = 8;
    var frameNum = 0;
    var frameCount = 0;
    var frameRate = 5;
    var spriteRow = 3;

    this.draw = function() {
      pCtx.drawImage(imageLoader.sprite, (frameNum * tileSize), (spriteRow * tileSize), tileSize, tileSize, this.x, this.y, tileSize, tileSize);
    }

    this.move = function() {
      var newX = this.x;
      var newY = this.y;

      if (KEY_STATUS.left) {
        newX -= this.speed;
        spriteRow = 0;
      }
      else if (KEY_STATUS.right) {
        newX += this.speed;
        spriteRow = 2;
      }
      else if(KEY_STATUS.up) {
        newY -= this.speed;
        spriteRow = 1;
      }
      else if(KEY_STATUS.down) {
        newY += this.speed;
        spriteRow = 3;
      }
      else {
        frameCount = 0;
        frameNum = 8;
      }

      newX = limit(newX, 0, terrainCanvas.width - tileSize);
      newY = limit(newY, 0, terrainCanvas.height - tileSize);

      var row = Math.floor(newY / tileSize);
      var col = Math.floor(newX / tileSize);

      this.clear();

      if(!layer[row][col]) {
        this.x = newX;
        this.y = newY;
      }

      if (frameCount === frameRate-1) {
        frameNum = (frameNum+1) % numFrames;
      }
      frameCount = (frameCount+1) % frameRate;

      this.draw();
    }

    this.clear = function() {
      pCtx.clearRect(this.x-1, this.y-1, imageLoader.sprite.width+2, imageLoader.sprite.height+2);
    }

    this.resize = function() {
      this.clear();
      var xRatio = terrainCanvas.width / previousSize.width;
      this.x *= xRatio;
      this.y *= terrainCanvas.height / previousSize.height;
      this.speed *= xRatio;
      this.draw();
    }
  }

  function limit(num, min, max) {
    return Math.max(Math.min(num, max), min);
  }

  function drawLevel() {
    var tile, tileRow, tileCol;

    for (var i = 0; i < rowTileCount; i++) {
      for (var j = 0; j < colTileCount; j++) {
        tile = ground[i][j];
        if (tile) {
          tileRow = (tile / imageNumTiles) | 0;
          tileCol = (tile % imageNumTiles) | 0;
          tCtx.drawImage(imageLoader.backgroundSprite, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (j * tileSize), (i * tileSize), tileSize, tileSize);
        }

        tile = layer[i][j];
        if (tile) {
          tileRow = (tile / imageNumTiles) | 0;
          tileCol = (tile % imageNumTiles) | 0;
          eCtx.drawImage(imageLoader.backgroundSprite, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (j * tileSize), (i * tileSize), tileSize, tileSize);
        }

        tile = layer02[i][j];
        if (tile) {
          tileRow = (tile / imageNumTiles) | 0;
          tileCol = (tile % imageNumTiles) | 0;
          eCtx.drawImage(imageLoader.backgroundSprite, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (j * tileSize), (i * tileSize), tileSize, tileSize);
        }
      }
    }
  }

  hud = new function() {
    var offset = 2;
    var fontSize = 20;

    // Green bar
    var greenBarOutlineHeight = 10;
    var greenBarOutlineWidth = 8;
    var greenBarStart = {x: 102, y: 50};
    var greenBarSize = {x: 18, y: 70};
    var greenBarOutlineOne = {x: greenBarStart.x - offset, y: greenBarStart.y - greenBarOutlineHeight, w: greenBarSize.x + offset * 2, h: greenBarSize.y + greenBarOutlineHeight * 2};
    var greenBarOutlineTwo = {x: greenBarStart.x - greenBarOutlineWidth, y: greenBarStart.y - offset, w: greenBarSize.x + greenBarOutlineWidth * 2, h: greenBarSize.y + offset * 2};
    var greenBarOutlineThree = {x: (greenBarOutlineOne.x + greenBarOutlineTwo.x) / 2 - offset, y: (greenBarOutlineOne.y + greenBarOutlineTwo.y) / 2 - offset, w: (greenBarOutlineOne.w + greenBarOutlineTwo.w) / 2 + offset * 2, h: (greenBarOutlineOne.h + greenBarOutlineTwo.h) / 2 + offset * 2};

    // Weapon bar
    var weaponBarSize = 50;
    var weaponBarStart = {x: 133, y: 45};

    // Boomerang
    var boomerangLength = 24;
    var boomerangWidth = 8;
    var boomerangeStart = {x: 144, y: 56};

    // Gems
    var gemSize = 10;
    var gemStart = {x: 210, y: 35};
    var gemText = {x: 200, y: 70};

    // Bombs
    var bombStart = {x: 260, y: gemStart.y};
    var bombText= {x: 252, y: gemText.y};

    // Arrows
    var arrowStart = {x: 310, y: gemStart.y};
    var arrowText= {x: 295, y: gemText.y};

    // Life bar
    var offset = 2;
    var lifeBarWidth = 28;
    var lifeBarLineWidth = 2;
    var lifeBarOne = {x: 762, y: 40};
    var lifeBarTwo = {x: 836, y: 40};
    var lifeBarText = {x: 800, y: 50};

    // Heart
    var offset = 2;
    var heartFillOffset = 1;
    var heartFontSize = 22;
    var heartWidth = 25;
    var heartStart = {x: 705, y: 75};

    this.draw = function() {
      var xRatio = terrainCanvas.width / previousSize.width;
      var yRatio = terrainCanvas.width / previousSize.width;

      offset *= xRatio;
      fontSize *= xRatio;

      hCtx.font = fontSize + 'px "RetGanon"';

      /*
        Green bar
      */
      greenBarOutlineHeight *= yRatio;
      greenBarOutlineWidth *= xRatio;
      greenBarStart.x *= xRatio;
      greenBarStart.y *= yRatio;
      greenBarSize.x *= xRatio;
      greenBarSize.y *= yRatio;
      greenBarOutlineOne.x *= xRatio;
      greenBarOutlineOne.y *= yRatio;
      greenBarOutlineOne.w *= xRatio;
      greenBarOutlineOne.h *= yRatio;
      greenBarOutlineTwo.x *= xRatio;
      greenBarOutlineTwo.y *= yRatio;
      greenBarOutlineTwo.w *= xRatio;
      greenBarOutlineTwo.h *= yRatio;
      greenBarOutlineThree.x *= xRatio;
      greenBarOutlineThree.y *= yRatio;
      greenBarOutlineThree.w *= xRatio;
      greenBarOutlineThree.h *= yRatio;

      // Outline
      hCtx.fillStyle = "#000000";
      hCtx.fillRect(greenBarOutlineOne.x, greenBarOutlineOne.y, greenBarOutlineOne.w, greenBarOutlineOne.h);
      hCtx.fillRect(greenBarOutlineTwo.x, greenBarOutlineTwo.y, greenBarOutlineTwo.w, greenBarOutlineTwo.h);
      hCtx.fillRect(greenBarOutlineThree.x, greenBarOutlineThree.y, greenBarOutlineThree.w, greenBarOutlineThree.h);

      hCtx.fillStyle = "#FFFFFF";
      hCtx.fillRect(greenBarOutlineOne.x + offset, greenBarOutlineOne.y + offset, greenBarOutlineOne.w - offset * 2, greenBarOutlineOne.h - offset * 2);
      hCtx.fillRect(greenBarOutlineTwo.x + offset, greenBarOutlineTwo.y + offset, greenBarOutlineTwo.w - offset * 2, greenBarOutlineTwo.h - offset * 2);
      hCtx.fillRect(greenBarOutlineThree.x + offset, greenBarOutlineThree.y + offset, greenBarOutlineThree.w - offset * 2, greenBarOutlineThree.h - offset * 2);

      // Inside
      hCtx.fillStyle = "#000000";
      hCtx.fillRect(greenBarStart.x - offset, greenBarStart.y, greenBarSize.x + offset * 2, greenBarSize.y);
      hCtx.fillRect(greenBarStart.x, greenBarStart.y - offset, greenBarSize.x, greenBarSize.y + offset * 2);

      hCtx.fillStyle = "#21c629";
      hCtx.fillRect(greenBarStart.x, greenBarStart.y, greenBarSize.x, greenBarSize.y);

      hCtx.fillStyle = "#FFFFFF";
      hCtx.fillRect(greenBarStart.x + offset, greenBarStart.y, greenBarSize.x - offset * 2, offset);

      /*
        Weapon box
      */
      weaponBarSize *= xRatio;
      weaponBarStart.x *= xRatio;
      weaponBarStart.y *= yRatio;

      hCtx.fillStyle = "#e7ad00";
      hCtx.fillRect(weaponBarStart.x, weaponBarStart.y, weaponBarSize, weaponBarSize - offset * 2);
      hCtx.fillRect(weaponBarStart.x + offset, weaponBarStart.y - offset, weaponBarSize - offset * 2, weaponBarSize);

      hCtx.fillStyle = "#FFFFFF";
      hCtx.fillRect(weaponBarStart.x + offset, weaponBarStart.y + offset, weaponBarSize - offset * 2, weaponBarSize - offset * 4);
      hCtx.fillRect(weaponBarStart.x + offset * 2, weaponBarStart.y, weaponBarSize - offset * 4, weaponBarSize - offset * 2);

      hCtx.fillStyle = "#000000";
      hCtx.fillRect(weaponBarStart.x + offset * 2, weaponBarStart.y + offset * 2, weaponBarSize - offset * 4, weaponBarSize - offset * 6);
      hCtx.fillRect(weaponBarStart.x + offset * 3, weaponBarStart.y + offset, weaponBarSize - offset * 6, weaponBarSize - offset * 4);

      /*
        Boomerang
      */
      boomerangLength *= xRatio;
      boomerangWidth *= xRatio;
      boomerangeStart.x *= xRatio;
      boomerangeStart.y *= yRatio;

      hCtx.fillStyle = "#4a73d6";
      hCtx.fillRect(boomerangeStart.x, boomerangeStart.y, boomerangLength, boomerangWidth);
      hCtx.fillRect(boomerangeStart.x - offset, boomerangeStart.y + offset, boomerangLength + offset, boomerangWidth / 2);
      hCtx.fillRect(boomerangeStart.x + boomerangLength - boomerangWidth + offset, boomerangeStart.y + offset, boomerangWidth, boomerangLength);
      hCtx.fillRect(boomerangeStart.x + boomerangLength - boomerangWidth + offset * 2, boomerangeStart.y + offset, boomerangWidth / 2, boomerangLength + offset);
      hCtx.fillRect(boomerangeStart.x + boomerangLength - boomerangWidth, boomerangeStart.y + boomerangWidth, offset, offset);

      hCtx.fillStyle = "#FFFFFF";
      hCtx.fillRect(boomerangeStart.x, boomerangeStart.y, boomerangLength, boomerangWidth / 2);
      hCtx.fillRect(boomerangeStart.x + boomerangLength - offset, boomerangeStart.y + offset, boomerangWidth / 2, boomerangLength);

      hCtx.fillStyle = "#000000";
      hCtx.fillRect(boomerangeStart.x, boomerangeStart.y + offset, boomerangLength - offset, offset);
      hCtx.fillRect(boomerangeStart.x + boomerangLength - offset, boomerangeStart.y + offset * 2, offset, boomerangLength - offset);

      /*
        Gems
      */
      gemSize *= xRatio;
      gemStart.x *= xRatio;
      gemStart.y *= yRatio;
      gemText.x *= xRatio;
      gemText.y *= xRatio;

      hCtx.fillStyle = "#000000";
      hCtx.fillRect(gemStart.x, gemStart.y, gemSize, gemSize);
      hCtx.fillRect(gemStart.x - offset, gemStart.y + offset, gemSize, gemSize);
      hCtx.fillRect(gemStart.x - offset * 2, gemStart.y + offset * 2, gemSize, gemSize);
      hCtx.fillRect(gemStart.x - offset * 3, gemStart.y + offset * 3, gemSize, gemSize);

      hCtx.fillStyle = "#24cd2e";
      hCtx.fillRect(gemStart.x, gemStart.y + offset, gemSize - offset, gemSize - offset);
      hCtx.fillRect(gemStart.x - offset, gemStart.y + offset * 2, gemSize - offset, gemSize - offset);
      hCtx.fillRect(gemStart.x - offset * 2, gemStart.y + offset * 3, gemSize - offset, gemSize - offset);

      hCtx.fillStyle = "#000000";
      hCtx.fillRect(gemStart.x - offset, gemStart.y + offset * 5, offset * 2, offset);
      hCtx.fillRect(gemStart.x + offset, gemStart.y + offset * 4, offset, offset);
      hCtx.fillRect(gemStart.x + offset * 2, gemStart.y + offset * 3, offset, offset);
      hCtx.fillText("207", gemText.x + offset, gemText.y + offset);

      hCtx.fillStyle = "#FFFFFF";
      hCtx.fillRect(gemStart.x + offset, gemStart.y + offset, offset * 3, offset);
      hCtx.fillRect(gemStart.x, gemStart.y + offset * 2, offset * 2, offset);
      hCtx.fillRect(gemStart.x - offset, gemStart.y + offset * 3, offset * 2, offset);
      hCtx.fillRect(gemStart.x - offset, gemStart.y + offset * 3, offset, offset * 2);
      hCtx.fillRect(gemStart.x + offset, gemStart.y + offset * 5, offset, offset);
      hCtx.fillRect(gemStart.x + offset * 2, gemStart.y + offset * 4, offset, offset);
      hCtx.fillText("207", gemText.x, gemText.y);

      /*
        Bombs
      */
      bombStart.x *= xRatio;
      bombStart.y = gemStart.y;
      bombText.x *= xRatio;
      bombText.y = gemText.y;

      hCtx.fillStyle = "#000000";
      hCtx.fillRect(bombStart.x, bombStart.y, offset * 2, offset);
      hCtx.fillRect(bombStart.x + offset * 2, bombStart.y + offset, offset, offset);
      hCtx.fillRect(bombStart.x - offset * 2, bombStart.y + offset, offset * 4, offset * 7);
      hCtx.fillRect(bombStart.x - offset * 3, bombStart.y + offset * 2, offset * 6, offset * 5);
      hCtx.fillRect(bombStart.x - offset * 4, bombStart.y + offset * 3, offset * 8, offset * 3);
      hCtx.fillText("10", bombText.x + offset, bombText.y + offset);

      hCtx.fillStyle = "#547edb";
      hCtx.fillRect(bombStart.x - offset * 2, bombStart.y + offset * 2, offset * 4, offset * 5);
      hCtx.fillRect(bombStart.x - offset * 3, bombStart.y + offset * 3, offset * 6, offset * 3);

      hCtx.fillStyle = "#FFFFFF";
      hCtx.fillRect(bombStart.x, bombStart.y + offset, offset * 2, offset);
      hCtx.fillRect(bombStart.x - offset, bombStart.y + offset * 2, offset, offset);
      hCtx.fillRect(bombStart.x + offset, bombStart.y + offset * 3, offset, offset * 2);
      hCtx.fillText("10", bombText.x, bombText.y);

      hCtx.fillStyle = "#000000";
      hCtx.fillRect(bombStart.x, bombStart.y + offset * 2, offset, offset);
      hCtx.fillRect(bombStart.x - offset, bombStart.y + offset * 3, offset, offset);

      /*
        Arrows
      */
      arrowStart.x *= xRatio;
      arrowStart.y = gemStart.y;
      arrowText.x *= xRatio;
      arrowText.y = gemText.y;

      hCtx.fillStyle = "#000000";
      hCtx.fillRect(arrowStart.x, arrowStart.y, offset * 3, offset * 3);
      hCtx.fillRect(arrowStart.x + offset * 3, arrowStart.y + offset, offset, offset);
      hCtx.fillRect(arrowStart.x + offset, arrowStart.y + offset * 3, offset, offset);
      hCtx.fillRect(arrowStart.x - offset * 3, arrowStart.y + offset, offset * 3, offset * 3);
      hCtx.fillRect(arrowStart.x - offset * 6, arrowStart.y + offset * 2, offset * 3, offset * 3);
      hCtx.fillRect(arrowStart.x - offset * 8, arrowStart.y + offset * 3, offset * 2, offset * 3);
      hCtx.fillRect(arrowStart.x - offset * 9, arrowStart.y + offset * 1, offset * 3, offset * 4);
      hCtx.fillRect(arrowStart.x - offset * 10, arrowStart.y + offset * 2, offset * 3, offset * 2);
      hCtx.fillRect(arrowStart.x - offset * 5, arrowStart.y + offset * 5, offset, offset * 2);
      hCtx.fillRect(arrowStart.x - offset * 8, arrowStart.y + offset * 7, offset * 3, offset);
      hCtx.fillRect(arrowStart.x - offset * 9, arrowStart.y + offset * 6, offset, offset);
      hCtx.fillText("00", arrowText.x + offset, arrowText.y + offset);

      hCtx.fillStyle = "#cd6f00";
      hCtx.fillRect(arrowStart.x, arrowStart.y + offset, offset * 3, offset);
      hCtx.fillRect(arrowStart.x + offset, arrowStart.y + offset * 2, offset, offset);
      hCtx.fillRect(arrowStart.x - offset * 3, arrowStart.y + offset * 2, offset * 3, offset);
      hCtx.fillRect(arrowStart.x - offset * 6, arrowStart.y + offset * 3, offset * 3, offset);
      hCtx.fillRect(arrowStart.x - offset * 8, arrowStart.y + offset * 4, offset * 2, offset);

      hCtx.fillStyle = "#b6b6b6";
      hCtx.fillRect(arrowStart.x - offset * 9, arrowStart.y + offset * 2, offset * 3, offset);
      hCtx.fillRect(arrowStart.x - offset * 9, arrowStart.y + offset * 3, offset, offset);
      hCtx.fillRect(arrowStart.x - offset * 8, arrowStart.y + offset * 6, offset * 3, offset);
      hCtx.fillRect(arrowStart.x - offset * 6, arrowStart.y + offset * 5, offset, offset);

      hCtx.fillStyle = "#FFFFFF";
      hCtx.fillText("00", arrowText.x, arrowText.y);

      /*
        Life Bar
      */
      lifeBarWidth *= xRatio;
      lifeBarLineWidth *= yRatio;
      lifeBarOne.x *= xRatio;
      lifeBarOne.y *= yRatio;
      lifeBarTwo.x *= xRatio;
      lifeBarTwo.y *= yRatio;
      lifeBarText.x *= xRatio;
      lifeBarText.y *= yRatio;

      hCtx.lineWidth = lifeBarLineWidth;

      hCtx.fillStyle = "#000000";
      hCtx.strokeStyle = "#000000";
      hCtx.fillText("LIFE", lifeBarText.x + offset, lifeBarText.y + offset);
      hCtx.beginPath();
      hCtx.moveTo(lifeBarOne.x - offset, lifeBarOne.y + offset);
      hCtx.lineTo(lifeBarOne.x + lifeBarWidth + offset, lifeBarOne.y + offset);
      hCtx.moveTo(lifeBarTwo.x - offset, lifeBarTwo.y + offset);
      hCtx.lineTo(lifeBarTwo.x + lifeBarWidth + offset, lifeBarTwo.y + offset);
      hCtx.stroke();

      hCtx.fillStyle = "#FFFFFF";
      hCtx.strokeStyle = "#FFFFFF";
      hCtx.fillText("LIFE", lifeBarText.x, lifeBarText.y);
      hCtx.beginPath();
      hCtx.moveTo(lifeBarOne.x, lifeBarOne.y);
      hCtx.lineTo(lifeBarOne.x + lifeBarWidth, lifeBarOne.y);
      hCtx.moveTo(lifeBarTwo.x, lifeBarTwo.y);
      hCtx.lineTo(lifeBarTwo.x + lifeBarWidth, lifeBarTwo.y);
      hCtx.stroke();

      /*
        Hearts
      */
      heartFillOffset *= xRatio
      heartFontSize *= xRatio;
      heartWidth *= xRatio;
      heartStart.x *= xRatio;
      heartStart.y *= yRatio;

      hCtx.font = heartFontSize + 'px "RetGanon"';

      for (x = 0; x < 4; x++) {
        hCtx.fillText("*", heartStart.x + heartWidth * x, heartStart.y);
      }

      // Fill heart
      hCtx.fillStyle = "#c60000";
      hCtx.font = (heartFontSize - offset)+ 'px "RetGanon"';

      for (x = 0; x < 4; x++) {
        hCtx.fillText("#", heartStart.x + heartWidth * x + heartFillOffset, heartStart.y - heartFillOffset);
      }
    }
  }

  function animate() {
    requestAnimFrame(animate);

    player.move();
  }

  window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback, element){
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  // Key Code code by Doug McInnes
  KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  }

  KEY_STATUS = {};
  for (code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
  }

  document.onkeydown = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
      e.preventDefault();
      KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
  }

  document.onkeyup = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
      e.preventDefault();
      KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
  }

  function pressDown(event) {
    var X = event.offsetX || event.layerX;
    var Y = event.offsetY || event.layerY;
    var hud = $('#hud');

    var A = {x: 0, y:0};
    var B = {x: hud.width(), y: hud.height()};
    var C = {x: hud.width(), y: 0};
    var D = {x: 0, y: hud.height()};
    var topBottom = ( (B.x - A.x)*(Y-A.y) - (B.y-A.y)*(X-A.x));
    var leftRight = ( (D.x - C.x)*(Y-C.y) - (D.y-C.y)*(X-C.x));

    if (topBottom > 0) {
      if (leftRight > 0) {
        KEY_STATUS['left'] = true;
      }
      else {
        KEY_STATUS['down'] = true;
      }
    }
    else {
      if (leftRight > 0) {
        KEY_STATUS['up'] = true;
      }
      else {
        KEY_STATUS['right'] = true;
      }
    }
  }

  function pressUp(event) {
    for (key in KEY_STATUS) {
      KEY_STATUS[key] = false;
    }
  }

  var touchLayer = document.getElementById('hud');
  touchLayer.addEventListener('touchstart', pressDown);
  touchLayer.addEventListener('touchend', pressUp);

  function onResize(event) {
    setSource();
  }

  function getBreakpoint() {
    if (window.innerWidth < 479) {
      return { "current": "small", "all": ["small"] };
    }
    else if (window.innerWidth < 639) {
      return { "current": "medium", "all": ["small", "medium"] };
    }
    else {
      return { "current": "large", "all": ["small", "medium", "large"] };
    }
  }

  function setSource() {
    label = getBreakpoint();
    for (i in imageLoader) {
      var source = imageLoader[i].getAttribute('data-' + label.current);
      if (source != imageLoader[i].src) {
        imageLoader[i].src = source;
      }
    }
  }

  $(window).on('resize', onResize);

  setSource();
  animate();
}

document.addEventListener("DOMContentLoaded", init);