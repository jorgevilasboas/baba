var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://images6.alphacoders.com/550/thumb-1920-550393.jpg)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


