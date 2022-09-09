import Brujo from '../brujo.js';
import HealthBar from '../plugins/HealthBar.js';

let keyCodesJ1_1=[87,83,68,65];//wsda
let keyCodesJ1_2=[83,68,87,65];//sdwa
let keyCodesJ1_3=[68,87,87,65];//dwwa
let keyCodesJ2_1=[38,40,39,37];//arriba-abajo-derecha-izquierda
let keyCodesJ2_2=[40,39,38,37];//abajo-derecha-arriba-izquierda
let keyCodesJ2_3=[39,38,38,37];//derecha-arriba-arriba-izquierda

//falta incluir interacción con el segundo jugador.
export default class Combate extends Phaser.Scene
{
    constructor(){
        super({key:'Combate'});

        this.teclasPrecionadasJ1=[];
        this.teclasPrecionadasJ2=[];
        this.puedeInvocar=true;
        this.tiempoRespuesta= 1000;//las animaciones duran 1000 ms. Este valor está relacionado con esos cambiops.
        this.tiempodeCombate=0;
        this.iniciaCombate=false;
        this.habilidadesLanzadas=[];
      
       
        

    }
    preload(){
        this.alto=this.sys.game.config.height;
        this.ancho=this.sys.game.config.width;
        
    }
   
    create(){
        
        
        
        this.background=this.add.image(  this.ancho/2,this.alto/2,'background');
        this.jugador1= new Brujo(this,200,500,'brujo_idl','J1');
        this.jugador2= new Brujo(this,1000,500,'brujo_idl','J2');
       
        this.slot1= this.add.image(this.jugador1.x+100,this.jugador1.y-310);
        this.slot2= this.add.image(this.jugador2.x-100,this.jugador2.y-310);
       
       
       
        //console.log( this.slot1.texture);
        this.slot1.scale=0.5;
        this.slot2.scale=0.5;
        
      //  this.slot1.visible=false;
       // this.slot2.visible=false;
	    this.player1Health = new HealthBar(this, 40,50,500,50,{x:0,y:0},this.jugador1.vida);
        this.player2Health = new HealthBar(this, 1160,50,-500,50,{x:1,y:1},this.jugador2.vida);
        //this.player2Health.decrease(50);
        
        console.log(Phaser.Input.Keyboard.KeyCodes)
        console.log(this.input.keyboard.eventNames());
        
        this.input.keyboard.on('keydown-A', (e)=>{
           
            
          /*this.penalizacion==0 || this.penalizacion==undefined*/
           
            //si al pretar la tecla actual no hace match con el respectivo combo, se reinicia.
            this.teclasPrecionadasJ1.push(e.keyCode);
            console.log(this.teclasPrecionadasJ1); 
            this.comprobarComboTerminado();
            
          

        });
        this.input.keyboard.on('keydown-W', (e)=>{
           
           
            this.teclasPrecionadasJ1.push(e.keyCode);
            console.log(this.teclasPrecionadasJ1);
            this.comprobarComboTerminado();
 
         });
         this.input.keyboard.on('keydown-S', (e)=>{
           
             
            this.teclasPrecionadasJ1.push(e.keyCode);
            console.log(this.teclasPrecionadasJ1);
            this.comprobarComboTerminado();
 
         });
         this.input.keyboard.on('keydown-D', (e)=>{
           
          
            this.teclasPrecionadasJ1.push(e.keyCode);
            console.log(this.teclasPrecionadasJ1);
            this.comprobarComboTerminado();
 
         });

       
        //this.comboJ1=this.input.keyboard.createCombo(keyCodesJ1_1,comboConfig);
       // console.log(comboJ1);
        this.input.keyboard.on('keydown-R', ()=>{

            console.log("r key down");
            
            let h=this.jugador1.lanzarHabilidad();
            this.habilidadesLanzadas.push(h);
            this.iniciaCombate=true;
            this.tiempoAlEmpezarCombate=0;
               // this.tiempo
               

            
        });
        this.input.keyboard.on('keydown-ENTER', ()=>{

            console.log("enter key down");
            if(this.jugador2.estado==='CARGANDO')
            {
                let h=this.jugador2.lanzaHabilidad();
                console.log(h);

            }
        });
        
      
        
    }
    comprobarComboTerminado()
    {
        if(this.teclasPrecionadasJ1.length==4)
            {
                if(keyCodesJ1_1.toString() ===this.currentComboJ1.toString())
                {
                    
                    this.jugador1.invocaHorror();
                    this.cambiarSlot1('icono_horror');

                }
                if(keyCodesJ1_2.toString()===this.currentComboJ1.toString())
                {
                    
                    this.jugador1.invocaMaldicion();
                    this.cambiarSlot1('icono_maldicion');

                }
            if(keyCodesJ1_3.toString() ===this.currentComboJ1.toString())
                {
                    
                    this.jugador1.invocaEspiritu();
                    this.cambiarSlot1('icono_espiritu');

                }
                this.teclasPrecionadasJ1=[];
                return true;
            }
            return false;
    }
    cambiarSlot1(nombreTextura)
    {
        
        this.slot1.setTexture(nombreTextura);

    }
    cambiarSlot2(nombreTextura)
    {
        this.slot2.setTexture(nombreTextura);
    }
    dañaJugador1(daño)
    {
        this.jugador1.recibeDaño(daño);
        this.player1Health.decrease(daño);
    }
    dañaJugador2(daño)
    {
        this.jugador2.recibeDaño(daño);
        this.player2Health.decrease(daño);
    }
    comprobarCombos()
    {
        if(this.teclasPrecionadasJ1.length>0)
        {
            var indiceUltimaTecla=this.teclasPrecionadasJ1.length-1;
            
            if(this.teclasPrecionadasJ1[0]===87 && this.currentComboJ1 != keyCodesJ1_1)this.currentComboJ1=keyCodesJ1_1;
            else if(this.teclasPrecionadasJ1[0]===83 && this.currentComboJ1 != keyCodesJ1_2)this.currentComboJ1=keyCodesJ1_2;
            else if(this.teclasPrecionadasJ1[0]===68 && this.currentComboJ1 != keyCodesJ1_3)this.currentComboJ1=keyCodesJ1_3;
            if(this.currentComboJ1 == undefined || this.currentComboJ1[indiceUltimaTecla] !=this.teclasPrecionadasJ1[indiceUltimaTecla])
            {
                console.log(this.currentComboJ1[indiceUltimaTecla]);
                console.log(this.teclasPrecionadasJ1[indiceUltimaTecla]);
                this.teclasPrecionadasJ1=[];
                //penalización de tiempo para castear otra vez
            }
            this.cambiarSlot1();
           
            
        }
        if(this.teclasPrecionadasJ2.length>0)
        {
            var indiceUltimaTecla=this.teclasPrecionadasJ2.length-1;
            //determina que combo estamos ejecutando
            if(this.teclasPrecionadasJ2[0]===38 && this.currentComboJ2 != keyCodesJ2_1)this.currentComboJ2=keyCodesJ2_1;
            else if(this.teclasPrecionadasJ2[0]===40 && this.currentComboJ2 != keyCodesJ2_2)this.currentComboJ2=keyCodesJ2_2;
            else if(this.teclasPrecionadasJ2[0]===39 && this.currentComboJ2 != keyCodesJ2_3)this.currentComboJ2=keyCodesJ2_3;
            if(this.currentComboJ2 == undefined || this.currentComboJ2[indiceUltimaTecla] !=this.teclasPrecionadasJ2[indiceUltimaTecla])
            {
                console.log(this.currentComboJ2[indiceUltimaTecla]);
                console.log(this.teclasPrecionadasJ2[indiceUltimaTecla]);
                this.teclasPrecionadasJ2=[];
                //penalización de tiempo para castear otra vez
            }
            this.cambiarSlot2();

        }
    }
    update(time,delta)
    {
        this.comprobarCombos();
        
        
        /*
            Para lass reglas de combate se debe entender que:

            cuando un brujo lanza un hechiso debe existir un tiempo(ms) en el cual el otro brujo puede responder.
            Pasado ese tiempo, si no hay respuesta, el brujo que realizó el lanzamiento aplica el daño al otro.
            En el caso de que haya una respuesta, se deben obtener ambas habilidades y aplicar las reglas de victoria. El
            jugador que resulte ganador aplica el daño al otro y también la habilidad que pierde debe tener un efecto que indica la derrota.

        */
       // console.log(this.tiempoAlEmpezarCombate);
       if(this.iniciaCombate)
       {
        this.tiempoRespuesta+=delta;
        if(this.tiempoRespuesta <= this.tiempodeCombate)
        {
            this.tiempoRespuesta=0;
            this.iniciaCombate=false;
            while(this.habilidadesLanzadas.length>0)
            {
                        //let infoHabilidad= this.habilidadesLanzadas.pop();
                if(this.habilidadesLanzadas.length==1)
                {
                    
                    let infoHabilidad= this.habilidadesLanzadas.pop();
                   
                    if(infoHabilidad.lanzador==='J1')
                    {
                        console.log('Revisando habilidades lanzadas',infoHabilidad.daño );
                        this.dañaJugador2(infoHabilidad.daño);
                    
                    }else
                    {
                        console.log('Revisando habilidades lanzadas',infoHabilidad.daño );
                        this.dañaJugador1(infoHabilidad.daño);
     
                    }
     
                }else{
                    let lanzamientoInicial= this.habilidadesLanzadas.pop();
                    let lanzamientoDeRespuesta= this.habilidadesLanzadas.pop();
                    resultadoCombate=reglaDeVictoria(lanzamientoInicial,lanzamientoDeRespuesta);
                    if(resultadoCombate!=0)
                    {
                        if(resultadoCombate.lanzador==="J1")
                        {
                            console.log('Gana J1')
                            this.dañaJugador2(infoHabilidad.daño);
     
                        }else
                        {
                            console.log('Gana J1')
                            this.dañaJugador1(infoHabilidad.daño );
     
                        }
     
                    }else{
                        //un resultado igual a cero es un empate por lo que ninguno debe recibir daño. Tal vez podría haber una animación que lo indique
                    }
            
                    
     
     
                }
                
     
            }
        }
        
       }
              

                
                  

            
                   
            
                

    }

    reglaDeVictoria(habilidad1,habilidad2)
    {
        switch(habilidad1.tipo) {
            case 'PIEDRA':
                if(habilidad2.tipo=='PAPEL') return habilidad2.lanzador;

                else if (habilidad2.tipo=='TIJERA') return habilidad1.lanzador;
                else return 0;// el 0 representa el empate

              break;
              case 'PAPEL':
                if(habilidad2.tipo=='TIJERA') return habilidad2.lanzador;

                else if (habilidad2.tipo=='PIEDRA') return habilidad1.lanzador;
                else return 0;

              break;
              case 'TIJERA':
                if(habilidad2.tipo=='PIEDRA') return habilidad2.lanzador;

                else if (habilidad2.tipo=='PAPEL') return habilidad1.lanzador;
                else return 0;

              break;
          } 
          return undefined;

    }

}