
class SceneA extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'sceneA' });
    }

    preload (){
        this.load.path = './assets/';
        this.load.image('studio', 'studio.jpg');
    }

    create ()
    {
       
        this.imageObject = this.add.image(
            900,//x
            500,
            'studio',//imagename
        )
        this.imageObject.scale = 1;

        //fade in and out 
        {
            this.tweens.add({
                targets: this.imageObject,
                ease: 'Sine.easeInOut',
                repeat: -1,
                duration: 1000
            });

        this.input.on('pointerdown', () => this.scene.start('sceneB'));
    }
}
}

class SceneB extends Phaser.Scene
{
    polygons;
    seedPolygon;
    graphics;
    

    constructor ()
    {
        super({ key: 'sceneB' });
        backgroundColor: '#000000'
    }

    preload ()
    {
        this.load.path = './assets/';
        this.load.audio('BGM', 'bgm.mp3');
        this.load.audio('start sound', 'start sound.wav');
        this.load.image('Title', 'Title.png');
    }

    create ()
    {

        const line = new Phaser.Geom.Line(0, 600, 1500, 0);

        const graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

        graphics.strokeLineShape(line);

        this.cameras.main.fadeIn(1000, 0,0,0);
        let sound = this.sound.add('BGM');
        sound.play();

        this.imageObject = this.add.image(
            1100,//x
            400,
            'Title',//imagename
        )

        this.imageObject.setScale(0.4);


        let box = this.add.text(
            1000, //x
            500,//y
            `   Press any button to continue..

            OPTIONS

            CREDITS

            QUIT`, //text
            {
                font: "35px Playfair",
                color: "#ffffff",
            }
        );

        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xe6ff05 } });

        this.seedPolygon = new Phaser.Geom.Polygon([
            new Phaser.Geom.Point(50, 50),
            new Phaser.Geom.Point(150, 100),
            new Phaser.Geom.Point(100, 150),
            new Phaser.Geom.Point(50, 100)
        ]);

        this.input.on('pointermove', pointer =>
        {
            this.seedPolygon.points[1].x = 100 + pointer.x / 4;
            this.seedPolygon.points[1].y = 100 + pointer.y / 2;
        });

        this.polygons = [];



        this.input.once('pointerdown', function (event)
        {
            let sound = this.sound.add('start sound');
            sound.play();

            console.log('From SceneB to SceneC');

            this.scene.start('sceneC');

        }, this);

        
    }

    update ()
    {
        this.polygons.push(Phaser.Geom.Polygon.Clone(this.seedPolygon));

        this.graphics.clear();

        for (let i = 0; i < this.polygons.length; i++)
        {
            const poly = this.polygons[i];

            if (poly.points[0].x > 800)
            {
                this.polygons.splice(i--, 1);
                continue;
            }

            for (let j = 0; j < poly.points.length; j++)
            {
                poly.points[j].x += 8 + j;
                poly.points[j].y += 6 + j;
            }

            this.graphics.strokePoints(poly.points, true);
        }

    }

}

class SceneC extends Phaser.Scene
{
    

    constructor ()
    {
        super({ key: 'sceneC' });
    }

    preload ()
    {
        this.load.path = './assets/';
        this.load.image('nero', 'nero.jpg');
        this.load.image('violet', 'violet.jpg');
    }

    create ()
    {
        this.cameras.main.fadeIn(1000, 0,0,0);
        this.add.text(
            800, //x
            100,//y
            "Choose your character", //text
            {
                font: "50px Unica One",
                color: "#ffffff",
            }
        );

        this.imageObject = this.add.image(
            400,//x
            400,
            'nero',//imagename
        )
        this.imageObject.scale = 1.5;

        this.imageObject = this.add.image(
            1400,//x
            600,
            'violet',//imagename
        )
        this.imageObject.scale = 1.5;
        //fade in and out 

    }
}

    


        //fade in and out 
        /*{
            this.tweens.add({
                targets: this.imageObject,
                ease: 'Sine.easeInOut',
                repeat: -1,
                duration: 960
            });

            this.cameras.main.once('camerafadeincomplete', function (camera) {
                camera.fadeOut(500);
            });

            this.cameras.main.fadeIn(560);
        }

        //fade in and out 
        {
            this.tweens.add({
                targets: this.imageObject,
                ease: 'Sine.easeInOut',
                repeat: -1,
                duration: 1000
            });

            this.cameras.main.once('camerafadeincomplete', function (camera) {
                camera.fadeOut(500);
            });

            this.cameras.main.fadeIn(560);
        }


        */
    
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1000,
    backgroundColor: '#16161D',
    parent: 'phaser-example',
    scene: [ SceneA, SceneB, SceneC ]
};

const game = new Phaser.Game(config);
