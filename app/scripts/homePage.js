import { BreweryDB } from 'scripts/breweryDB.js'

class HomePage {
  constructor() {
    this.breweryDB = new BreweryDB();
    // this.breweryDB.fetchStyles()
    //   .then((data) => { this.populateBeerStyles(data); })
    //   .catch((error) => { this.populateBeerStylesFailed(error); });
    this.breweryDB.fetchCategories()
      .then((data) => { this.populateBeerCategories(data); })
      .catch((error) => { this.populateBeerStylesFailed(error); });
  }

  populateBeerCategories(data){
    console.log(data)
    for (var i=0; i < data.data.length; i++) {
      var typesOfBeer = [
        '<div class="twelve columns">',
          '<p class="name">' + data.data[i].name + '</p>',
        '</div>'
      ].join('');
      $("#beer-list").append(typesOfBeer);
    }
  }

  populateBeerStyles(data) {
    for (var i=0; i < data.data.length; i++) {
      var typesOfBeer = [
        '<div class="twelve columns">',
          '<p class="name">' + data.data[i].name + '</p>',
        '</div>'
      ].join('');
      $("#beer-list").append(typesOfBeer);
    }
  }

  populateBeerStylesFailed() {
    var errorMessage  = [
        '<div class="twelve columns text-center">',
          '<h1>Oops Something Went Wrong</h1>',
        '</div>'
      ].join('');
    $("#beer-list").append(errorMessage);
  }
}

export { HomePage }
