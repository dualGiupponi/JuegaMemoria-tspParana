//Archivo principal de ejecución del juego

//Se agrega para que quede en la clase "Event". Modificacion propia para el programa
Event.prototype.cardData = {} //Revisar

//Cargo el json con los datos de las cartas 
let data = [
    {srcImage:"http://www.kmirzoeva.com/_Media/blue_dawn_hr.jpeg", title:"Hola mundo 1"},
    {srcImage:"http://www.kmirzoeva.com/_Media/armenia_ararat-2_hr.jpeg", title:"Hola mundo 2"},
    {srcImage:"http://photos1.blogger.com/blogger/8189/2425/400/boatbk.jpg", title:"Hola mundo 3"},
    {srcImage:"http://photos1.blogger.com/blogger/8189/2425/400/boatbk.jpg", title:"Hola mundo 4"}
];

//Extraigo el contenedor de la tabla
let container = document.getElementById("board-container")
//Creo el tablero
let board = new Board(data);
//Mezclo las cartas
board.sortingCards();
//Las meto dentro del tablero
board.addCards();
//Pinto el tablero
board.paint(container);