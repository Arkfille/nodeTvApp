socket = io.connect("http://localhost:3000");
socket.on('sendInput', navigate);
socket.on('getRoomCode', initRoomJoin);
var id = "#home";
var enterId;
var blocking;
var latestPressed;

angular.module('tvApp', [])
  .controller('videoStream', function ($scope) {
    $scope.videos = ytApi.items;

  });

function navigate(input) {
  // Remove selected class

  $("*").removeClass("selected")

  console.log(input);
  if (input == "back") {
    $(id).addClass("selected")
    blocking = false;
    $(".thumbnail").removeClass("thumbhover");
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
    switch (input) {
      case "up":

        break;
      case "left":
        $(enterId).prev().addClass("thumbhover");
        enterId = $(enterId).prev();
        break;
      case "right":
        $(`#${enterId[0].id}`).addClass("thumbhover");
        enterId = $(enterId).parent().next().find("img");
        console.log(`#${enterId[0].id}`)
        
        break;
      case "down":
      test();
        break;
      case "enter":
        break;
    }

    navigateVideos();
  }


  latestPressed = input; //I dont think this is used
}
function test(){

        $("#videoStream-2").addClass("thumbhover");

}
function enterAct() {

  if (id == "#home" || id[0].id == "home" ) {
    console.log("ENTERED HOME")
    enterId = "#videoStream-0";
    $(enterId).addClass("thumbhover");
  }

  blocking = true;
}

function navigateVideos(){
  $(".thumbnail").removeClass("thumbhover");


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
  'http://localhost:3000'
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