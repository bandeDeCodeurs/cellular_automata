function setup() {

    WIDTH = 1500;
    HEIGHT = 830;
    TILE_SIZE = 10;
    map = [];
    THRESHOLD = 4;

    createCanvas(WIDTH, HEIGHT);
    generateMap();
    drawMap();
    //print(getNeighbours(0,0));
}

function draw() {

}

function generateMap(density=.5) {

    for (let x=0;x<WIDTH/TILE_SIZE;x++) {
        map[x] = [];
        for (let y=0;y<HEIGHT/TILE_SIZE;y++) {
            rd = int(random(10) + 1)
            map[x][y] = (rd <= density * 10) ? 0 : 1;
        }
    }
}

function drawMap() {

    noStroke();

    for (let x=0;x<WIDTH/TILE_SIZE;x++) {
        for (let y=0;y<HEIGHT/TILE_SIZE;y++) {
            if (map[x][y] == 0)
                fill(206, 136, 78);
            else
                fill(36, 134, 214);
            rect(x*TILE_SIZE,y*TILE_SIZE,TILE_SIZE,TILE_SIZE);
        }
    }
}

function iterateMap() {

    new_map = [];

    for (let x=0;x<WIDTH/TILE_SIZE;x++) {
        new_map[x] = [];
        for (let y=0;y<HEIGHT/TILE_SIZE;y++) {
            
            neighbours = getNeighbours(x,y);
            sum = neighbours.reduce((partialSum, a) => partialSum + a, 0);
            new_map[x][y] = (sum <= THRESHOLD) ? 1 : 0;
        }
    }

    print(sum)

    map = new_map;
}

function getNeighbours(cx,cy) {

    let res = [];

    for (let x = cx-1;x<=cx+1;x++) {
        for (let y = cy-1;y<=cy+1;y++) {
            // We don't want middle cell (this is cx and cy)
            if (x != 0 && y != 0) {
                //outside the map, so considers as a wall
                if (x == -1 || y == -1 || x == WIDTH/TILE_SIZE || y == HEIGHT/TILE_SIZE)
                    res.push(0);
                else
                    res.push(map[x][y]);
            }
        }
    }

    return res
}

function keyReleased() {
    //Space bar
    if (keyCode === 32) {
        
        generateMap();
        drawMap();
    }

    if (keyCode === RIGHT_ARROW) {

        iterateMap();
        drawMap();
    }
}