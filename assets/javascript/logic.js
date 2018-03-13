$(document).ready(function() {
});

      
      // Initial array of GIFS
      var topics = ["Inu Shiba", "Ninja", "Halo", "World of Warcraft", "Walking Dead", "Game of Thrones", "StarWars", "Marvel"];
      var topicArea = $("#topics-view");





      // Adding click event listeners to all elements with a class of "topic"
      $(document).on("click", ".topic", displayTopicInfo);
    //   $( ".topic" ).click(function() {
    //     alert( "Handler for .click() called." );
    //   });


      // displayTopicInfo function re-renders the HTML to display the appropriate content
      function displayTopicInfo() {

        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creates AJAX call for the specific GIF button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

            var results = response.data;

            // Creates a div to hold the GIF
            var topicDiv = $("<div>");
            topicDiv.addClass("card");

            
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

            // Retrieves the GIF, Rating
            var gifData = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            gifData.addClass("card-img-top gif");
            gifData.attr("data-still", results[i].images.fixed_height_still.url);
            gifData.attr("data-animate", results[i].images.fixed_height.url);
            gifData.attr("data-state", "still");
            var ratingData = $("<h5>").text("Rating: " + results[i].rating);
            ratingData.addClass("card-title");

            // Displays the GIF, Rating
            topicArea.append(topicDiv);
            topicDiv.append(gifData, ratingData);
            }
        });
      };

      // Function for displaying Topic data
      function renderButtons() {

        // Deletes the Topics prior to adding new Topic
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each topic in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of topic to our button
          a.addClass("topic btn btn-outline-success");
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add topic button is clicked
      $("#add-topic").on("click", function(event) {
          console.log("add topic button clicked");
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#topic-input").val().trim();

        // The topic from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
      });

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

    // Pause/Unpause Click Function
    $(document).on( 'click', '.gif', function () {
    //   $(".gif").on("click", function() {
        var state = $(this).data("state");
        console.log (state);

        if (state === "still") {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).data('state', 'animate');
        } else {
          $(this).attr('src', $(this).attr('data-still'));
        $(this).data('state', 'still');
        };

    });

    //   $(this).on("click", function(event){
    //       console.log(this);
    //   });