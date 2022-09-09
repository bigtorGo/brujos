
import BootLoader from './bootLoader.js';
import Combate from '../scenes/combate.js';
const config={
    width:1200,
    height:800,
    parent: "container",
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false
            }   
        }, 
    
    scene: [BootLoader,Combate]//la primera en el arreglo es la primera en renderizarse.


}


var game= new Phaser.Game(config);