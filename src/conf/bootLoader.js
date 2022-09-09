//import Combate from './scenes/combate.js';
export default class BootLoader extends Phaser.Scene
{
    constructor()
    {
        super({key:'BootLoader'});
    }
    preload()
    {
        //para inicializar la escena cuando se carguen todos los assets usaremos el siguiente metodo
        console.log('Se ha cargado bootloader');
        this.load.on('complete',() =>{
            this.scene.start('Combate');
        });
       
        this.load.image('brujo_idl','/assets/Brujo_idle.png');
        this.load.image('brujo_atack','/assets/Brujo_atacando.png')
        this.load.image('brujo_dmg','/assets/Brujo_recibiendo.png')
        this.load.image('espiritu_1','/assets/Espiritus_pose1.png')
        this.load.image('espiritu_2','/assets/Espiritus_pose2.png')
        this.load.image('horror_1','/assets/Horror_pose1.png')
        this.load.image('horror_2','/assets/Horror_pose2.png')
        this.load.image('maldicion_1','/assets/Maldicion_pose1.png')
        this.load.image('maldicion_2','/assets/Maldicion_pose2.png')
        this.load.image('icono_horror','/assets/Icon_Horror.png')
        this.load.image('icono_maldicion','/assets/Icon_Maldicion.png')
        this.load.image('icono_espiritu','/assets/Icon_Espiritus.png')
        this.load.image('background','/assets/Background_Melipilla.jpg');
        
    }
    create()
    {
        this.anims.create({
          key:'brujo_dmg',
          frames:[
            {key:'brujo_idl'},
            {key:'brujo_dmg'}
          ],
          duration: 300
          

        });
        this.anims.create({
            key:'brujo_atack',
            frames:[
              {key:'brujo_idl'},
              {key:'brujo_atack'}
            ],
            duration: 800
            
  
          });
       /* this.anims.create({
            key:'brujo_idl',
            frames:[
              {key:'brujo_idl'}
            ]
                
  
          });*/
        this.anims.create({
            key: 'maldicion',
            frames: [
                { key: 'maldicion_1',duration:600 },
                { key: 'maldicion_2' , duration:300}
                
            ],
           // duration: 1000,//la duración está en milisegundos
           showOnStart: true,
           hideOnComplete:true
        });
        this.anims.create({
            key: 'horror',
            frames: [
                { key: 'horror_1' ,duration:600},
                { key: 'horror_2', duration:300 }
                
            ],
            showOnStart: true,
          hideOnComplete:true
        });
        this.anims.create({
            key: 'espiritu',
            frames: [
                { key: 'espiritu_1' ,duration:600},
                { key: 'espiritu_2', duration:300 }
                
            ],
            showOnStart: true,
            hideOnComplete:true
        });
    }


}