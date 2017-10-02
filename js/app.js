$( document ).ready(function() {
  var color = $(".selected").css("background-color");
  var $canvas = $("canvas");
  var context = $canvas[0].getContext("2d");
  var lastEvent;
  var mouseDown = false;

  $(".controls").on("click", "li", function() {
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
    color = $(this).css("background-color");
  });

  $("#revealColorSelect").click(function() {

    changeColor();
    $("#colorSelect").toggle();
  });

  function changeColor() {
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
  }

  $("input[type=range]").change(changeColor);

  $("#addNewColor").click(function() {
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls ul").append($newColor);
    $newColor.click();
  });

  $canvas.mousedown(function(e) {
    lastEvent = e;
    mouseDown = true;
  }).mousemove(function(e) {
    if (mouseDown) {
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
  }).mouseup(function() {
    mouseDown = false;
  }).mouseleave(function() {
    $canvas.mouseup();
  });

  // Scroll to top of page
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  });
  
  //Click event to scroll to top
  $('.scrollToTop').click(function () {
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });

});
