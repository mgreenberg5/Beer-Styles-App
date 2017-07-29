class BreweryDB {
  constructor() {
    this.breweryDBKey = '402868022acc9333c88e21f3a1e6a390' //TODO remove from front-end TONIC
    // this.breweryDBKey = '414a79b8f85458301dac5d28d7e234de'; //TODO remove from front-end GMAIL
  }

  fetchStyles() {
    return $.ajax({
      url: 'https://alr9dhxrxf.execute-api.us-west-2.amazonaws.com/prod?format=json&key=' + this.breweryDBKey,
      ataType: "jsonp",
    }).promise();
  }

  fetchBeers(paramaters) {
    return $.ajax({
      url: 'https://3sd6uws48d.execute-api.us-west-2.amazonaws.com/prod?format=json&key=' + this.breweryDBKey + paramaters,
      ataType: "jsonp",
    }).promise();
  }
}

export { BreweryDB }
