//Clase correspondiente al componente "Cartas"

class Cards{

    constructor(srcImage="", title=""){
        //Variables del objeto
        this.displayCard = true;
        this.srcImage = srcImage;
        this.enabledChange = true; //Indica si se puede dar vuelta la carta 

        this.Card = document.createElement('div');
        this.Card.className= "col col-md-3"

        //Eventos
        //Eventos a elemento padre
        this.clickCard = new Event("clickCard");
        this.clickCard.cardData = this;
        //Eventos de elemento hijo
        this.Card.addEventListener('click',()=>{
            if(this.enabledChange){
                this.changeState();
                this.Card.parentElement.dispatchEvent(this.clickCard);
            }
        })

        this.Card.innerHTML = 
            /*html*/
            `
            <div class="card-image card" style="display:${this.displayCard ? '' : 'none'}">
                <img src="${"./img/Pregunta.png"}" alt="...">
            </div>
            <div class="card" style="display:${!this.displayCard ? '' : 'none'}">
                <img src="${srcImage}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                </div>
            </div>
            `
        }
    
    //Métodos
    paintingCard(){
        return this.Card;
    }

    changeState(){
        this.displayCard = !this.displayCard;
        this.Card.children[0].style.display = this.displayCard ? '' : 'none'
        this.Card.children[1].style.display = !this.displayCard ? '' : 'none'
    }
}