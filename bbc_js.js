

// Initialise 
var gridSize = 20;
var dead = 0;
var alive = 0;
var bar = document.getElementById("myBar");
let grid1 = createArray(gridSize);
let newGrid = createArray(gridSize);
let filledGrid = setupGrid(grid1);
var animate;
var paused = true;
let speed = 300;
let userSpeed = 5;
toScreen(filledGrid);



//------------------------- Buttons -------------------------------------//

// Pause / Play
document.getElementById("it").addEventListener("click", function(){
    if (paused){
        iterate();
        this.innerHTML = "Pause";
    } else {
        this.innerHTML = "Play";
        clearInterval(animate);
        paused = true;
    }
});

document.getElementById("restart").addEventListener("click", function(){
    location.reload();
});


// Speed Increment
document.getElementById("up").addEventListener("click", function(){
    if (speed > 50 && userSpeed < 10){
        speed -= 50;
        userSpeed += 1;
        document.getElementById("speed").innerHTML = userSpeed;
    }

});

document.getElementById("down").addEventListener("click", function(){
    if (speed <= 450){
        speed += 50;
        userSpeed -= 1;
        // animate = setInterval(iterate, speed);
        document.getElementById("speed").innerHTML = userSpeed;
    }
});



//-------------------------- Functions ----------------------------------//

function createArray(rows) { //creates empty 2D array
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [rows];
    }
    return arr;
}

function setupGrid(grid){  // Fills empty array with random 0/1
    for (let i=0; i < gridSize; i++){
        for (let j =0; j < gridSize; j++){
            grid[i][j] = Math.round(Math.random());
            if (grid[i][j] == 1){
                alive += 1;
            } else{
                dead += 1;
            }
        }
    }
    var percentage = (dead/(alive+dead))*100; // calculates percentage for progress bar
    bar.style.width = percentage + '%';
    return grid;
}

function toScreen(grid){ // assigns div to each element in array. Add alive class if == 1;
    for (let i=0; i < gridSize; i++){
        for (let j =0; j < gridSize; j++){
            var div = document.createElement('div');
            if (grid[i][j] == 1){
                div.classList.add('alive');
            } else {
                div.classList.remove('alive');
            }
            div.addEventListener("click", function(){
                if (grid[i][j] == 1){
                    grid[i][j] = 0;
                    this.classList.remove('alive');
                } else{
                    grid[i][j] = 1;
                    this.classList.add('alive');
                }
            });
            document.getElementsByTagName('section')[0].appendChild(div);
            
        }
    }
}


function iterate(){  // Takes in grid and fills new grid with updated values. 
    paused = false;
    dead = 0;
    alive = 0;
    for (let i=1; i < gridSize-1; i++){
        for (let j =1; j < gridSize-1; j++){
            var sum = 0;
            sum += grid1[i - 1][j - 1]; 
            sum += grid1[i - 1][j]; 
            sum += grid1[i - 1][j + 1]; 
            sum += grid1[i + 1][j - 1]; 
            sum += grid1[i + 1][j]; 
            sum += grid1[i + 1][j + 1];
            sum += grid1[i][j - 1]; 
            sum += grid1[i][j + 1]; 

            switch (sum) { // Game of life logic 
                case 2:
                    newGrid[i][j] = grid1[i][j]; 
                    break;
                case 3:
                    newGrid[i][j] = 1;
                    break;
                default:
                    newGrid[i][j] = 0;
            }

            for (var x = 1; x < gridSize - 1; x++) {  // mirroring

                newGrid[x][0] = newGrid[x][gridSize];
                newGrid[x][gridSize] = newGrid[x][0]; 
                
                newGrid[0][x] = newGrid[gridSize - 1][x];
                newGrid[gridSize - 1][x] = newGrid[1][x];
    
            }
            if (newGrid[i][j] == 1){
                alive += 1;
            } else { 
                dead += 1;
            }
        } 
    }

    var percentage = (dead/(alive+dead))*100;
    bar.style.width = percentage + '%';
    var myNode = document.getElementsByTagName('section')[0];
    while (myNode.firstChild) { // remove current divs
        myNode.removeChild(myNode.firstChild);
    }
    toScreen(newGrid); // apply new divs
    grid1 = newGrid
    newGrid = createArray(gridSize);
    animate = window.setTimeout(iterate, speed);
}


