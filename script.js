
class Studio extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'Studio' });
    }

    preload (){
        this.load.path = './assets/';
        this.load.image('studio', 'TatStudio.gif');
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

        this.input.on('pointerdown', () => this.scene.start('Title'));
    }
}
}

class Title extends Phaser.Scene
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
        this.load.image('Start', 'Start.png');
        this.load.image('Options', 'Options.png');
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

        this.start = this.add.image(game.config.width/2, game.config.height/2.75, 'Start')
        .setScale(0.5)
        .setOrigin(0.5)

        this.options = this.add.image(game.config.width/2, game.config.height/2.5, 'Options')
        .setScale(0.5)
        .setOrigin(0.5)

        class Settings extends Phaser.Scene {
            constructor() {
                super('settings')
            }
            
            preload() {
                // this.load.path = '/assets/' // local
                this.load.path = '/Memoria/assets/' // github
                this.load.image('exit', 'Buttons/Exit button.png')
                this.load.audio('page', 'sounds/page.mp3')
            }
            
            create() {
                this.cameras.main.setBackgroundColor('#444')
                
                this.page = this.sound.add('page').setVolume(0.25)
                
                this.musicToggle = this.add.text(game.config.width/2, game.config.height/2.1, "Toggle sound 🔈")
                .setColor(0xFFFFFF)
                .setOrigin(0.5)
                .setStyle({ fontSize: 50 })
                .setInteractive({useHandCursor: true})
                .on('pointerover', () => this.musicToggle.setFontSize(55))
                    .on('pointerout', () => this.musicToggle.setFontSize(50))
                    .on('pointerdown', () => {
                        if (game.sound.mute) {
                            game.sound.mute = false
                            this.musicToggle.setText("Toggle sound 🔈")
                        } else {
                            game.sound.mute = true
                            this.musicToggle.setText("Toggle sound 🔇")
                        }
                    });
                    
                    if (game.sound.mute) {
                        this.musicToggle.setText("Toggle sound 🔇")
                    }
                    
                    this.exit = this.add.text(game.config.width/2, game.config.height/3.5, "Exit")
                    .setOrigin(0.5)
                    .setScale(0.5)
                    
                    this.exitinter = this.add.text(game.config.width/2, game.config.height/1.75, '     ')
                    .setOrigin(0.5)
                    .setFontSize(50)
                    .setInteractive({useHandCursor: true})
                    .on('pointerover', () => this.exit.setScale(0.55))
                    .on('pointerout', () => this.exit.setScale(0.5))
                    .on('pointerdown', () => {
                        this.page.play()
                        this.time.delayedCall(75, () => this.scene.start('title'))
                    })
            }
        }
        
        const game = new Phaser.Game({
            scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1900,
            height: 1000
            };
            type: Phaser.AUTO;
            scene: [Studio, Title],
            title: "Eigen:grau",
        });


