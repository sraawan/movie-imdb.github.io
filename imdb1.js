$(document).ready(function () {


    $("#searchBtn").click(function (e) {
        loadMovieData(e);
    });

});




       //Loading Movie Data
let loadMovieData = (e) => {

    let movieTitle;

    //which button was clicked "QuickTitleSearch" or "Search"
    let idClicked = e.target.id;
    

    if (idClicked == "searchBtn")
        movieTitle = $("#title").val();

    

    let movieYear = $("#year").val();
    let movieId = $("#id").val();
    let info = `Title:${movieTitle} Year:${movieYear} ID:${movieId}`;


    let baseURL = `https://www.omdbapi.com/?`;
    let apiURL = `https://www.omdbapi.com/?`;
    let apiKey = `&apikey=454b3748`;



    if (movieTitle != '' && movieTitle != 'undefined' && movieTitle != null) {
        apiURL = apiURL.concat(`&t=${movieTitle}`);

    }

    if (movieYear != '' && movieYear != 'undefined' && movieYear != null) {
        apiURL = apiURL.concat(`&y=${movieYear}`);
    }

    if (movieId != '' && movieId != 'undefined' && movieId != null) {
        baseURL = baseURL.concat(`&i=${movieId}`);
        apiURL = baseURL;

    }


    apiURL = apiURL.concat(apiKey);
    console.log("Hitting Api : " + apiURL);




    $.ajax({
        type: "GET",
        url: apiURL,
        dataType: "json",
        success: function (data) {

            let response = data.Response;
            console.log("Response Returned: " + response);
            let responseData;

            if (response == "True") {

                let poster;

                if (data.Poster != "N/A")
                    poster = data.Poster;
                else
                    poster = "images/Sorry-image-not-available.png";


                responseData = `
                        <tr><td colspan="2" style="text-align: center;"><img src="${poster}" height="200px"></td></tr>
                        <tr><td>Title</td><td>${data.Title}</td></tr>
                        <tr><td>Year</td><td>${data.Year}</td></tr>
                        <tr><td>imdbID</td><td>${data.imdbID}</td></tr>
                        <tr><td>Rated</td><td>${data.Rated}</td></tr>
                        <tr><td>Released</td><td>${data.Released}</td></tr>
                        <tr><td>Runtime</td><td>${data.Runtime}</td></tr>
                        <tr><td>Genre</td><td>${data.Genre}</td></tr>
                        <tr><td>Director</td><td>${data.Director}</td></tr>
                        <tr><td>Actors</td><td>${data.Actors}</td></tr>
                        <tr><td>imdbRating</td><td>${data.imdbRating}</td></tr>
                       `;
            } else if (response == "False") {
                responseData = `<tr><td colspan="2" style="text-align: center;">Sorry No Result Found</td></tr>`;
            }


            $("#infoTable").html(responseData);


        },
        error: function (response) {
            alert("Something is wrong " + response);
        },
        timeout: 3000,

        beforeSend: () => {
            console.log("Making Request..");
        },

        complete: () => {
            console.log("Request Completed..");


        }


    });







};