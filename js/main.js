var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

function preload() 
{
    game.load.audio('music','assets/music.wav');
    game.load.audio('deadSoundEffect','assets/dead.wav');
    //game.load.image('bird', 'assets/birdfly__000.png');
    game.load.spritesheet('bird', 'assets/bird.png', 712, 624);
    game.load.image('background', 'assets/background.png');
    game.load.image('bigCannon', 'assets/cannon ball.png');
    game.load.image('spikeball', 'assets/small cannon ball.png');
    game.load.image('fastball', 'assets/fast ball.png');
}

var bird;
var lives = 10;
var livesText;
var introText;
var timerText;
var youLoseText;
var bigCannon;
var spikeBall;
var bigCannonList = [];
var spikeBallList = [];
var stateText;
var music;
var deadSoundEffect;
var timer = 0;
var fastball;
var fastBalls = [];

function create() 
{
    //ADD BACKGROUND
    game.add.image(0,0, 'background');
   
    //ADD MUSIC AND SOUNDEFFECTS
    music = game.add.audio('music');
    deadSoundEffect = game.add.audio('deadSoundEffect');
    music.play();
   

    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    
    //ADD BIRD
    bird = game.add.sprite(400, 300, 'bird');
    //bird = game.add.sprite(400, 300, 'bird');
    bird.scale.setTo(0.1, 0.1);
   // bird.anchor.setTo(0.1, 0.1);
    var walk = bird.animations.add('walk');
    bird.animations.play('walk', 20, true);

    //Enable Arcade Physics for the bird
    game.physics.enable(bird, Phaser.Physics.ARCADE);

    // Tell it we don't want physics to manage the rotation
    bird.body.allowRotation = false;
    
    //ADD LIVES TEXT
    livesText = game.add.text(680, 550, 'Lives: 10', { font: "25px Arial", fill: "#e5e500", align: "left" });
    
   
     
    
   // ADD TIMER TEXT
    timerText = game.add.text(32, 550, 'Timer: 0', { font: "25px Arial", fill: "#e5e500", align: "left" });
    game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this);
    
    
    //Spawn cannon every 5 seconds
    game.time.events.loop(Phaser.Timer.SECOND * 5, spawnCannonBall, this);
    
    
   // Spawn spiked balls every 15 seconds
    game.time.events.loop(Phaser.Timer.SECOND * 15, spawnSpikeBall, this);
    
    // Spawn fast balls every 25 seconds
    game.time.events.loop(Phaser.Timer.SECOND * 25, spawnFastBall, this);

}

function spawnCannonBall()
{  
    bigCannon = game.add.sprite(game.world.randomX, game.world.randomY, 'bigCannon');
    bigCannon.scale.setTo(0.3, 0.3);
    game.physics.enable(bigCannon, Phaser.Physics.ARCADE);
    bigCannon.body.velocity.setTo(50,50);
    
    //  This makes the game world bounce-able
    bigCannon.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors. "1" is 100% energy return
    bigCannon.body.bounce.set(1);
    bigCannonList.push(bigCannon);
}


function spawnSpikeBall()
{  
    spikeBall = game.add.sprite(game.world.randomX, game.world.randomY, 'spikeball');
    spikeBall.scale.setTo(0.8, 0.8);
    game.physics.enable(spikeBall, Phaser.Physics.ARCADE);
    spikeBall.body.velocity.setTo(150,150);
    
    //  This makes the game world bounce-able
    spikeBall.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors. "1" is 100% energy return
    spikeBall.body.bounce.set(1);
    spikeBallList.push(spikeBall);
}

function spawnFastBall()
{  
    fastball = game.add.sprite(game.world.randomX, game.world.randomY, 'fastball');
    fastball.scale.setTo(0.2, 0.2);
    game.physics.enable(fastball, Phaser.Physics.ARCADE);
    fastball.body.velocity.setTo(250,250);
    
    //  This makes the game world bounce-able
    fastball.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors. "1" is 100% energy return
    fastball.body.bounce.set(1);
    fastBalls.push(fastball);
}

function updateTimer() 
{
    timer++;
    timerText.setText('Timer: ' + timer);
}

function cannonHitsBird(bigCannonList, bird)
{
    lives--;
    livesText.text = 'Lives: ' + lives;
    deadSoundEffect.play();
    bigCannonList.kill();
    if(lives == 0)
    {
        youLoseText = game.add.text(game.world.centerX, 300, 'YOU LOSE', { font: "40px Arial", fill: "#e5e500", align: "center" });
        youLoseText.anchor.setTo(0.5, 0.5);
    }
}

function spikeBallHitsBird(spikeBallList, bird)
{
    lives--;
    livesText.text = 'Lives: ' + lives;
    deadSoundEffect.play();
    spikeBallList.kill();
    if(lives == 0)
    {
        youLoseText = game.add.text(game.world.centerX, 300, 'YOU LOSE', { font: "40px Arial", fill: "#e5e500", align: "center" });
        youLoseText.anchor.setTo(0.5, 0.5);
    }
}


function fastBallHitsBird(fastBalls, bird)
{
    lives--;
    livesText.text = 'Lives: ' + lives;
    deadSoundEffect.play();
    fastBalls.kill();
    if(lives == 0)
    {
        youLoseText = game.add.text(game.world.centerX, 300, 'YOU LOSE', { font: "40px Arial", fill: "#e5e500", align: "center" });
        youLoseText.anchor.setTo(0.5, 0.5);
    }
}




function update() 
{

    game.physics.arcade.moveToPointer(bird, 60, game.input.activePointer, 300);
    game.physics.arcade.overlap(bigCannonList, bird, cannonHitsBird, null, this);
    game.physics.arcade.overlap(spikeBallList, bird, spikeBallHitsBird, null, this);
    game.physics.arcade.overlap(fastBalls, bird, fastBallHitsBird, null, this);
}

