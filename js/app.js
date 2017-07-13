(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }

  };




$('.btn-large').click(function(e) {
  e.preventDefault();
  movies.length = 0;
  var movieInput = $('#search').val();


  $.ajax({url: `https://omdb-api.now.sh/?s=${movieInput}`, success: function(result){
    for (var movie of result.Search) {
      var obj = {};
      obj.id = movie.imdbID;
      obj.poster = movie.Poster;
      obj.title = movie.Title;
      obj.year = movie.Year;
      movies.push(obj)
    }
    renderMovies();



    $('.btn').click(function(e) {

      var movieId = event.srcElement.hash.slice(1)
      console.log(event)

      $.ajax({url: `http://www.omdbapi.com/?i=${movieId}&apikey=702b3bb5`, success: function(result){
        $('.plotText').empty();
        $('.modal-content').append(`<p class="plotText">${result.Plot}</p>`)
      }});

    });



  }});

});



})();
