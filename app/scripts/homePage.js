import { BreweryDB } from 'scripts/breweryDB.js'

class HomePage {
  constructor() {
    this.breweryDB = new BreweryDB();
    console.log("fire")
    this.breweryDB.fetchStyles()
      .then((data) => { this.populateBeerStyles(data); })
      .catch((error) => { this.populateBeerStylesFailed(error); });
  }

  initialize() {
    this.breweryDB.fetchStyles()
      .then((data) => { this.populateBeerStyles(data); })
      .catch((error) => { this.populateBeerStylesFailed(error); });
  }

  populateBeerStyles(data) {
    console.log(data);
    // for (var i=0; i < data.objects.length; i++) {
    //   var posting = [
    //       '<div class="six columns md-break">',
    //         '<p class="list-copy">Job Opening</p>',
    //         '<h1 class="job-title"></h1>',
    //         '<h5><a class="job-link" href="">Details</a></h5>',
    //         '<div class="gray-line"></div>',
    //       '</div>'
    //   ].join('');

    //   $('.job-listing-header').show();
    //   $(".job-listing").html(posting);
    //   $(".job-title").html(data.objects[i].title);
    //   $(".job-link").attr('href', "/careers-detail/?id="+data.objects[i].id);
    //   $(".job-link").attr('class', 'animated-underline');
    // }
  }

  populateBeerStylesFailed() {
    console.log('fail');
  }
}

export { HomePage }
