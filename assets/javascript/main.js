var rappers = ["2 Pac", "Biggie", "Nas", "Eminem", "Jay-Z"];

$(document).ready(function() {
    for (var i = 0; i < rappers.length; i++) {
        $("#rapper-buttons").append("<button type='button' onclick='searchGif(\"" + rappers[i] + "\")' class='white-text waves-effect waves-light btn-large btn-flat tooltipped' value=' " + rappers[i] + "'> " + rappers[i] + " </button>");
    }
});

function rapperButtonClicked() {
    var userInput = $('#rapper-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#rapper-input').val();

    if (userInput) {
        $('#rapper-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='white-text waves-effect waves-light btn-large btn-flat tooltipped' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#rappers').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#rappers').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}