socket = io.connect(checkIfProduction());
socket.on("notconnected",notConnected)
function sendInp(input){

  console.log(input);
  var data = input
  socket.emit('recieveInput', data);

}
window.onload = function(){
  if (!localStorage.getItem("roomCode")) {
    console.log("not there");
  }
  else{
    data = localStorage.getItem("roomCode");
    document.getElementById('inp').value = data;
    joinRoom(data)
  }
}

function joinRoom(code){
  if(!code){
  var data = document.getElementById('inp').value;
  socket.emit('roomJoin', data);
  localStorage.setItem("roomCode", data);
  document.getElementById('modal').className = "";
}
else{
  socket.emit('roomJoin', code);
}
}

function openModal(){
  document.getElementById('modal').className = "active"
}

function modalClose(){
  document.getElementById('modal').className = "";

}
function notConnected(){
  alert("You are not connected, please enter a room code\n or contact arkfille@hotmail.com for support")

}
