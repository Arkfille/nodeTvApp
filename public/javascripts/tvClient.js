socket = io.connect(checkIfProduction());
socket.on('sendInput', navigate);
socket.on('getRoomCode', initRoomJoin);
var id = "#home";
var enterId;
var blocking;
var latestPressed;
var scrollLength = 0;
var modalIsUp = false;
var helpMenuIsOpen = true;
angular.module('tvApp', [])
  .controller('videoStream', function ($scope) {
    $scope.videos = ytApi.items;

  });

function navigate(input) {
  // Remove selected class

  $("*").removeClass("selected")

  console.log(input);
  if(modalIsUp && input == "back"){
    player.stopVideo();
    $(".videoPlayer").removeClass("animIn");
    $(".darken").hide();    
    modalIsUp = false;
  }
  else if (input == "back") {
    $(id).addClass("selected")
    blocking = false;
    //$(".thumbnail").removeClass("thumbhover");
  }

  if (!blocking) {
    switch (input) {
      case "up":
        $(id).prev().addClass("selected");
        id = $(id).prev();

        if (id.length == 0) {
          id = "#settings";
          $(id).addClass("selected");
        }
        break;

      case "down":
        $(id).next().addClass("selected");
        id = $(id).next();

        if (id.length == 0) {
          id = "#home";
          $(id).addClass("selected");
        }
        break;
      case "right":
        enterAct()
        break;
      case "enter":
        enterAct()
        break;
      default:

        break;
    }
      navigationAct()
  } else {

        cleanVideosHover();
    
    switch (input) {
      case "up":
        $(navigateVideos(-5)).addClass("thumbhover");
        scrollWithVideos("up")     
        break;
      case "left":
        $(navigateVideos(-1)).addClass("thumbhover");     
        break;
      case "right":
        $(navigateVideos(1)).addClass("thumbhover");     
        break;
      case "down":
        $(navigateVideos(5)).addClass("thumbhover");
        scrollWithVideos("down")     
        break;
      case "enter":
        playVideo();
        break;
    }

  }


  latestPressed = input; //I dont think this is used
}

let navigateVideos = function(steps){

  let numberFromID = enterId.substring(13);
  let videoImgID = enterId.replace(/(\d+)/gm, parseInt(numberFromID) + parseInt(steps));
  enterId = videoImgID;
  //console.log(`${numberFromID} + ${steps} = ${parseInt(numberFromID) + parseInt(steps)}`);
  return videoImgID;
}


function enterAct() {

  if (id == "#home" || id[0].id == "home" ) {
    console.log("ENTERED HOME")
    enterId = "#videoStream-1";
    shadowId = "#shadowStream-1";

    $(shadowId).addClass("thumbhover");
    $(enterId).addClass("thumbhover");
  }

  blocking = true;
}

function cleanVideosHover(){
  $(".hoverWrap").removeClass("thumbhover");


}

function navigationAct() {
  $(".contentPage").removeClass("pageActive");

  let inp = id[0].id
  console.log(inp);
  switch (inp) {
    case "home":
      $(".home").addClass("pageActive");
      break;
    case "settings":
      $(".settings").addClass("pageActive");
      break;
    case "videos":
      $(".videos").addClass("pageActive");
      break;
    case "kategories":
      break;

    default:
      $(".home").addClass("pageActive");
      break;

  }

}
     var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '615',
          width: '400',
          videoId: '',
          events: {
          }
        });
      }

function playVideo(){
  $(".darken").show();
  $(".videoPlayer").addClass("animIn");
  let youtubewatchID = $(enterId).data("watchid");  
  player.loadVideoById(youtubewatchID)
  modalIsUp = true;


}

function SearchVideo(searchQueryByUser){
  window.location.search = "?search=" + searchQueryByUser;
  
}

function scrollWithVideos(direction){
  if(direction == "up"){
    scrollLength = scrollLength - 240
    console.log("scrollLength"); 
  }
  else{
  scrollLength += 240;

  }
  let divWindow = $(".content")[0].scrollTop;
  console.log(divWindow);
    $('.content').animate({
                    scrollTop: scrollLength  
                }, 500);
  
}

setTimeout(function() {
  SpeechReckognitionInit()
}, 3000);

function SpeechReckognitionInit(){
var commands = {
    'search *searchQueryByUser (and) play first' : SearchAndPlay,
    'search *searchQueryByUser': SearchVideo,
    'play first (video)': playfirst,
}
 annyang.addCommands(commands);
  // Tell KITT to use annyang
  //SpeechKITT.annyang();
  annyang.start();
  // Define a stylesheet for KITT to use
  //SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

  // Render KITT's interface
  //SpeechKITT.vroom();

 console.log("annyang started")

  if(localStorage.getItem("playfirst")){
    playfirst();
    localStorage.removeItem("playfirst")
  }

} 

function playfirst(){
    $(".darken").show();
    $(".videoPlayer").addClass("animIn");
    let ID = "#videoStream-1";
    let youtubewatchID = $(ID).data("watchid");  
    player.loadVideoById(youtubewatchID)
    modalIsUp = true;
}

function SearchAndPlay(searchQueryByUser){
  SearchVideo(searchQueryByUser)
  localStorage.setItem("playfirst", true);
}


function initRoomJoin(data) {
  //alert("Join room: " + data+":TV" + " from remote" );
  if (!localStorage.getItem("roomCode")) {
    console.log("not there");
    data = data.substring(0, 4) + ":TV";
    localStorage.setItem("roomCode", data);
  } else {
    data = localStorage.getItem("roomCode");
  }
  joinRoom(data);
  $("#roomID").text(data);

  var roomIDp = $("<p> Connect with:  " + data + "</p>");
  $("#footer").append(roomIDp);
}


function joinRoom(input) {

  console.log(input);
  var data = input
  socket.emit('roomJoin', data);
  console.log(data);

}

// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '849771718693-oukg7eks5ss8rg3haafgt3t4aoqju2q1.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube',
  'http://localhost:3000',
  'https://enigmatic-mesa-29883.herokuapp.com'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function () {
  gapi.auth.init(function () {
    window.setTimeout(checkAuth, 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function () {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
      }, handleAuthResult);
    });
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function () {
    handleAPILoaded();
  });
}


