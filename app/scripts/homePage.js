var _ = require('lodash');
import { BreweryDB } from 'scripts/breweryDB.js'

class HomePage {
  constructor() {
    this.beerData = null;
    this.bindEvents();
    this.breweryDB = new BreweryDB();
    this.breweryDB.fetchStyles()
      .then((data) => { this.populateBeerData(data); })
      .catch((error) => { this.populateBeerDataFailed(error);
    });
  }

  populateBeerData(data) {
    this.beerData = data;
    this.populateQuestionOne();
  }

  populateBeerDataFailed() {
    var errorMessage  = [
        '<div class="twelve columns text-center">',
          '<h1>Oops Something Went Wrong</h1>',
        '</div>'
      ].join('');
    $("#beer-list").append(errorMessage);
  }

  populateQuestionOne() {
    var questionOne = $('.question-one');
    var uniqueBeerCategories = _.uniqBy(this.beerData.data, 'categoryId');
    this.appendPlaceholderOption(questionOne);
    _.forEach(uniqueBeerCategories, function(beerCategory) {
      var categoryOption = '<option value="' + beerCategory.categoryId + '">'+ beerCategory.category.name + '</option>'
      questionOne.append(categoryOption);
    })
  }

  appendPlaceholderOption(select){
    select.append('<option disabled selected value> -- select an option -- </option>');
  }

  resetSelectOptions(select) {
    select.find('option').remove();
  }

  handleQuestionOneAction() {
    var questionTwo = $('.question-two');
    var selectedCategory = $('.question-one').val();
    this.resetSelectOptions(questionTwo);
    this.appendPlaceholderOption(questionTwo);
    _.forEach(this.beerData.data, function(categoryStyle) {
      if(categoryStyle.categoryId == selectedCategory) {
        var categoryStyleOption = '<option value="' + categoryStyle.id + '">'+ categoryStyle.name + '</option>'
        questionTwo.append(categoryStyleOption);
      }
    })
    $('.question-two-container').show();
  }

  handleQuestionTwoAction() {
    var selectedCategoryStyle = $('.question-two').val();
    var paramaters = '&styleId='+ selectedCategoryStyle + '&p=1&sort=ASC'
    this.breweryDB.fetchBeers(paramaters)
      .then((data) => { this.populateBeerContainer(data); })
      .catch((error) => { this.populateBeerDataFailed(error);
    });
    $('.beer-card-container').show();
  }

  populateBeerContainer(data) {
    console.log(data)
    _.forEach(data.data, function(beer) {
      var available = (typeof beer.available == 'undefined') ? null : beer.available.name
      var glass = (typeof beer.glass == 'undefined') ? null : beer.glass.name
      var label = (typeof beer.labels == 'undefined') ? '/images/default-label.png' : beer.labels.medium
      var beerCard = [
        '<div class="three columns md-break flip-container">',
          '<div class="flipper">',
            '<div class="front">',
              '<img class="logo" src="' + label + '"/>',
              '<h3 class="name">' + beer.name + 't</h3>',
              '<p class="available">Availability: <span class="bold">' + available + '</span></p>',
              '<p class="abv">ABV: <span class="bold">' + beer.abv + '</span></p>',
              '<p class="ibu">IBU: <span class="bold">' + beer.ibu + '</span></p>',
              '<img class="flip-arrow" src="/images/flip-arrow.png">',
            '</div>',
            '<div class="back">',
              '<h5 class="glass">Serving: ' + glass + '</h5>',
              '<h5 class="description">' + beer.description + '</h5>',
              '<img class="flip-arrow" src="/images/flip-arrow.png">',
            '</div>',
          '</div>',
        '</div>'
      ].join('');
      $('.beer-list').append(beerCard);
    })
    this.bindEventsGeneratedContent();
  }

  handleCardFlip () {
    $(this).toggleClass('flipped');
  }

  bindEventsGeneratedContent () {
    $('.flip-container').on('click', this.handleCardFlip);
  }
  bindEvents() {
    $('.question-one').on('change', this.handleQuestionOneAction.bind(this));
    $('.question-two').on('change', this.handleQuestionTwoAction.bind(this));
  }
}

export { HomePage }
