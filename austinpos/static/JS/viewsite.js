var viewsitebutt = document.getElementById("viewsite");
var siteinfo = document.getElementById("siteinfo");
var messageBox = document.getElementById("message");
var specificsite = document.getElementById("sitemessage");
var specificsitetext = document.getElementById("specificsitetextbox");
var exitbutton = document.getElementById("exit");
var massmessage = document.getElementById("massmessage");
var massmesscontent = document.getElementById("mess");
var sitename = document.getElementById("sitename");
var notfiy = document.getElementById("notifications")
var gonadsite = document.getElementById("gonadsite");
var gonademail = document.getElementById("gonademail");
var usertoggle = document.getElementById("usertogg");
var sitedata = document.getElementById("sitedata");
var userdata = document.getElementById("userdata");

window.onload = function(){
  siteinfo.style.display="block";
  if(siteinfo.style.display="none"){
    notfiy.style.display="none";
  }
  else{
    notify.style.display="block";
  }
};

usertoggle.addEventListener('click', function(){
  sitedata.style.display = "none";
  userdata.style.display = "block";
});

massmessage.addEventListener('click', function(){
  console.log(massmessage.innerHTML)
  specificsitetext.style.display = "block";
  massmesscontent.innerHTML = "Message to ALL SITES"
  gonademail.value = massmessage.innerHTML
  gonadsite.value = "All sites"
    //we add the css class blur to the elements that we would like to blur on focus
    $("#blurblur").addClass("blur-filter");
    $("#blurblur2").addClass("blur-filter");
    $("#blurblur3").addClass("blur-filter");
    $("#blurblur4").addClass("blur-filter");
    $("#blurblur5").addClass("blur-filter");
    console.log(gonademail.value)
});

exitbutton.addEventListener('click', function(){
  specificsitetext.style.display = "none";
  $("#blurblur").removeClass("blur-filter");
  $("#blurblur2").removeClass("blur-filter");
  $("#blurblur3").removeClass("blur-filter");
  $("#blurblur4").removeClass("blur-filter");
  $("#blurblur5").removeClass("blur-filter");
});

specificsite.addEventListener('click', function(){
  specificsitetext.style.display = "block";
  massmesscontent.innerHTML = " Message to " + sitename.innerHTML;
  gonademail.value = specificsite.innerHTML;
  gonadsite.value = sitename.innerHTML;

  $("#blurblur").addClass("blur-filter");
  $("#blurblur2").addClass("blur-filter");
  $("#blurblur3").addClass("blur-filter");
  $("#blurblur4").addClass("blur-filter");
  $("#blurblur5").addClass("blur-filter");
  console.log(gonademail.value, gonadsite.value);
}); 