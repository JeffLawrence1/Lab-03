'use strict';
//global array to hold pictures


const pageOne = './data/page-1.json';
const pageTwo = './data/page-2.json';

let animalArray = [];
// constructor - has to be function because uses this
// function Animal(animal){
//   this.title = animal.title;
//   this.imageUrl = animal.image_url;
//   this.description = animal.description;
//   this.horns = animal.horns;
//   this.keyword = animal.keyword;


// }
// Animal.holdingArray =[];

function Animal(obj) {
  for(let key in obj){
    this[key] = obj[key];
  }
}

Animal.prototype.toHtml = function() {
  let source = $('#photo-template').html();
  let template = Handlebars.compile(source);
  return template(this);
};

// render prototype --- has to be function because uses this
// Animal.prototype.render = function() {
// // create the element
//   let animalClone = $('#photo-template').clone();
//   // reassigning to jquery variable to be able to use jquery
//   let $animalClone = $(animalClone[0].content);

//   // add the element content
//   $animalClone.find('img').attr('value', this.keyword);
//   $animalClone.find('h2').text(this.title);
//   $animalClone.find('img').attr('src', this.imageUrl);
//   $animalClone.find('p').text(this.description);
//   $animalClone.find('h3').text(`Number of Horns: ${this.horns}`);

//   // add element to parent
//   $animalClone.appendTo('main');

// };

// read json
const readJson = (pageNumber) => {
  // Animal.holdingArray = [];
  // console.log(Animal.holdingArray);
  animalArray = [];
  $.get(pageNumber)
    .then(animalData => {
      animalData.forEach(animal => {
        animalArray.push(new Animal(animal));
      });
      // console.log(animalArray);
    })
    .then(loadAnimals);
};

//read global array activate render function
const loadAnimals = () => {
  animalArray.forEach(animal => {
    // console.log(animal);
    $('main').append(animal.toHtml());
    // animal.toHtml();
  });
  // animalArray.forEach(newAnimal => {
  //   $('main').append(newAnimal.toHtml());
  // });
  //load dropdown menu
  // dropDrown();
};


//Event handler function
let animalSelector = (event) => {
  $('section').hide();
  let img = $(`img[value="${event.target.value}"]`).parent();
  $(img).show();
};

//Drop-down list event handler
$('#selectBox').on('change', animalSelector);


//dropdown menu loader function
// const dropDrown = () => {
//   Animal.holdingArray.forEach( (animal) => {

//     let animalListClone = $('#animalList').clone();
//     let $animalListClone = $(animalListClone[0].content);

//     //add element content
//     $animalListClone.find('option').attr('value', animal.keyword).text(animal.keyword);

//     //add logic to ensure keywords are not repeated in the dropdown menu
//     let exists = false;
//     $('#selectBox option').each(function(){
//       if(this.value === animal.keyword){
//         exists = true;
//       }
//     });

//     if(exists === false){
//       //add element to parent
//       $animalListClone.appendTo('select');
//     }

//   });
// };
let pageOneSelector = () => {
  // Animal.holdingArray = [];
  $('section').remove();
  readJson(pageOne);
};
let pageTwoSelector = () => {
  // Animal.holdingArray = [];
  $('section').remove();
  readJson(pageTwo);
};


$('#pageOne').on('click', pageOneSelector);
$('#pageTwo').on('click', pageTwoSelector);
//start it off
$(() => readJson(pageOne));
