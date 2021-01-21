
var config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#23cfcf',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var food;
var snake;
var cursors;
var score = 0;
var scoreText;
var foodscore=0;
var trampa;

//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('food', '../assets/manzanaverde.png');
    this.load.image('body', '../assets/snake.png');
    this.load.image('foodbad', '../assets/manzanaroja.png');
    this.load.image('obt', '../assets/trampa.png');
}

function create ()
{
    
    var trampa = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function trampa (scene, x, y)
        {
            Phaser.GameObjects.Image.call(this, scene)

            this.setTexture('obt');
            this.setPosition(x * 16, y * 16);
            this.setScale(0.06);
            this.setOrigin(0);
            

            

            scene.children.add(this);
        },
        trampaeat: function ()
        {
            
            foodscore=0;
           
            
            
            var x = Phaser.Math.Between(0, 39);
            var y = Phaser.Math.Between(0, 29);

            this.setPosition(x * 16, y * 16);
            
        }
    });
   // varible comidaaa
    var Food = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:
        //parametros de la primera comida
        function Food (scene, x, y)
        {
            Phaser.GameObjects.Image.call(this, scene)

            this.setTexture('food');
            this.setPosition(x * 16, y * 16);
            this.setOrigin(0);
            this.setScale(0.05);

           

            scene.children.add(this);
        },
           //cuandoe s comida esta cambia de lugar y se suman a los puajes
        eat: function ()
        {
            score += 1;
            foodscore+=1;
           
            
            
            var x = Phaser.Math.Between(0, 39);
            var y = Phaser.Math.Between(0, 29);

            this.setPosition(x * 16, y * 16);
            
        }

    });
    

    

    var Snake = new Phaser.Class({

        initialize:
 // se crea a la serpiente 
        function Snake (scene, x, y)
        {
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.add.group();

            this.head = this.body.create(x * 16, y * 16, 'body');
            this.head.setScale(0.05)
            this.head.setOrigin(0);
            ;

            this.alive = true;

            this.speed = 100;

            this.moveTime = 0;

            this.tail = new Phaser.Geom.Point(x, y);

            this.heading = RIGHT;
            this.direction = RIGHT;
        },

        update: function (time)
        {
            if (time >= this.moveTime)
            {
                return this.move(time);
            }
        },
      // limita los movimientos de la serpiente 
        faceLeft: function ()
        {
            if (this.direction === UP || this.direction === DOWN)
            {
                this.heading = LEFT;
            }
        },

        faceRight: function ()
        {
            if (this.direction === UP || this.direction === DOWN)
            {
                this.heading = RIGHT;
            }
        },

        faceUp: function ()
        {
            if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.heading = UP;
            }
        },

        faceDown: function ()
        {
            if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.heading = DOWN;
            }
        },

        move: function (time)
        {
            /**
            se sale de cualquiera de los lados y reaparece en el otro.
            */
            switch (this.heading)
            {
                case LEFT:
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                    break;

                case RIGHT:
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                    break;

                case UP:
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
                    break;

                case DOWN:
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
                    break;
            }

            this.direction = this.heading;

            //  Actualice los segmentos del cuerpo y coloque la última coordenada en esta
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);
            var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);
            if (hitBody)
            {
                console.log('dead');
                
                this.alive = false;

                return false;
            }
            else
            {
            //  Actualiza el temporizador listo para el siguiente movimiento
            this.moveTime = time + this.speed;

            return true;
        }
        },

        grow: function ()
        {
           
            
            var newPart = this.body.create(this.tail.x, this.tail.y, 'body');
            newPart.setScale(0.05);

            newPart.setOrigin(0);
        },

        collideWithFood: function (food)
        {
        
            if (this.head.x === food.x && this.head.y === food.y)
            {
                this.grow();
                
                food.eat();
               
                   
               
                scoreText.setText('Score: ' + score);
                
                if (this.speed > 20 && food.total % 5 === 0)
                {
                    this.speed -= 5;
                }

                return true;
                
            }
            else
            {
                return false;
            }
        },

        collideWithtrampa:function (trampa){
            if (this.head.x === trampa1.x && this.head.y === trampa1.y){
                console.log('dead');
                
                this.alive = false;
            }
            if (this.head.x === trampa2.x && this.head.y === trampa2.y){
                console.log('dead');
                
                this.alive = false;
            }
            if (this.head.x === trampa3.x && this.head.y === trampa3.y){
                console.log('dead');
                
                this.alive = false;
            }
            if (this.head.x === trampa4.x && this.head.y === trampa4.y){
                console.log('dead');
                
                this.alive = false;
            }
            if (this.head.x === trampa5.x && this.head.y === trampa5.y){
                console.log('dead');
                
                this.alive = false;
            }
            if (this.head.x === trampa6.x && this.head.y === trampa6.y){
                console.log('dead');
                
                this.alive = false;
            }
            if (foodscore===10){
trampa1.trampaeat();

trampa2.trampaeat();
trampa3.trampaeat();
trampa4.trampaeat();
trampa5.trampaeat();
trampa6.trampaeat();

foodscore=0;
}
if (this.head.x === trampa1.x && this.head.y === trampa1.y)
{
    
    
    }      

}

        

    });

    food = new Food(this, 3, 4);

    snake = new Snake(this, 8, 8);
   trampa1 = new trampa(this, 50, 50);
   trampa2 = new trampa(this, 50, 50);
   trampa3 = new trampa(this, 50, 50);
   trampa4 = new trampa(this, 50, 50);
   trampa5 = new trampa(this, 50, 50);
   trampa6 = new trampa(this, 50, 50);
   

    
   

   
 scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    
 //  Create our keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update (time, delta)
{
    if (!snake.alive)
    {
        return;
    }

    /**
    * Verifique qué tecla está presionada y luego cambie la dirección en la que la serpiente
    */
    if (cursors.left.isDown)
    {
        snake.faceLeft();
    }
    else if (cursors.right.isDown)
    {
        snake.faceRight();
    }
    else if (cursors.up.isDown)
    {
        snake.faceUp();
    }
    else if (cursors.down.isDown)
    {
        snake.faceDown();
    }

    if (snake.update(time))
    {
        
        
        snake.collideWithFood(food);
        snake.collideWithtrampa(trampa);
    }
    
        
        
}