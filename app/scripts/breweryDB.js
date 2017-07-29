class BreweryDB {
  constructor() {
    this.breweryDBBaseUrl = 'http://api.brewerydb.com/v2/';
    this.breweryDBKey = '414a79b8f85458301dac5d28d7e234de'; //TODO remove from front-end
  }

  fetchStyles() {
    var api = 'styles/';
    return this.get(api);
  }

  fetchBeers(paramaters) {
    var api = 'beers/';
    return this.get(api, paramaters);
  }

  get(api, paramaters) {
    if(typeof paramaters == "undefined") {
      return $.ajax({
        url: this.breweryDBBaseUrl + api + '?format=json&key=' + this.breweryDBKey
      }).promise();
    } else {
      return $.ajax({
        url: this.breweryDBBaseUrl + api + '?format=json&key=' + this.breweryDBKey + paramaters
      }).promise();
    }
    return $.ajax({
      url: this.breweryDBBaseUrl + api + '?format=json&key=' + this.breweryDBKey
    }).promise();
  }
}

export { BreweryDB }
