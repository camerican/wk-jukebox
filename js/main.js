// Object Oriented Jukebox implmentation
// this version accepts an HTML Element to be the Jukebox
function Jukebox( element, path ) {
  this.element = element;
  this.path = path + "/";
  this.songs = [];        // array of songs
  this.currentSong = 0;
  this.addSong = function() {
    // create a reference to a Song to be our "this"
    var that = Object.create(Song.prototype);
    // use apply to pass all arguments to the Song constructor
    this.songs.push( Song.apply(that, arguments) );
    return this; // allows for method chaining
  }
  this.play = function() {
    this.element.play();
    return this; // allows for method chaining
  }
  this.pause = function() {
    this.element.pause();
    return this;
  }
  this.next = function() {
    this.currentSong = (this.currentSong+1) % this.songs.length;
    this.element.src = this.path + this.songs[this.currentSong].file;
  }
  this.prev = function() {
    this.currentSong = (this.currentSong+1+this.songs.length) % this.songs.length;
    this.element.src = this.path + this.songs[this.currentSong].file;
  }
  return this;
}

// Song will track the name, artist, and file location
function Song( name, artist, file ) {
  this.name = name;
  this.artist = artist;
  this.file = file;
  return this;
}
var juke;



document.addEventListener("DOMContentLoaded",function(){
  // Create our Jukebox Object and add songs to it
  juke = new Jukebox( document.getElementById("jukebox"), "mp3" );
  juke.addSong( 
    "Amy Stroup", "Just You", "amy-stroup_just-you.mp3").addSong(
    "Foo Fighters", "Iron Rooster", "foo-fighters_iron-rooster.mp3").addSong(
    "Bluegrass Mastery", "Any Old Road", "bluegrass-mastery_any-old-road.mp3");


  // The old, preobject code
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

}); // End DOMContentLoaded Listener







