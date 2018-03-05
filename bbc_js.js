

// Initialise 
var gridHeight = 20;
var gridWidth = 20;
var dead = 0;
var alive = 0;
var bar = document.getElementById("myBar");
let theGrid = createArray(gridWidth);
let newGrid = createArray(gridWidth);
let  filledGrid = setupGrid(theGrid);
var animate;
var paused = true;
toScreen(filledGrid);
   



document.getElementById("it").addEventListener("click", function(){
    if (paused){
        animate = setInterval(iterate, 500);
        this.innerHTML = "Pause";
    } else {
        this.innerHTML = "Play";
        clearInterval(animate);
        paused = true;
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
    for (let i=0; i < gridHeight; i++){
        for (let j =0; j < gridHeight; j++){
            grid[i][j] = Math.round(Math.random());
            if (grid[i][j] == 1){
                alive += 1;
            } else{
                dead += 1;
            }
        }
    }
    var percentage = (dead/(alive+dead))*100;
    bar.style.width = percentage + '%';
    return grid;
}

function toScreen(grid){ // assigns square div to each element in array. Add alive class if == 1;
    for (let i=0; i < gridHeight; i++){
        for (let j =0; j < gridHeight; j++){
            var div = document.createElement('div');
            if (grid[i][j] == 1){
                div.classList.add('alive');
            } else {
                div.classList.remove('alive');
            }
            div.addEventListener("click", function(){
                console.log(grid[i][j]);
                if (grid[i][j] == 1){
                    grid[i][j] = 0;
                    this.classList.remove('alive');
                    console.log(grid[i][j] +  "now");
                } else{
                    grid[i][j] = 1;
                    this.classList.add('alive');
                    console.log(grid[i][j] +  "now");
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
    for (let i=1; i < gridHeight-1; i++){
        for (let j =1; j < gridHeight-1; j++){
            var sum = 0;
            //add up the total values for the surrounding cells
            sum += theGrid[i - 1][j - 1]; //top left
            sum += theGrid[i - 1][j]; //top center
            sum += theGrid[i - 1][j + 1]; //top right

            sum += theGrid[i][j - 1]; //middle left
            sum += theGrid[i][j + 1]; //middle right

            sum += theGrid[i + 1][j - 1]; //bottom left
            sum += theGrid[i + 1][j]; //bottom center
            sum += theGrid[i + 1][j + 1];

            switch (sum) {
                case 2:
                    newGrid[i][j] = theGrid[i][j];
                   
                    break;
                case 3:
                    newGrid[i][j] = 1; //live
                    
                    break;
                default:
                    newGrid[i][j] = 0; //
            }

            for (var l = 1; l < gridHeight - 1; l++) { //iterate through rows
                //top and bottom
                newGrid[l][0] = newGrid[l][gridHeight - 2];
                newGrid[l][gridHeight - 2] = newGrid[l][1];
                //left and right
                newGrid[0][l] = newGrid[gridHeight - 2][l];
                newGrid[gridHeight - 2][l] = newGrid[1][l];
    
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
    console.log(percentage);
    var myNode = document.getElementsByTagName('section')[0];
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);

    }
    toScreen(newGrid);
    theGrid = newGrid
    newGrid = createArray(gridWidth);
    
}


