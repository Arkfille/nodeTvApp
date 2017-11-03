

const checkIfProduction = function(){
    let connection
    if(location.hostname === "localhost"){
        connection = "http://localhost:3000";
    }
    else{
        connection = "https://enigmatic-mesa-29883.herokuapp.com";
    }

    return connection;

}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

var fullscreen = false;
function launchIntoFullscreen() {
    if(!fullscreen){
    $(".videoPlayer").css({"width": "100%", "height": "100%", "bottom": "88%"});
    fullscreen = true;
   }
   else{
       console.log("else");
    $(".videoPlayer").css({"width": "80%", "height": "600px", "bottom": "66%"});
       fullscreen = false;
   }
}

function callPlayer(func, args) {
    let frame_id = "player";
    if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
    var iframe = document.getElementById(frame_id);
    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        iframe = iframe.getElementsByTagName('iframe')[0];
    }
    if (iframe) {
        // Frame exists, 
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": func,
            "args": args || [],
            "id": frame_id
        }), "*");
    }
}