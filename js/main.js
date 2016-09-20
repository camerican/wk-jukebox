document.addEventListener("DOMContentLoaded",function(){
  Array.from(document.getElementsByClassName("song")).forEach(
    function(s) { 
      s.addEventListener("click",function(event){
        // console.log(event.target, event.target.classList);
        console.log(Array.from(event.target.classList).indexOf("current"));
      // if we're the current song just return instantly
      if( Array.from(event.target.classList).indexOf("current") > -1 ) return;

      console.log( event.target.getAttribute("data-file") );
      // swap the audio source
      document.getElementById("jukebox").src = "mp3/" + event.target.getAttribute("data-file");
      // update current song name
      document.getElementById("now-playing").innerText = event.target.innerText;

      // remove instances of "current" from existing button
      Array.from(document.getElementsByClassName("current")).forEach(function(el){
        el.classList.remove("current");
      });
      // add new current class to button clicked
      event.target.classList.add("current");
    });
  });
});