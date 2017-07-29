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


    debugger

  }

  bindEvents() {
    $('.question-one').on('change', this.handleQuestionOneAction.bind(this));
    $('.question-two').on('change', this.handleQuestionTwoAction.bind(this));
  }
}

export { HomePage }
