class BreweryDB {
  constructor() {
    this.breweryDBBaseUrl = 'http://api.brewerydb.com/v2/';
    this.breweryDBKey = '414a79b8f85458301dac5d28d7e234de'; //TODO remove from front-end
  }

  fetchStyles() {
    var api = 'styles/';
    return this.get(api);
  }

  fetchCategories() {
    var api = 'categories/';
    return this.get(api);
  }

  get(api) {
    var url = this.breweryDBBaseUrl + api + '?format=json&key=' + this.breweryDBKey
    console.log(url)
    return $.ajax({
      url: this.breweryDBBaseUrl + api + '?format=json&key=' + this.breweryDBKey
    }).promise();
  }

  // submitApplication(id, data) {
  //   var api = 'openings/' + id + '/apply';
  //   return this.post(api, data);
  // }

  // post(api, payLoad) {
  //   return $.ajax({
  //     url: this.breweryDBBaseUrl + api + '/?client_name=' + this.breweryDBKey,
  //     data: JSON.stringify(payLoad),
  //     contentType: 'application/json',
  //     dataType: 'json',
  //     type: 'POST'
  //   }).promise();
  // }
}

export { BreweryDB }
