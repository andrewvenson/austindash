var viewsitebutt = document.getElementById("viewsite");
var siteinfo = document.getElementById("siteinfo");
var messageBox = document.getElementById("message")
var newmess = document.getElementById("buttmessage")


newmess.addEventListener('click', function wow(){
  messageBox.style.display = "block";
  console.log("Show Message");
});