$(document).ready(function(){
  $("form").submit(function(event){
    // Stop the form from submitting
    event.preventDefault();

    var category = $("#category").val()
    var imageURL = "http://www.flickr.com/services/feeds/photos_public.gne?tags="+ category +"&format=json&jsoncallback=?";
      
    $.getJSON(imageURL, function(data){

       
        console.log(data.items);
        $.each(data.items, function(i, val ){
          $("<img>").attr("src", val.media.m). attr("alt", val.title).appendTo(".image_container");
        })

      })


  })
});