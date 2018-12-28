var viewsitebutt = document.getElementById("viewsite");
var siteinfo = document.getElementById("siteinfo");
var messageBox = document.getElementById("message");
var newmess = document.getElementById("buttmessage");
var specificsite = document.getElementById("sitemessage");
var specificsitetext = document.getElementById("specificsitetextbox");
var exitbutton = document.getElementById("exit");

exitbutton.addEventListener('click', function(){
  specificsitetext.style.display = "none";
});

specificsite.addEventListener('click', function(){
  specificsitetext.style.display = "block";
});

newmess.addEventListener('click', function wow(){
  messageBox.style.display = "block";
  console.log("Show Message");
});