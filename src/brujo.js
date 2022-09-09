import Habilidad from "./habilidad.js";
export default class Brujo extends Phaser.GameObjects.Sprite{
/*
falta incluir las animaciones para los estados del brujo
*/
    constructor(scene,x,y,imagen,jugador)//todas las variables de la clase deben existir en el constructor.
    {
        super(scene,x,y,imagen,jugador);
        scene.add.existing(this);//si este sprite existe en la escena, se asocia con este objeto
        //scene.physics.world.enable(this);//habilitar las fisicas de la escena para este game object
        //this.body.immovable=true;//es un objeto estático, no puede moverse.
        this.jugador=jugador;
        this.vida=100;
        
       
        const estados=
        {
            VENCIDO:0,
            ESPERANDO:1,
            CARGANDO:2,
            ATACANDO:3,
            RECIBIENDO_DAÑO:4

        }
        this.estado=estados;
        this.setState(this.estado.ESPERANDO);
       // this.setAngle(-20);
        this.crearSprites();
        //horror
        //esta clase puede encargarse de crear y agregar las animaciones para la habilidad respectiva.
       
       //este objeto manejará las animaciones del personaje.
    }
    
    crearSprites()
    {
        if(this.jugador==='J1'){
            this.horrorSprite= this.scene.add.sprite(this.x+250,this.y+70,'horror_1');
            this.horrorSprite.setScale(0.8);
            //this.horrorSprite.setActive(false);//un gameobject que no está activo no será considerado para ser actualisado en la escena. No está dentro del gameloop.
            this.horrorSprite.visible=false;
            this.espirituSprite= this.scene.add.sprite(this.x+350,this.y-200,'espiritu_1');
          
            this.espirituSprite.visible=false;
            this.maldicionSprite= this.scene.add.sprite(this.x+250,this.y-100,'maldicion_1');
           
            this.maldicionSprite.visible=false;
            //this.espirituSprite.setScale(0.8);
        }else if(this.jugador==='J2'){
            this.horrorSprite= this.scene.add.sprite(this.x-250,this.y+70,'horror_1');
            this.horrorSprite.setScale(0.8);
            this.horrorSprite.setFlipX(true);
            this.setFlipX(true);
        }
       
       // console.log(Phaser.Input.Keyboard.KeyCodes)
    }

    recibeDaño(daño)
    {
        this.setState(this.estado.RECIBIENDO_DAÑO);
        //luego de ejecutar la animación de recibir daño se debe pasar al estado de ESPERANDO
        this.vida-= daño;
        if(this.vida<=100)
        {
            this.setState(this.estado.VENCIDO);
        }
       

    }
  
// el usuario invoca y la habilidad es ejecutada cuando termina la animación
    
    lanzarHabilidad()//retorna la habilidad que es lanzada y la habilidad actual pasa a ser undefined
    {
        let infoHabilidad=null;
        if(this.state === this.estado.CARGANDO )
        {
            this.setState(this.estado.ATACANDO);
           
            
            
            infoHabilidad={
                nombre:this.habilidadActiva.nombre,
                daño:this.habilidadActiva.daño,
                tipo:this.habilidadActiva.tipo,
                lanzador: this.habilidadActiva.lanzador
            }

          
            this.habilidadActiva.ejecutarAnimacion((e)=>{

                console.log(e);
                this.setState(this.estado.ESPERANDO);
                
                
               
                
            })
            this.habilidadActiva=undefined;
           
          
            
            
        }
        return infoHabilidad;

    }
    invocaHorror()
    {
        if(this.state===this.estado.ESPERANDO || this.state===this.estado.CARGANDO ){
            this.setState(this.estado.CARGANDO);
            this.habilidadActiva=new Habilidad("horror",this.jugador,"TIJERA",25,this.horrorSprite);
            console.log("habilidad activa", this.habilidadActiva.nombre);
        }
    }
    
    invocaMaldicion()
    {
        if(this.state===this.estado.ESPERANDO || this.state===this.estado.CARGANDO){
            this.setState(this.estado.CARGANDO);
            this.habilidadActiva=new Habilidad("maldicion",this.jugador,"PAPEL",25,this.maldicionSprite);
            console.log("habilidad activa", this.habilidadActiva.nombre);
        }
        
    }
    invocaEspiritu()
    {
        if(this.state===this.estado.ESPERANDO || this.state===this.estado.CARGANDO){
            this.setState(this.estado.CARGANDO);
            this.habilidadActiva=new Habilidad("espiritu",this.jugador,"PIEDRA",25,this.espirituSprite);
            console.log("habilidad activa", this.habilidadActiva.nombre);
        }
        
    }
}