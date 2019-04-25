'use strict';
//global array to hold pictures


const pageOne = './data/page-1.json';
const pageTwo = './data/page-2.json';

let animalArray = [];

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

Animal.prototype.toDropdown = function() {
  let source = $('#animalList').html();
  let template = Handlebars.compile(source);
  return template(this);
};
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
  dropDrown();
};

const dropDrown = () => {
  animalArray.forEach(animal => {
    let exists = false;
    $('#selectBox option').each(function(){
      if(this.value === animal.keyword){
        exists = true;
      }
    });
    if(exists === false){
      //add element to parent
      $('select').append(animal.toDropdown());
    }  
  });
};
//Event handler function
let animalSelector = (event) => {
  $('section').hide();
  let img = $(`img[value="${event.target.value}"]`).parent();
  $(img).show();
};

//Drop-down list event handler
$('#selectBox').on('change', animalSelector);

// const dropFunction = () => {
//   let source = $('#animalList').html();
//   let template = Handlebars.compile(source);
//   return template(this);
// }

//dropdown menu loader function
// const dropDrown = () => {
//   Animal.holdingArray.forEach( (animal) => {

//     let animalListClone = $('#animalList').clone();
//     let $animalListClone = $(animalListClone[0].content);

//     //add element content
//     $animalListClone.find('option').attr('value', animal.keyword).text(animal.keyword);

// //     //add logic to ensure keywords are not repeated in the dropdown menu
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
