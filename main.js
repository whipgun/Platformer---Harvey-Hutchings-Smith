var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
 
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
 
function getDeltaTime()
{
        endFrameMillis = startFrameMillis;
        startFrameMillis = Date.now();
 
                // Find the delta time (dt) - the change in time since the last drawFrame
                // We need to modify the delta time to something we can use.
                // We want 1 to represent 1 second, so if the delta is in milliseconds
                // we divide it by 1000 (or multiply by 0.001). This will make our
                // animations appear at the right speed, though we may need to use
                // some large values to get objects movement and rotation correct
        var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
       
                // validate that the delta is within range
        if(deltaTime > 1)
                deltaTime = 1;
               
        return deltaTime;
}
 
 
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
 
var gameState = STATE_SPLASH;
 
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
 
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;
 
var chuckNorris = document.createElement("img");
chuckNorris.src = "hero.png";
 
var player = new Player();
var keyboard = new Keyboard();
 
var LAYER_COUNT = 3;
var LAYER_BACKGROUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_LADDERS = 2;

var MAP = {tw:80, th:20};
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

//Physics
var METER = TILE;
var GRAVITY = METER * 9.8 * 6;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 6;
var JUMP = METER * 1500;
 
var tileset = document.createElement("img");
tileset.src = "tileset.png";
 
function cellAtPixelCoord(layer, x,y)
{
	if(x<0 || x>SCREEN_WIDTH || y<0)
		return 1;
		// let the player drop of the bottom of the screen (this means death)
	if(y>SCREEN_HEIGHT)
		return 0;
		return cellAtTileCoord(layer, p2t(x), p2t(y));
};
function cellAtTileCoord(layer, tx, ty)
{
	if(tx<0 || tx>=MAP.tw || ty<0)
		return 1;
		// let the player drop of the bottom of the screen (this means death)
	if(ty>=MAP.th)
		return 0;
	return cells[layer][ty][tx];
};
function tileToPixel(tile)
{
	return tile * TILE;
};
function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
};
function bound(value, min, max)
{
	if(value < min)
		return min;
	if(value > max)
		return max;
		return value;
}
 
 
function drawMap()
{
        for(var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++)
        {
                var idx = 0;
                for( var y = 0; y < level1.layers[layerIdx].height; y++ )
                {
                        for( var x = 0; x < level1.layers[layerIdx].width; x++ )
                        {
                                if( level1.layers[layerIdx].data[idx] != 0 )
                                {
                                        // the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tileset id to get the
                                        // correct tile
                                        var tileIndex = level1.layers[layerIdx].data[idx] - 1;
                                        var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
                                        var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
                                        context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
                                }
                                idx++;
                        }
                }
        }
}
 
var cells = []; // the array that holds our simplified collision data
function initialize() {
 	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) { // initialize the collision map
 		cells[layerIdx] = [];
 		var idx = 0;
 		for(var y = 0; y < level1.layers[layerIdx].height; y++) {
 			cells[layerIdx][y] = [];
 			for(var x = 0; x < level1.layers[layerIdx].width; x++) {
 				if(level1.layers[layerIdx].data[idx] != 0) {
 					// for each tile we find in the layer data, we need to create 4 collisions
 					// (because our collision squares are 35x35 but the tile in the
					// level are 70x70)
 					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
 				}
 				else if(cells[layerIdx][y][x] != 1) {
					// if we haven't set this cell's value, then set it to 0 now
 					cells[layerIdx][y][x] = 0;
				}
 			idx++;
 			}
 		}
 	}
}
 
var splashTimer = 0
function runSplash(deltaTime)
{
        splashTimer -= deltaTime;
    if(splashTimer <= 0)
        {
            gameState = STATE_GAME;
            return;
        }
}
 
function runGame(deltaTime)
{
       
}
 
function run()
{
        context.fillStyle = "#ccc";
        context.fillRect(0, 0, canvas.width, canvas.height);
 
        var deltaTime = getDeltaTime();
 
        drawMap();
 
        //context.drawImage(chuckNorris, SCREEN_WIDTH/2 - chuckNorris.width/2, SCREEN_HEIGHT/2 - chuckNorris.height/2);
 
        player.update(deltaTime);
        player.draw();
 
        //update frame counter
        fpsTime += deltaTime;
        fpsCount++;
        if(fpsTime >= 1)
        {
                fpsTime -= 1;
                fps = fpsCount;
                fpsCount = 0;
        }
 
        //draw FPS
        context.fillStyle = "#f00";
        context.font = "14px Arial";
        context.fillText("FPS: " + fps, 5, 20, 100);
 
        switch(gameState)
    {
        case STATE_SPLASH:
                runSplash(deltaTime);
                break;
        case STATE_GAME:
                runGame(deltaTime);
                break;
        case STATE_GAMEOVER:
                runGameOver(deltaTime);
                break;
    }
}
 
initialize();
 
//-------------------- Don't modify anything below here
// This code will set up the framework so that the 'run' function is
// called 60 times per second. We have some options to fall back on
// in case the browser doesn't support our preferred method.
(function() {
 var onEachFrame;
 if (window.requestAnimationFrame) {
 onEachFrame = function(cb) {
 var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
 _cb();
 };
 } else if (window.mozRequestAnimationFrame) {
 onEachFrame = function(cb) {
 var _cb = function() { cb();
window.mozRequestAnimationFrame(_cb); }
 _cb();
 };
 } else {
 onEachFrame = function(cb) {
 setInterval(cb, 1000 / 60);
 }
 }
 
 window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);