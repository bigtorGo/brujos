export default class Habilidad{
    constructor (nombre,lanzador,tipo, daño, sprite)//los tipos deberían ser constantes conocidas para la habilidad y la clase de combate
    {
        this.nombre= nombre;
        this.tipo= tipo;
        this.daño=daño;
        this.lanzador=lanzador;
        this.sprite=sprite;
        
    }
    
    ejecutarAnimacion(listenerOnComplete=null)
    {
      this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE,listenerOnComplete);
      this.sprite.play(this.nombre);

    }
    


}