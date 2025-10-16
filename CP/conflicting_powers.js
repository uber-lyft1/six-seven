// set up canvas
let cvs = document.getElementById("canvas");
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;


// make canvas dimentions into windows dimentions
cvs.width = WIDTH;
cvs.height = HEIGHT;


// set canvas to 2d, used for images, text, 2d animation
let ctx = cvs.getContext("2d");


// makes it the first thing in tab making it the first thing the focus accesses
cvs.setAttribute('tabindex',0);
// allows keyboard inputs without clicking on screen first
cvs.focus();


// creation of arguements
let game_started = false;
let firing_red = false;
let firing_blue = false;
let firstGame = true;


// creates an event listener that listens for keys to be held down
document.addEventListener("keydown", function(event) {
    handleKeyDown(event, 'red');
});


document.addEventListener("keydown", function(event) {
    handleKeyDown(event, 'blue');
});


// creates an event listener that listens for keys to be released
document.addEventListener("keyup", function(event) {
    handleKeyUp(event, 'red');
});


document.addEventListener("keyup", function(event) {
    handleKeyUp(event, 'blue');
});


// creates function for designated keys and what they do for when they are held down based on their color
function handleKeyDown(event, playerColor) {
    if (playerColor === 'red') {




        if (event.key == "ArrowRight") {
            myPlayerRed.rotate_turret_right_red();
        }
        if (event.key == "ArrowLeft") {
            myPlayerRed.rotate_turret_left_red();
        }
        if (event.key == "ArrowUp") {
            myPlayerRed.moveUp_red();
        }
        if (event.key == "ArrowDown") {
            myPlayerRed.moveDown_red();
        }
        if (event.key == ".") {
            firing_red = true;
        }
    }
    else if (playerColor === 'blue') {
       
        if (event.key == "d") {
            myPlayerBlue.rotate_turret_right_blue();
        }
        if (event.key == "a" || event.key == "A") {
            myPlayerBlue.rotate_turret_left_blue();
        }
        if (event.key == "w" || event.key == "W") {
            myPlayerBlue.moveUp_blue();
        }
        if (event.key == "s" || event.key == "S") {
            myPlayerBlue.moveDown_blue();
        }
        if (event.key == "z" || event.key == "Z") {
            firing_blue = true;
        }
    }
}


// creates function for when keys are released and what they do based on their color
function handleKeyUp(event, playerColor) {
    if (playerColor === 'red') {
        if (event.key == "ArrowRight") {
            myPlayerRed.rotate_turret_right_red();
        }
        if (event.key == "ArrowLeft") {
            myPlayerRed.rotate_turret_left_red();
        }
        if (event.key == "ArrowUp") {
            myPlayerRed.moveUp_red();
        }
        if (event.key == "ArrowDown") {
            myPlayerRed.moveDown_red();
        }
        if (event.key == ".") {
            firing_red = false;
        }
    }


        else if (playerColor === 'blue') {
        if (event.key == "d" || event.key == "D") {
            myPlayerBlue.rotate_turret_right_blue();
        }
        if (event.key == "a" || event.key == "A") {
            myPlayerBlue.rotate_turret_left_blue();
        }
        if (event.key == "w" || event.key == "W") {
            myPlayerBlue.moveUp_blue();
        }
        if (event.key == "s" || event.key == "S") {
            myPlayerBlue.moveDown_blue();
        }
        if (event.key == "z" || event.key == "Z") {
            firing_blue = false;
        }
    }  
}


// makes a universal class that creates the player with whatever dimentions inputed
class Player
{
    constructor(xpos,ypos,radius,color)
    {
        this.x = xpos;
        this.y = ypos;
        this.rad = radius;
        this.color = color;
        this.width = 3;


        if(this.color == "red"){
            this.angle = 180;
        }  
       
        if(this.color == "blue"){
            this.angle = 90;
        }  
        this.turret_length = 50;
        this.turret_color = "grey";
        this.turret_end_x = 0;
        this.turret_end_y = 0;
    }


    // draws any created object with the class onto the canvas in 2d
    draw(ctx)
    {
        ctx.fillStyle = this.color




        ctx.beginPath();
        if(this.color == "red")
        {
            ctx.arc(this.x , this.y , this.rad , -0.5*Math.PI , 0.5*Math.PI , true);
        }


        if(this.color == "blue")
        {
            ctx.arc(this.x , this.y , this.rad , 0.5*Math.PI , -0.5*Math.PI , true);
        }
        ctx.fill();
        ctx.closePath();


        // calculate and save turret end position
        if(this.color == "red")
        {
            this.turret_end_x = this.x + this.turret_length*Math.cos(this.angle*Math.PI/180);
            this.turret_end_y = this.y - this.turret_length*Math.sin(this.angle*Math.PI/180);
        }
       
        if(this.color == "blue")
        {
            this.turret_end_x = this.x + this.turret_length*Math.sin(this.angle*Math.PI/180);
            this.turret_end_y = this.y - this.turret_length*Math.cos(this.angle*Math.PI/180);
        }
       
        // draw turret from center of circle to a point
        ctx.strokeStyle = this.turret_color;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.x , this.y);
        ctx.lineTo(this.turret_end_x, this.turret_end_y);
        ctx.stroke();
        ctx.closePath();
    }
   
    // makes function to move red up
    moveUp_red()
    {
        if(this.y >= 5)
        {
            this.y = this.y - 5;
        }
    }
   
    // makes function to move red down
    moveDown_red()
    {
        if(this.y <= window.innerHeight - 5)
        {
            this.y = this.y + 5;
        }
       
    }
   
    // makes function to move red turret to the left
    rotate_turret_left_red()
    {
        if(this.angle <= 265)
        {
            this.angle = this.angle + 5;
        }
       
    }
   
    // makes function to move red turret to the right
    rotate_turret_right_red()
    {
        if(this.angle >= 95)
        {
            this.angle = this.angle - 5;
        }
    }
   
    // makes function to move blue up
    moveUp_blue()
    {
        if(this.y >= 5)
        {
            this.y = this.y - 5;
        }
    }
   
    // makes function to move blue down
    moveDown_blue()
    {
        if(this.y <= window.innerHeight - 5)
        {
            this.y = this.y + 5;
        }
       
    }    
   
    // makes function to move blue turret to the left
    rotate_turret_left_blue()
    {
        if(this.angle >= 5)
        {
            this.angle = this.angle - 5;
        }        
    }
   
    // makes function to move blue turret to the right
    rotate_turret_right_blue()
    {
        if(this.angle <= 175)
        {
            this.angle = this.angle + 5;
        }
    }
   
    // gets the x value of the end of the turret
    get_turret_end_x()
    {
        return this.turret_end_x;
    }
   
    // gets the y value of the end of the turret
    get_turret_end_y()
    {
        return this.turret_end_y;
    }
   
    // gets angle of the turret
    get_angle()
    {
        return this.angle;
    }
}


// makes a universal class that creates the bullets with whatever dimentions inputed
class bullet{
    constructor(xpos,ypos,radius,color,dx,dy)
    {
        this.x = xpos;
        this.y = ypos;
        this.rad = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.active = true;
    }
   
    // draws any created object with the class onto the canvas in 2d
    draw(ctx)
    {
        if(this.active)
        {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x , this.y , this.rad , 0 , 2*Math.PI , false);
            ctx.fill();
            ctx.closePath();
        }
    }
   
    // updates location, active status, and checks to see if new array without filtered powerups need to be made
    update()
    {
        if(this.active)
        {
            this.x = this.x + this.dx;
            this.y = this.y + this.dy;
        }
        if(this.active == false)
        {
            powerUps = powerUps.filter((powerUp) => {
                if (powerUp.y + powerUp.height >= HEIGHT && powerUp.active) {
                    return false;
                }
                return powerUp.y <= HEIGHT && powerUp.active;
            });
        }
    }
    // makes a function to check if powerups collide with anything anything and creates a new array without the items that were filtered
    checkCollision(powerUp) {
        if (this.active &&
            this.x + this.rad > powerUp.x - powerUp.width &&
            this.x - this.rad < powerUp.x + powerUp.width &&
            this.y + this.rad > powerUp.y - powerUp.height &&
            this.y - this.rad < powerUp.y + powerUp.height) {
               
                if (powerUp.width > 10 && powerUp.height > 2) {
                    let newWidth = powerUp.width / 2;
                    let newHeight = powerUp.height / 2;
                   
                    powerUps.push({ x: powerUp.x - 10, y: powerUp.y, width: newWidth, height: newHeight, active: true });
                powerUps.push({ x: powerUp.x + 10, y: powerUp.y, width: newWidth, height: newHeight, active: true });
            }
           
            this.active = false;
            powerUp.active = false;
            // calls updateScoreRed function
            if(this.color == "red")
            {
                updateScoreRed();
            }
            // calls updateScoreBlue function    
            if(this.color == "blue")
            {
                updateScoreBlue();
            }
           
        }
    }
   
}


// creation of variables, arrays, players
let score_red = 0;
let score_blue = 0;
let powerUps = [];
let bullets = [];
let scoreboard_red = document.getElementById("scoreboard_red");
let scoreboard_blue = document.getElementById("scoreboard_blue");
let myPlayerRed = new Player(WIDTH,HEIGHT/2,40,"red");
let myPlayerBlue = new Player(0,HEIGHT/2,40,"blue");


function updateScoreRed()
{
    score_red++;
    scoreboard_red.textContent = "Score " + score_red;
}


//creates function to update score and display score on screen
function updateScoreBlue()
{
    score_blue++;
    scoreboard_blue.textContent = "Score " + score_blue;
}


//creates function to update powerup values
function updatePowerUp() {
    powerUps.forEach((powerUp) => {
        let randomValue = Math.random();
       
        if (randomValue < 0.7) {
            powerUp.speed = Math.random() * 0.75;
        } else {
            powerUp.speed = Math.random() * 0.75;
        }
       
        powerUp.y += powerUp.speed;
    });
   
    if (Math.random() < 0.01) {
        let x = Math.random() * WIDTH;
        let width = 20;
        let height = 20;
        powerUps.push({ x: x, y: 0, width: width, height: height, active: true });
    }
   
}


//creates function to restart game
function restartGame() {
    redCanFire = true;
    blueCanFire = true;
    gameDuration = 60;
    myPlayerBlue.y = HEIGHT / 2;
    myPlayerRed.y = HEIGHT / 2;
    myPlayerBlue.angle = 90;
    myPlayerRed.angle = 180;
    score_red = 0;
    score_blue = 0;
    powerUps = [];
    bullets = [];
    scoreboard_red.textContent = "Score: " + score_red;
    scoreboard_blue.textContent = "Score: " + score_blue;
   
    document.getElementById("restartButton").style.display = "none";
   
    game_started = true;
    animate(game_started);
}


// makes new array without items that are filtered out
powerUps = powerUps.filter((powerUp) => {
    if (powerUp.y + powerUp.height >= HEIGHT && powerUp.active){
        return false;
    }
    return powerUp.y <= HEIGHT && powerUp.active;
});


// creates an event listener that listens for when restart button is clicked
document.getElementById("restartButton").addEventListener("click", restartGame);


// creation of variables and arguements
let redCanFire = true;  // Flag to check if the red turret can fire
let blueCanFire = true;  // Flag to check if the blue turret can fire
let fireCooldown = 420;  // Cooldown time in milliseconds
let gameDuration = 60; // 1 minute in seconds


// Function to update the game duration every second
function updateGameDuration() {
    gameDuration -= 1/60;
    if (gameDuration <= 0) {
        endGame();
        return game_started = false;
    }
    if(game_started){
        ctx.fillText("Time Remaining: " + Math.round(gameDuration), WIDTH / 2.4, 30);
        return firstGame = false;
    }
}


//sets interval for game duration to 1000 milliseconds or 1 second
setInterval(updateGameDuration, 1000);


//creates function to end game
function endGame() {
   
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", WIDTH / 2 - 100, HEIGHT / 2);
   
    ctx.fillStyle = "white";
    ctx.fillText("Red Score: " + score_red, WIDTH / 2 - 100, HEIGHT / 2 + 40);
    ctx.fillText("Blue Score: " + score_blue, WIDTH / 2 - 100, HEIGHT / 2 + 80);
   
    if (score_red > score_blue) {
        ctx.fillStyle = "gold";
        ctx.fillText("Red Wins!", WIDTH / 2 - 100, HEIGHT / 2 + 120);
    } else if (score_blue > score_red) {
        ctx.fillStyle = "gold";
        ctx.fillText("Blue Wins!", WIDTH / 2 - 100, HEIGHT / 2 + 120);
    } else {
        ctx.fillStyle = "gold";
        ctx.fillText("It's a tie!", WIDTH / 2 - 100, HEIGHT / 2 + 120);
    }


    redCanFire = false;
    blueCanFire = false;
    powerUps.active = false;
    bullets.active = false;


    document.getElementById("restartButton").style.display = "block";
}


//creates an event listener that listens for keypress and makes the game start
 document.addEventListener("keypress", function(event){
    if (event.key === " ") {
        if(!game_started && firstGame)
        {
            game_started = true;
            animate(game_started);
        }
    }
});


// calls animate with game_started in the parameters
animate(game_started);


//creates animate function which is the game loop
function animate(playing) {
    //clears the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);


    //displays instructions if parameters are met
    if (!playing && firstGame) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Press Space Bar once to Start", 50, 50);
        ctx.fillText("blue player moves by pressing W and S, aims by pressing A and D, and shoots by pressing z", 50 , 100);
        ctx.fillText("red player moves by pressing ↑ and ↓, aims by pressing ← and →, and shoots by pressing .", 50, 150);
        return;
    }
   
    //makes actual game start when parameters are met
    if(playing)
    {
        //updates bullets
        for (i = 0; i < bullets.length; i++) {
            bullets[i].update();
        }
       
       //calls functions that update powerups and game duration
        updatePowerUp();
        updateGameDuration(playing);


        //checks for collisions
        for (let i = 0; i < bullets.length; i++) {
            for (let n = 0; n < powerUps.length; n++) {
                bullets[i].checkCollision(powerUps[n]);
            }
       
        }


        //draws players on screen
        myPlayerBlue.draw(ctx);
        myPlayerRed.draw(ctx);


        //draws bullets
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].draw(ctx);
        }


        //makes the contexts fill style into gold
        ctx.fillStyle = "gold";


        //creates power ups
        if (Math.random < 0.1) {
            let x = Math.random() * WIDTH;
            let width = 20;
            let height = 20;
            let act = false;
            powerUps.push({ x: x, y: 0, width: width, height: height, active: act });
        }


        // creates powerups if active
        powerUps.forEach((powerUp) => {
            if (powerUp.active) {
                ctx.beginPath();
                ctx.ellipse(powerUp.x, powerUp.y, powerUp.width, powerUp.height, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        });


        //creates reds bullets if red is allowed to shoot
        if (firing_red && redCanFire) {
            let x = myPlayerRed.get_turret_end_x();
            let y = myPlayerRed.get_turret_end_y();
            let angle = myPlayerRed.get_angle();
            let dx = 5 * Math.cos(angle * Math.PI / 180);
            let dy = 5 * Math.sin(angle * Math.PI / 180);


            let bullet1 = new bullet(x, y, 3, "red", dx, -1 * dy);
            bullets.push(bullet1);


            redCanFire = false;
            setTimeout(() => {
                redCanFire = true;
            }, fireCooldown);
        }


        //creates blues bullets if blue is allowed to shoot
        if (firing_blue && blueCanFire) {
            let x = myPlayerBlue.get_turret_end_x();
            let y = myPlayerBlue.get_turret_end_y();
            let angle = myPlayerBlue.get_angle();
            let dx = 5 * Math.sin(angle * Math.PI / 180);
            let dy = 5 * Math.cos(angle * Math.PI / 180);


            let bullet1 = new bullet(x, y, 3, "blue",  dx, -1 *dy);
            bullets.push(bullet1);


            blueCanFire = false;
            setTimeout(() => {
                blueCanFire = true;
            }, fireCooldown);
        }
       
       // requests frame frame in advance to make animation smoother (chatgpt wrote this)
        requestAnimationFrame(() => animate(game_started));
    }
}
