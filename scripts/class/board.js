//Clase correspondiente al componente "Board" (Tablero)

class Board {
    constructor(listadoJsonTarjetas){
        //Variables
        this.CardsBoard = [];
        this.JSONCards = listadoJsonTarjetas;
        this.intentos = 0;
        //Modificar en casos de más intentos
        this.intentosTotal = 5;
        this.aciertos = 0

        //DIV donde se va a posicionar el contador
        this.divCounter = document.createElement('div');
        this.divCounter.id = "container-counter";
        this.divCounter.className = "row";
        this.divCounter.innerHTML = 
        /*html*/
        `
        <div class="progress col text-center" style="height:100px;">
            <div class="progress-bar bg-success" role="progressbar" style="width: 0%; color: #17202a;" aria-valuemin="0" aria-valuemax="100">
                Te quedan ${this.intentosTotal} intentos para seguir jugando!
            </div>
        </div>   
        `        
        //Creo la barra que índica cuando se perdió en el juego.
        this.divRestart = document.createElement('div');
        this.divRestart.id = "container-restart";
        this.divRestart.className = "row";
        this.divRestart.style.display = 'none';
        this.divRestart.innerHTML = 
        /*html*/
        `   
            <div class="col-12 alert alert-danger">
                <p>Ya no te quedan chances para seguir jugando.</p>
                <p>¿Qué quieres hacer?</p>
                <div class="col-12">
                    <button type="button" class="btn btn-success" onclick="location.reload()">Reiniciar el juego</button>
                </div>
            </div>
        `
        //Creo la barra que índica cuando se ganó en el juego.
        this.divWin = document.createElement('div');
        this.divWin.id = "container-win";
        this.divWin.className = "row";
        this.divWin.style.display = 'none';
        this.divWin.innerHTML = 
        /*html*/
        `   
            <div class="col-12 alert alert-success">
                <p>¡Felicitaciones! Has ganado el juego</p>
                <p>¿Qué quieres hacer?</p>
                <div class="col-12">
                    <button type="button" class="btn btn-success" onclick="location.reload()">Reiniciar el juego</button>
                </div>
            </div>
        `

        //DIV donde se posicionan las cartas
        this.divBoard = document.createElement('div');
        this.divBoard.id = "container-tablero";
        this.divBoard.className = "row"

        //Eventos
        this.divBoard.addEventListener("clickCard", (e)=>{
            this.CardsBoard.push(e.cardData);
            
            //Condición que ejecuta el validate
            if(this.CardsBoard.length == 2) this.validate()
        });

    }

    //métodos
    addCards(){
        //Las agrego al tablero
        this.JSONCards.forEach(cardJSON => {
            let card = new Cards(cardJSON.srcImage,cardJSON.title)
            this.divBoard.appendChild(card.Card);
        });
    }
    
    paint(divContainer){
        divContainer.appendChild(this.divCounter);
        divContainer.appendChild(this.divRestart);
        divContainer.appendChild(this.divWin);
        divContainer.appendChild(this.divBoard);
    }
    
    validate(){
        if(this.CardsBoard[0].Card.innerText == this.CardsBoard[1].Card.innerText){
            let reference = this.CardsBoard;
            this.aciertos++;
            if(this.aciertos*2 == this.JSONCards.length){
                this.divBoard.parentElement.children[2].style.display="";
                this.divBoard.parentElement.children[3].style.display="none";
            }else{
                setTimeout(()=>{
                    //Doy vuelta la carta
                    reference[0].changeState();
                    reference[1].changeState();

                    //Marco como que es correcta la selección
                    reference[0].Card.children[0].children[0].src = './img/check-verde.png';
                    reference[1].Card.children[0].children[0].src = './img/check-verde.png';

                    reference[0].enabledChange = false; //Si ya fue seleccionado y es correcto, no es necesario volver a cambiarlo
                    reference[1].enabledChange = false; //Si ya fue seleccionado y es correcto, no es necesario volver a cambiarlo
                },800)
            }
        }else{
            let reference = this.CardsBoard;
            this.intentos += 1;
            this.changeProgressBar(this.intentos);
            setTimeout(()=>{
                //Doy vuelta la carta
                reference[0].changeState();
                reference[1].changeState();
                reference[0].enabledChange = false; //Para que no vuelva a generar el envío
                reference[1].enabledChange = false; //Para que no vuelva a generar el envío

                //Marco el error
                reference[0].Card.children[0].children[0].src = './img/error-rojo.png'
                reference[1].Card.children[0].children[0].src = './img/error-rojo.png'

            },500)
            setTimeout(()=>{
                //La devuelvo al estado original
                reference[0].Card.children[0].children[0].src = './img/Pregunta.png'
                reference[1].Card.children[0].children[0].src = './img/Pregunta.png'
                reference[0].enabledChange = true; //Para volver todo a la normalidad
                reference[1].enabledChange = true; //Para volver todo a la normalidad
            },1300) 
        }
        this.CardsBoard = []
    }
    sortingCards(){
        this.JSONCards.forEach(card =>{
            this.JSONCards.push(card);
        });
        this.JSONCards.sort(function(){
            return Math.random() - 0.5
        });
    }
    changeProgressBar(intentos){
        let porcent = intentos / this.intentosTotal * 100;
        let text = `Te quedan ${this.intentosTotal - intentos} intentos para seguir jugando!`
        if(porcent <= 50){
            //Modifico los parámetros más internos
            this.divCounter.children[0].children[0].className = "progress-bar bg-success";
            this.divCounter.children[0].children[0].style = `width: ${porcent}%; color: #fdfefe;`;
            this.divCounter.children[0].children[0].textContent = text;
        }else if(porcent <75){
            //Modifico los parámetros más internos
            this.divCounter.children[0].children[0].className = "progress-bar bg-warning";
            this.divCounter.children[0].children[0].style = `width: ${porcent}%; color: #fdfefe`;
            this.divCounter.children[0].children[0].textContent = text;
        }else if(porcent < 100){ //Se supone que si es mayor al 75, ya estamos casi en el 100
            //Modifico los parámetros más internos
            this.divCounter.children[0].children[0].className = "progress-bar bg-danger";
            this.divCounter.children[0].children[0].style = `width: ${porcent}%; color: #fdfefe`;
            this.divCounter.children[0].children[0].textContent = text;
        }else{
            this.divCounter.children[0].children[0].style = `width: ${porcent}%; color: #fdfefe`;
            this.divCounter.children[0].children[0].textContent = text;
            this.divBoard.style.display = 'none';
            this.divBoard.parentElement.children[1].style.display = ''
        }
    }
}
