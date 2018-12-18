'use strict';


const contentInput = document.querySelector('.search_input');
const button = document.querySelector('.btn');
const list = document.querySelector('.list');
const dataLocal = document.querySelector('.localSt');

let miArray = [];


//imagen que quiero añadir sino la tiene
let image = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
const api = 'http://api.tvmaze.com/search/shows?q=';

const handleShow = () => {
//busco el valor de mi input
  const searchInput = contentInput.value;
	fetch(api + searchInput)
		.then(response => response.json())
		.then(data => {
      result(data);
	});
}
const result = (data) => {
//console.log('result' + data);
//recorro el array data
  for(let i=0; i < data.length; i++){
//busco la imagen y si es null le añadimos esta por defecto (https://via.placeholder.com/210x295/cccccc/666666/?text=TV)
      if (data[i].show.image == null){
        image = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
// y sino, me pone la imagen que esta dentro de (image.medium)
      } else {
		image = data[i].show.image.medium;
    }
// a mi Ul del html le añado este contenido
    list.innerHTML +=`
    <li class="itemLi" id="itemLi-favourite">
      <div class="content" id="content-local"><img class="img_content" src="${image}" alt="" >
        <h2 class="title_content">${data[i].show.name}</h2>
      </div>
    </li>
    `;}
//llamo a mi función de favorito
favourite();
};
//acceder a los Li con clase (.itemLi)
function favourite (){
  let itemLi = document.querySelectorAll('.itemLi');
//recorro los Li y accedo con click
  for(let i = 0;i < itemLi.length; i++){
//al hacer click llamo a la funcion (addClass)
  itemLi[i].addEventListener('click', addClassFavourite);
  }
}
//añadir clase cuando hago click
function addClassFavourite(e){
//elemento sobre el que esta el listener.
  const itemClick = e.currentTarget;
//a itemClick le añado la clase (itemLi-favourite)
  itemClick.classList.toggle('itemLi-favourite');

//   //LOCALSTORAGE
//   if (itemClick.classList.toggle('itemLi-favourite') === itemClick) {
//   //si es verdadero con push()agrega el elementos al final del array
//   miArray.push(itemClick.innerHTML);
//     console.log('Está marcado como favorito');
//   } else{
//     console.log('No está marcado');
//   }

//   // setItem para guardar en localStorage
//   localStorage.setItem('miArray', JSON.stringify(miArray));
//   //getItem para recuperar los datos del localStorage
//   const savedFavourite= JSON.parse(localStorage.getItem('miArray'));
//   console.log(savedFavourite.length);
// };

}
button.addEventListener('click', handleShow);

