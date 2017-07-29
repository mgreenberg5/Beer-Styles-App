class BreweryDB {
  constructor() {
    this.breweryDBBaseUrl = 'http://api.brewerydb.com/v2/';
    this.breweryDBKey = '402868022acc9333c88e21f3a1e6a390' //TODO remove from front-end TONIC
    // this.breweryDBKey = '414a79b8f85458301dac5d28d7e234de'; //TODO remove from front-end GMAIL
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
  }
}

export { BreweryDB }
