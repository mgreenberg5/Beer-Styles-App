var _ = require('lodash');
import { BreweryDB } from 'scripts/breweryDB.js'

class HomePage {
  constructor() {
    this.selectedCategoryStyle = null;
    this.beerData = null;
    this.bindEvents();
    this.breweryDB = new BreweryDB();
    this.breweryDB.fetchStyles()
      .then((data) => { this.populateBeerData(data);})
      .catch((error) => { this.populateBeerDataFailed();});
  }

  populateBeerData(data) {
    this.beerData = data;
    this.populateQuestionOne();
  }

  hideBeerCardContainer() {
    $('.beer-card-container').hide();
  }

  hideLoader() {
    $('.loader-container').hide();
  }

  displayBeerCardContainer() {
    $('.loader-container').show();
    $('.beer-card-container').show();
  }

  populateBeerDataFailed() {
    var errorMessage  = [
        '<div class="twelve columns text-center">',
          '<h1>Oops Something Went Wrong</h1>',
        '</div>'
      ].join('');
    $(".beer-list").append(errorMessage);
    this.displayBeerCardContainer();
    this.hideLoader();
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

  resetBeerList() {
    $('.beer-list').find('.flip-container').remove();
    $('.pagination').children().remove();
  }

  handleQuestionOneAction() {
    var questionTwo = $('.question-two');
    var selectedCategory = $('.question-one').val();
    this.hideBeerCardContainer();
    this.resetBeerList();
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
    this.selectedCategoryStyle = $('.question-two').val();
    var paramaters = '&styleId='+ this.selectedCategoryStyle + '&p=1&sort=ASC'
    this.resetBeerList();
    this.displayBeerCardContainer();
    this.breweryDB.fetchBeers(paramaters)
      .then((data) => { this.populateBeerContainer(data);})
      .catch((error) => { this.populateBeerDataFailed(error);});
  }

  handlePageClick() {
    var page = $(event.target).data('page-number');
    var paramaters = '&styleId='+ this.selectedCategoryStyle + '&p='+ page + '&sort=ASC'
    this.resetBeerList();
    this.displayBeerCardContainer();
    this.breweryDB.fetchBeers(paramaters)
      .then((data) => { this.populateBeerContainer(data);})
      .catch((error) => { this.populateBeerDataFailed(error);});
  }


  createPaging(data) {
    if(data.numberOfPages == 1){ return; }
    for (var i = 1; i <= data.numberOfPages; i++) {
      if(data.currentPage == i) {
        var page = '<a class="page-number selected" data-page-number='+ i +'>' + i + '</a>'
      } else {
        var page = '<a class="page-number" data-page-number='+ i +'>' + i + '</a>'
      }
      $('.pagination').append(page);
    }
  }

  populateBeerContainer(data) {
    this.hideLoader();
    _.forEach(data.data, function(beer) {
      var logo = (typeof beer.labels == 'undefined') ? '/images/default-label.png' : beer.labels.medium
      var availableHTML = (typeof beer.available == 'undefined') ? '' : '<p class="available">Availability: <span class="bold">' + beer.available.name + '</span></p>';
      var abvHTML = (typeof beer.abv == 'undefined') ? '' : '<p class="abv">ABV: <span class="bold">' + beer.abv + '</span></p>';
      var ibuHTML = (typeof beer.ibu == 'undefined') ? '' : '<p class="ibu">IBU: <span class="bold">' + beer.ibu + '</span></p>';
      var ibuHTML = (typeof beer.ibu == 'undefined') ? '' : '<p class="ibu">IBU: <span class="bold">' + beer.ibu + '</span></p>';
      var glassHTML = (typeof beer.glass == 'undefined') ? '' : '<h5 class="glass">Serving: ' + beer.glass.name + '</h5>';
      var descriptionHTML = (typeof beer.glass == 'undefined') ? '' : '<h5 class="glass">Serving: ' + beer.description + '</h5>';
      var flipArrowHTML = (typeof beer.glass == 'undefined' && typeof beer.glass == 'undefined') ? '' : '<img class="flip-arrow" src="/images/flip-arrow.png">';
      var beerCard = [
        '<div class="column flip-container">',
          '<div class="flipper">',
            '<div class="front">',
              '<img class="logo" src="' + logo + '"/>',
              '<h3 class="name">' + beer.name + '</h3>',
              availableHTML,
              abvHTML,
              ibuHTML,
              flipArrowHTML,
            '</div>',
            '<div class="back">',
              '<div class="scroll-container">',
                glassHTML,
                descriptionHTML,
              '</div>',
              '<img class="flip-arrow" src="/images/flip-arrow-white.png">',
            '</div>',
          '</div>',
        '</div>'
      ].join('');
      $('.beer-list').append(beerCard);
    })
    this.createPaging(data);
    this.bindEventsGeneratedContent();

  }

  handleCardFlip () {
    $(event.target).closest('.flip-container').toggleClass('flipped');
  }

  bindEventsGeneratedContent () {
    $('.flip-arrow').on('click', this.handleCardFlip.bind(this));
    $('.page-number').on('click', this.handlePageClick.bind(this));
  }

  bindEvents() {
    $('.question-one').on('change', this.handleQuestionOneAction.bind(this));
    $('.question-two').on('change', this.handleQuestionTwoAction.bind(this));
  }
}

export { HomePage }
