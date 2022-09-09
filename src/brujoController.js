

export default class BrujoController
{
   /* constructor(combo1,combo2,combo3,comboKeys,invocationKey,keyboard){
        this.combo1=combo1;
        this.combo2=combo2;
        this.combo3=combo3;
        this.keyPressed=[];
        this.comboKeys=comboKeys;
        this.invocationKey=invocationKey;
        this.keyboard=keyboard;
        this.addListener();
        this.completed='';
    }*/
    constructor(brujo,keyboard,slot, jugador)
    {
        this.brujo=brujo;
        this.keyboard=keyboard;
        this.slot=slot;
        this.jugador=jugador;
        this.keyPressed=[];
        this.configIntputs();

    }
    configIntputs(){
        if(this.jugador==='J1'){
            this.combo1=[87,83,68,65];//wsda
            this.combo2=[83,68,87,65];//sdwa
            this.combo3=[68,87,87,65];//dwwa
            this.comboKeys=['keydown-W','keydown-S','keydown-D','keydown-A']
            this.invocationKey='keydown-R';



        }
        if(this.jugador==='J2'){
            this.combo1=[38,40,39,37];//arriba-abajo-derecha-izquierda
            this.combo2=[40,39,38,37];//abajo-derecha-arriba-izquierda
            this.combo3=[39,38,38,37];//derecha-arriba-arriba-izquierda
            this.comboKeys=['up','down','left','right']
            this.invocationKey='keydown-ENTER';
        }
    }
    addListener()
    {
        keyboard.on(comboKeys[0], (e)=>{
        
              this.keyPressed.push(e.keyCode);
              
  
          });
        keyboard.on(comboKeys[1], (e)=>{
        
            this.keyPressed.push(e.keyCode);
            

        });
        keyboard.on(comboKeys[2], (e)=>{
        
            this.keyPressed.push(e.keyCode);
            

        }); 
        keyboard.on(comboKeys[3], (e)=>{
        
            this.keyPressed.push(e.keyCode);
            

        });
        keyboard.on(invocationKey, (e)=>{
        
            //realiza el ataque siempre que el combo haya sido realizado
            if(this.completed!==null)this.onInvocationKeyPressed();
          //  let h=this.jugador1.lanzarHabilidad();
            //this.habilidadesLanzadas.push(h);
            //this.iniciaCombate=true;
           // this.tiempoAlEmpezarCombate=0;
            

        });
    }

    onInvocationKeyPressed(){
        if(this.completed==='combo1'){
            //invoca horror
            //invocar un hechizo conciste en hacer aparecer la invocación y comenzar a animarla.

        }
        if(this.completed==='combo2'){
            //invoca maldicion
        }
        if(this.completed==='combo3'){
            //invoca espiritu
        }
        //lanzar habilidad;
        /*La habilidad es lanzada cuando la animación llega a su fin. Lanzar una habilidad significa-
        que esta intentará hacer daño al otro jugador por lo que debe comenzar a ser leida por la clase de combate. 
        Si el otro jugador realizo una invocación, se resuelve el combate con las reglas correspondientes. Si el oponente no ha invocado nada cuando esta habilidad ha sido lanzada,
        el lanzador gana el combate. */

    }

    checkCombos()//esto se comprueba en cada update
    {
        if(this.keyPressed.length>0)
        {
            var indiceUltimaTecla=this.keyPressed.length-1;
            
            if(this.keyPressed[0]===this.combo1[0] && this.expectedCombo !== this.combo1)this.expectedCombo=combo1;
            else if(this.keyPressed[0]===this.combo2[0] && this.expectedCombo !== this.combo2)this.expectedCombo=combo2;
            else if(this.keyPressed[0]===this.combo3[0] && this.expectedCombo !== this.combo3)this.expectedCombo=combo3;
            if(this.expectedCombo == undefined || this.expectedCombo[indiceUltimaTecla] !=this.keyPressed[indiceUltimaTecla])
            {//si la ultima tecla presionada no corresponde a la del combo esperado, entonces se reinicia el combo
                
                this.keyPressed=[];
                this.completed=null;
                //this.cambiarSlot1();
                return;
                //penalización de tiempo para castear otra vez
            }
            
           
            if(this.keyPressed.length==4)
            {
                if(this.combo1.toString() ===this.keyPressed.toString())
                {
                    
                    //this.jugador1.invocaHorror();
                    //this.cambiarSlot1('icono_horror');
                    this.completed='combo1';
                    

                }
                if(this.combo2.toString()===this.keyPressed.toString())
                {
                    
                    //this.jugador1.invocaMaldicion();
                    //this.cambiarSlot1('icono_maldicion');
                    this.completed='combo2';
                    

                }
                if(this.combo3.toString() ===this.keyPressed.toString())
                {
                    
                //  this.jugador1.invocaEspiritu();
                    //this.cambiarSlot1('icono_espiritu');
                    this.completed='combo3';
                   

                }
                this.keyPressed=[];
                
            }
            
        }
        
    }

}