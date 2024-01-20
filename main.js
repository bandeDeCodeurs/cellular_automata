function setup() {

    WIDTH = 1800;
    HEIGHT = 950;
    TILE_SIZE = 10;
    map = [];
    THRESHOLD = 4;

    createCanvas(WIDTH, HEIGHT);
    generateMap();
    drawMap();
    generateBorders();
}

function draw() {

}

function generateBorders() {

    for (let cx=0;cx<WIDTH/TILE_SIZE;cx++) {
        for (let cy=0;cy<HEIGHT/TILE_SIZE;cy++) {
            //If that's a land/wall
            if (map[cx][cy] == 0) {
                //we take four neigbours
                north = {dir:"north", x:cx, y:cy-1};
                east  = {dir:"east", x:cx+1, y:cy};
                south = {dir:"south", x:cx, y:cy+1};
                west  = {dir:"west", x:cx-1, y:cy};

                neighbours = [north, east, south, west];

                neighbours.forEach(n => {
                    
                    //we only want a neighbour in the map and a water one
                    if (n.x != -1 && 
                        n.y != -1 && 
                        n.x != WIDTH/TILE_SIZE && 
                        n.y != HEIGHT/TILE_SIZE && 
                        map[n.x][n.y] == 1
                        ) {

                        traceBorder(cx, cy, n.dir);
                    }
                });
            }
        }
    }
}

function traceBorder(x, y, dir) {

    switch(dir) {

        case "north" : {
            p1 = {x:x*TILE_SIZE, y:y*TILE_SIZE};
            p2 = {x:x*TILE_SIZE + TILE_SIZE, y:y*TILE_SIZE};
        }
        break;
        case "east" : {
            p1 = {x:x*TILE_SIZE + TILE_SIZE, y:y*TILE_SIZE};
            p2 = {x:x*TILE_SIZE + TILE_SIZE, y:y*TILE_SIZE + TILE_SIZE};
        }
        break;
        case "south" : {
            p1 = {x:x*TILE_SIZE, y:y*TILE_SIZE + TILE_SIZE};
            p2 = {x:x*TILE_SIZE + TILE_SIZE, y:y*TILE_SIZE + TILE_SIZE};
        }
        break;
        case "west" : {
            p1 = {x:x*TILE_SIZE, y:y*TILE_SIZE};
            p2 = {x:x*TILE_SIZE, y:y*TILE_SIZE + TILE_SIZE};
        }
        break;
    }

    stroke("#7f5430");
    line(p1.x, p1.y, p2.x, p2.y);
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
        generateBorders();
    }

    if (keyCode === RIGHT_ARROW) {

        iterateMap();
        drawMap();
        generateBorders();
    }  
}