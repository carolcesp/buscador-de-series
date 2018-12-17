'use strict';


const contentInput = document.querySelector('.search_input');
const button = document.querySelector('.btn');
const list = document.querySelector('.list');

//imagen que quiero añadir sino la tiene
let image = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
const api = 'http://api.tvmaze.com/search/shows?q=';


const handleShow = () => {
//busco el valor de mi input
  const searchInput = contentInput.value;
  console.log(searchInput);

	fetch(api + searchInput)
		.then(response => response.json())
		.then(data => {
      console.log(data);
      result(data);
	});
}
const result = (data) => {
  console.log('result' + data);
  for(let i=0; i < data.length; i++){
//busco la imagen y si es null le añadimos esta por defecto
      if (data[i].show.image == null){
        image = 'https://via.placeholder.com/250x300';
// y sino, me pone la imagen que esta dentro de (image.medium)
      } else {
		image = data[i].show.image.medium;
    }
// a mi Ul del html le añado este contenido
    list.innerHTML +=`<li class="itemLi"><div class="content"><img class="img" src="${image}" alt=""><h2 class="title_content">${data[i].show.name}</h2></div>
    </li>`;

  }
favorite();
};

//acceder a los Li con clase (.content)
function favorite (){
  let itemLi = document.querySelectorAll('.itemLi');
//recorro los Li y accedo con click
  for(let i = 0;i < itemLi.length; i++){
//al hacer click llamo a la funcion (addClass)
  itemLi[i].addEventListener('click', addClass);
  }
}

function addClass(e){
//elemento sobre el que esta el listener.
    const itemClick = e.currentTarget;
//a itemClick le añado la clase (itemLi-favorite)
    itemClick.classList.toggle('itemLi-favorite');
}
//LocalStorage
localStorage.setItem('favorite', 'carol');
const show = localStorage.getItem('favorite');
console.log(favorite); //Ana


button.addEventListener('click', handleShow);
