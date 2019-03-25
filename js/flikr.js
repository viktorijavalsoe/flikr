$(document).ready(function(){

  $("form").submit(function(event){
    // Stop the form from submitting
    event.preventDefault();

    //check if input field is empty, else send an alert
    if ($("#category").val()!=""){
      var category = $("#category").val();
    } else {
      alert("you need to type something");
    };

    //check which class section that contain images has. 
    //Empty section with that class name
    if ($("section").hasClass("image_container")){
      $(".image_container").empty();
      } else {
        $(".float_container").empty();
      };

    
    var imageURL = "http://www.flickr.com/services/feeds/photos_public.gne?tags="+ category +"&format=json&jsoncallback=?";
    var category = $("#category").val('');
     
    //fetch JSON data from flicr 
    $.getJSON(imageURL, function(data){
      //store information about images as as an array of objects 
      var images = data.items;
      
      // Check which state image section is in, float or flex
      //loop through object array and create img element with url and title value from objects. 
      $.each(images, function(i, val ){
        if($("section").hasClass("image_container")){
          $("<img>").attr("src", val.media.m).attr("alt", val.title).attr("class", "flikr_image image").attr("id", i).appendTo(".image_container");
        return i < 8;
        }else{
          $("<img>").attr("src", val.media.m).attr("alt", val.title).attr("class", "float image").attr("id", i).appendTo(".float_container");
        } 
      });
      

      //Dialog box
      $(".image").on("click", function(){
        let source = $(this).attr("src");
        let x = $(this).attr("id");
        let description = images[x].title;
        $("#dialog_box").attr("src", source).attr("alt", description);
        $("#title").text(description);
        $( "#dialog" ).dialog( "open" );
     });
    });
  });
   
    $("#dialog").dialog({
      autoOpen:false,
      show:{
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
   

  $("#switch_toggle").change(function() {
    if($(this).prop('checked')) {
      $('section').removeClass('image_container');
      $("section").addClass('float_container');
      $("img").addClass("float");
      $(".switch_text").empty();
      $(".switch_text").append("Float");
    }else{
      $('img').removeClass('float');
      $('section').removeClass('float_container');
      $("section").addClass('image_container');
      $(".switch_text").empty();
      $(".switch_text").append("Flex");
    };
  });
 
});