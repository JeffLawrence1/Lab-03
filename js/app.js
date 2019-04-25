'use strict';
//global array to hold pictures
Animal.holdingArray =[];

// constructor - has to be function because uses this
function Animal(animal){
  this.title = animal.title;
  this.imageUrl = animal.image_url;
  this.description = animal.description;
  this.horns = animal.horns;
  this.keyword = animal.keyword;
}


// render prototype --- has to be function because uses this
Animal.prototype.render = function() {
// create the element
  let animalClone = $('#photo-template').clone();
  // reassigning to jquery variable to be able to use jquery
  let $animalClone = $(animalClone[0].content);

  // add the element content
  $animalClone.find('h2').text(this.title);
  $animalClone.find('img').attr('src', this.imageUrl);
  $animalClone.find('p').text(this.description);
  $animalClone.find('h3').text(`Number of Horns: ${this.horns}`);

  // add element to parent
  $animalClone.appendTo('main');

};



// read json
Animal.readJson = () => {
  $.get('./data/page-1.json')
    .then(animalData => {
      animalData.forEach(animal => {
        Animal.holdingArray.push(new Animal(animal));
      });
    })
    .then(Animal.loadAnimals);
};



//read global array activate render function
Animal.loadAnimals = () => {
  Animal.holdingArray.forEach(animal => {
    animal.render();
  });
};


//start it off
$(() => Animal.readJson());
