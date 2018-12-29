var viewsitebutt = document.getElementById("viewsite");
var siteinfo = document.getElementById("siteinfo");
var messageBox = document.getElementById("message");
var newmess = document.getElementById("buttmessage");
var specificsite = document.getElementById("sitemessage");
var specificsitetext = document.getElementById("specificsitetextbox");
var exitbutton = document.getElementById("exit");
var massmessage = document.getElementById("massmessage");
var massmesscontent = document.getElementById("mess");
var sitename = document.getElementById("sitename");

window.onload = function(){
  siteinfo.style.display="block";
};

massmessage.addEventListener('click', function(){
  specificsitetext.style.display = "block";
  massmesscontent.innerHTML = "Message to ALL SITES"
});

exitbutton.addEventListener('click', function(){
  specificsitetext.style.display = "none";
});

specificsite.addEventListener('click', function(){
  specificsitetext.style.display = "block";
  massmesscontent.innerHTML = " Message to " + sitename.innerHTML;
});

newmess.addEventListener('click', function wow(){
  messageBox.style.display = "block";
  console.log("Show Message");
});