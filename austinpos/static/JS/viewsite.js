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
var sitetoggle = document.getElementById("sitetogg");
var sitedata = document.getElementById("sitedata");
var userdata = document.getElementById("userdata");



usertoggle.addEventListener('click', function(){
    userdata.style.display = "block";
    sitedata.style.display = "none";
    usertoggle.style.display = "none";
    sitetoggle.style.display = "block";
    console.log("view users should work");
});

sitetoggle.addEventListener('click', function(){
  userdata.style.display = "none";
  sitedata.style.display = "block";
  usertoggle.style.display = "block";
  sitetoggle.style.display = "none";
  console.log("view users should work");
});

massmessage.addEventListener('click', function(){
  console.log(massmessage.innerHTML)
  specificsitetext.style.display = "block";
  massmesscontent.innerHTML = "Message to ALL SITES"
  gonademail.value = massmessage.innerHTML
  gonadsite.value = "All sites"
    console.log(gonademail.value)
});

exitbutton.addEventListener('click', function(){
  specificsitetext.style.display = "none";
});

specificsite.addEventListener('click', function(){
  specificsitetext.style.display = "block";
  massmesscontent.innerHTML = " Message to " + sitename.innerHTML;
  gonademail.value = specificsite.innerHTML;
  gonadsite.value = sitename.innerHTML;
  console.log(gonademail.value, gonadsite.value);
}); 