class Studio extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'studio' });
    }

    preload (){
        this.load.path = './assets/';
        this.load.image('studio', 'studio.png');
        this.load.audio('bgm', 'bgm.mp3');
    }

    create ()
    {  
        let sound = this.sound.add('bgm');
        sound.play();
       
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

        this.input.on('pointerdown', () => this.scene.start('MainMenu'));
    }
}
}

class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'menu' });
    }

    preload (){
        this.load.path = './assets/';
        this.load.image('start', 'Start.png');
        this.load.image('options', 'Options.png');
        this.load.image('title', 'Title.png')

    }

    create ()
    {
       
        this.imageObject = this.add.image(
            900,//x
            500,
            'start',//imagename
        )

        this.imageObject = this.add.image(
            900,//x
            500,
            'options',//imagename
        )

        this.imageObject = this.add.image(
            900,//x
            500,
            'title',//imagename
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
    }
}
}

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1000,
    backgroundColor: '#16161D',
    parent: 'phaser-example',
    scene: [Studio, MainMenu]
};

const game = new Phaser.Game(config);