export default class HealthBar {

    constructor (scene, x, y,width, height, origin, vidaJugador)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = vidaJugador;
        this.percent = vidaJugador/100;
        this.width=width;
        this.height=height;
        this.displayOriginX=origin.x;
        this.displayOriginY=origin.y;


        this.draw();

        scene.add.existing(this.bar);
    }
    

    decrease (amount)
    {
        this.value -= amount;
        this.percent= this.value/100;
        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, this.width, this.height);

        //  Health

        this.bar.fillStyle(0xffffff);
        //this.bar.fillRect(this.x + 2, this.y + 2, this.width-5, this.height-3);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }
        
        var anchoActual = Math.floor(this.width * this.percent);
        console.log(`el ancho ${this.width} por  ${this.percent} da un ancho de la barra igual a ${anchoActual}.`);

        this.bar.fillRect(this.x + 2, this.y + 2, anchoActual, this.height-3);
    }

}