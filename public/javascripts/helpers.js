

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

