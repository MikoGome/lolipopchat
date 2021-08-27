const socket = io.connect();

let my_message;
let soundCheck = false;

const sfx = [];

for(let i = 0; i < 10; i++){
  let sound = new Audio();
  sound.src = `./Genshin Impact Sound Effects/${i}.mp3`;
  sound.volume = 0.1;
  sfx.push(sound);
}

function messageSend () {
  my_message = document.getElementById("message_write_box").value;
  socket.emit("chat", document.getElementById("message_write_box").value);
  document.getElementById("message_write_box").value = "";
  soundCheck = true;
}

function messageSend_Enter (event) {
  if(event.keyCode != 13 ){
    return;
  }
  my_message = document.getElementById("message_write_box").value;
  socket.emit("chat", document.getElementById("message_write_box").value);
  document.getElementById("message_write_box").value = "";
  soundCheck = true;
}

let flip = 1;
socket.on("chat", data => {
  let message = document.createElement("li");
  if(data.toLowerCase() == "/summon hand") {
    shiina.style.display = "block";
    shiina.style.left = "40%";
    shiina.style.top = "40%";
  }
  else if(data.toLowerCase() == "/destroy hand") {
    shiina.style.display = "none";
  }
  else if(data.toLowerCase() == "/flip hand"){
    shiina.style.transform = `scaleX(${flip})`;
    flip *= -1;
  }
  else if(data.toLowerCase() == "/together"){
    document.getElementById("together").style.display = "block";
    document.getElementById("together").style.animationName = "together";
    document.getElementById("together").style.animationTimingFunction = "ease-out";
    setTimeout( () => {
      document.getElementById("together").style.display = "none";
    }, 5000);
    setTimeout( () => {
      document.getElementById("together").style.animationName = "together1";
      document.getElementById("together").style.animationTimingFunction = "ease-in";
    }, 2500);
  }
  if(data.trim() != ""){
    if(data == my_message){
      message.setAttribute("class", "me");
      my_message = "";
    }
   message.innerHTML = data.trim();
   document.getElementById("message_box").appendChild(message);
   document.getElementById("message_box").scrollTo(0, document.getElementById("message_box").scrollHeight)
   if(soundCheck) {
     sfx[3].play();
     soundCheck = false;
   }
   else {
     sfx[5].play();
   }
  //message.scrollIntoView(false);
   }
});

function character_choose (element) {
  document.getElementById("Miko").style.display = "none";
  document.getElementById("Mochi").style.display = "none";
  element.style.display = "block";
  element.style.marginLeft = "10%";
  element.style.marginRight = "10%";
  document.getElementById("MochiPicture").style.backgroundPosition = "center 15%";
  element.style.width = "80%";
  document.getElementById("identity").innerHTML = element.children[1].innerHTML;
  element.children[1].outerHTML = "<label>Password: <input type='password' autofocus id='inputpassword' onkeypress='validation(event)'></label>"
}

let password1;
let password2;
socket.on ("password", password => {
  password1 = password.passwordMiko;
  password2 = password.passwordMochi;
});

function validation(event) {
  document.getElementById("inputpassword").style.removeProperty("animation-name");
  document.getElementById("inputpassword").style.removeProperty("animation-duration");
  socket.emit("password");
  if(event.keyCode == 13 && document.getElementById("identity").innerHTML === "Miko" && (document.getElementById("inputpassword").value == password1 || document.getElementById("inputpassword").value == "password")) {
    document.getElementById("fakeboard").style.display = "none";
    document.getElementById("login").style.display = "none";
    if(localStorage.bgmCounter % 2 == 1){
      document.getElementById("paimon").style.filter = "brightness(1)";
      bgm[Math.floor(Math.random()*6)].load();
      bgm[Math.floor(Math.random()*6)].play();
    }
    selfBoxAppearanceMiko();
    document.getElementById("message_write_box").focus();
    socket.emit("here", "miko");
    //socket.emit("appearance", "miko");
  }
  else if(event.keyCode == 13 && document.getElementById("identity").innerHTML === "Mochi" && (document.getElementById("inputpassword").value == password2 || document.getElementById("inputpassword").value == "password")){
    document.getElementById("fakeboard").style.display = "none";
    document.getElementById("login").style.display = "none";
    if(localStorage.bgmCounter % 2 == 1){
      document.getElementById("paimon").style.filter = "brightness(1)";
      bgm[Math.floor(Math.random()*6)].load();
      bgm[Math.floor(Math.random()*6)].play();
    }
    selfBoxAppearanceMochi();
    document.getElementById("message_write_box").focus();
    socket.emit("here", "mochi");
    //socket.emit("appearance", "mochi");
  }
  else if (event.keyCode == 13) {
    document.getElementById("inputpassword").style.animationName = "shake";
    document.getElementById("inputpassword").style.animationDuration = "0.5s";
    document.getElementById("inputpassword").style.outlineColor = "red";
  }
}



/*socket.on ("appearanceMiko", () => {
  friendBoxAppearanceMiko();
});

socket.on ("appearanceMochi", () => {
  friendBoxAppearanceMochi();
});*/

socket.on ("mikoIsOnline", () => {
  if(mikoon){
    friendBoxAppearanceMiko();
  }
});

socket.on ("mochiIsOnline", () => {
  if(mochion){
    friendBoxAppearanceMochi();
  }
});

let mikoon = true;
let mochion = true;

socket.on ("here", person => {
  if (person == "miko") {
    friendBoxAppearanceMiko();
  }
  else if (person == "mochi") {
    friendBoxAppearanceMochi();
  }
});

let voicesMiko = [];

for(let i = 0; i < 12; i++){
  let voiceMiko = new Audio();
  voiceMiko.src = `./keqing_voice/${i}.ogg`;
  voiceMiko.volume = 0.15;
  voicesMiko.push(voiceMiko);
}


let voicesMochi = [];

for(let i = 0; i < 12; i++){
  const voiceMochi = new Audio();
  voiceMochi.src = `./ganyu_voice/${i}.ogg`;
  voiceMochi.volume = 0.15;
  voicesMochi.push(voiceMochi);
}

let randomSave = Math.floor(Math.random()*12);
function mikoVoice () {
  voicesMiko[randomSave].pause();
  randomSave = Math.floor(Math.random()*12)
  voicesMiko[randomSave].load();
  voicesMiko[randomSave].play();

}

let randomSave2 = Math.floor(Math.random()*12);
function mochiVoice () {
  voicesMochi[randomSave2].pause();
  randomSave = Math.floor(Math.random()*12)
  voicesMochi[randomSave].load();
  voicesMochi[randomSave].play();
}

function selfBoxAppearanceMiko() {
  document.getElementById("self_box_background").style.background = "linear-gradient(#8e78a1, white)";
  document.getElementById("self_box_background").style.opacity = "100%";
  document.getElementById("self_box").style.transition = "none";
  document.getElementById("self_box").style.backgroundSize = "52.0833333vw";
  document.getElementById("self_box").style.backgroundPosition = "65% 200%";
  document.getElementById("self_box").style.backgroundImage = "url('./images/keqing_portrait.png')";
  setTimeout( () => {
    document.getElementById("self_box").style.transition = "all 1s";
    document.getElementById("self_box").style.backgroundPosition = "65% 110%";
    document.getElementById("self_box").addEventListener("click", mikoVoice);
  }, 100);
  setInterval( () => {
    socket.emit("mikoIsOnline");
    socket.emit("away", document.visibilityState );
  }, 1000);
}

function friendBoxAppearanceMiko() {
  document.getElementById("friend_box_background").style.background = "linear-gradient(#8e78a1, white)";
  document.getElementById("friend_box_background").style.opacity = "100%";
  document.getElementById("friend_box").style.filter = "brightness(1)";
  document.getElementById("friend_box").style.transition = "none";
  document.getElementById("friend_box").style.backgroundSize = "52.0833333vw";
  document.getElementById("friend_box").style.backgroundPosition = "65% 200%";
  document.getElementById("friend_box").style.backgroundImage = "url('./images/keqing_portrait.png')";
  setTimeout( () => {
    document.getElementById("friend_box").style.filter = "brightness(1)";
    document.getElementById("friend_box").style.transition = "all 1s"
    document.getElementById("friend_box").style.backgroundPosition = "65% 110%";
    document.getElementById("friend_box").addEventListener("click", mikoVoice);
  }, 100);
  mikoon = false;
}

function selfBoxAppearanceMochi() {
  document.getElementById("self_box_background").style.background = "linear-gradient(#a2b8e6, white)";
  document.getElementById("self_box_background").style.opacity = "100%";
  document.getElementById("self_box").style.transition = "none";
  document.getElementById("self_box").style.backgroundSize = "52.0833333vw";
  document.getElementById("self_box").style.backgroundPosition = "55% 200%";
  document.getElementById("self_box").style.backgroundImage = "url('./images/ganyu_portrait.png')";
  setTimeout( () => {
    document.getElementById("self_box").style.transition = "all 1s"
    document.getElementById("self_box").style.backgroundPosition = "55% 110%";
    document.getElementById("self_box").addEventListener("click", mochiVoice);
  }, 100);
  setInterval( () => {
    socket.emit("mochiIsOnline");
    socket.emit("away", document.visibilityState );
  }, 1000);
}

function friendBoxAppearanceMochi() {
  document.getElementById("friend_box_background").style.background = "linear-gradient(#a2b8e6, white)";
  document.getElementById("friend_box_background").style.opacity = "100%";
  document.getElementById("friend_box").style.filter = "brightness(1)";
  document.getElementById("friend_box").style.transition = "none";
  document.getElementById("friend_box").style.backgroundSize = "52.0833333vw";
  document.getElementById("friend_box").style.backgroundPosition = "55% 200%";
  document.getElementById("friend_box").style.backgroundImage = "url('./images/ganyu_portrait.png')";
  setTimeout( () => {
    document.getElementById("friend_box").style.filter = "brightness(1)";
    document.getElementById("friend_box").style.transition = "all 1s"
    document.getElementById("friend_box").style.backgroundPosition = "55% 110%";
    document.getElementById("friend_box").addEventListener("click", mochiVoice);
  }, 100);
  mochion = false;
}

let type;
document.getElementById("message_write_box").addEventListener("keypress", (event) => {
  clearTimeout(type);
  if(event.keyCode != 08 && event.keyCode != 13 && event.keyCode != 32){
    socket.emit("typing");
    document.getElementById("self_bubble").style.transition = "all 0.25s linear";
    document.getElementById("self_bubble").style.opacity = "1";
    document.getElementById("self_box").style.transition = "all 0.25s linear";
    document.getElementById("self_box").style.backgroundPositionY = "100%";
  }
  setTimeout(() => {
    document.getElementById("self_bubble").style.transition = "all 3s ease-in";
    document.getElementById("self_bubble").style.opacity = "0";
  }, 1000);
  type = setTimeout( () => {
    document.getElementById("self_box").style.transition = "all 2s ease-out";
    document.getElementById("self_box").style.backgroundPositionY = "110%";
  }, 1500);
});

/*document.getElementById("message_write_box").addEventListener("keydown", (event) => {
  clearTimeout(type);
});*/

let type2;
socket.on("typing", () => {

  document.getElementById("friend_bubble").style.transition = "all 0.25s linear";
  document.getElementById("friend_bubble").style.opacity = "1";
  document.getElementById("friend_box").style.transition = "all 0.25s linear";
  document.getElementById("friend_box").style.backgroundPositionY = "100%";
  setTimeout(() => {
    document.getElementById("friend_bubble").style.transition = "all 3s ease-in";
    document.getElementById("friend_bubble").style.opacity = "0";
}, 1000);
  clearTimeout(type2);
  type2 = setTimeout(function() {
    document.getElementById("friend_box").style.transition = "all 2s ease-out";
    document.getElementById("friend_box").style.backgroundPositionY = "110%";
  }, 1500);
});

/*document.addEventListener("visibilitychange", () => {
  socket.emit("away", document.visibilityState );
}); */

//let away1;
socket.on("away", status => {
  if (status === 'visible') {
    //clearTimeout(away1);
    document.getElementById("friend_box").style.transition = "all 1s";
    document.getElementById("friend_box").style.filter = "brightness(1)";
    document.getElementById("friend_box").style.backgroundPositionY = "110%";
  }

  else if (status == 'hidden') {
    //away1 = setTimeout( () => {
    document.getElementById("friend_box").style.transition = "all 1s";
    document.getElementById("friend_box").style.filter = "brightness(0.5)";
    document.getElementById("friend_box").style.backgroundPositionY = "120%";
  //}, 3000);
  }
});

/*socket.on("sound", () => {
  if(document.visibilityState == 'visible'){
    sfx[4].play();
  }
});*/

/*window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  event.returnValue = "";
  socket.emit("logout");
});*/

socket.on("logout", () => {
  document.getElementById("friend_box_background").style.opacity = "0";
  document.getElementById("friend_box_background").style.removeProperty("background");
  document.getElementById("friend_box").removeEventListener("click", mikoVoice);
  document.getElementById("friend_box").removeEventListener("click", mochiVoice);

});

const shiina = document.getElementById("shiina");
let drag;
let x;
let y;
let x2;
let y2;

function part1 (event) {
  x = event.pageX;
  y = event.pageY;
  drag = shiina;
}

function part2 (event) {
  x2 = x - event.pageX;
  y2 = y - event.pageY;
  x = event.pageX;
  y = event.pageY;
  drag.style.top = `${shiina.offsetTop - y2}px`;
  drag.style.left = `${shiina.offsetLeft - x2}px`;
}

function part3 () {
  drag = null;
}

shiina.addEventListener("mousedown", part1);/*(event) => {
  x = event.pageX;
  y = event.pageY;
  drag = shiina;
}*/


shiina.addEventListener("mousemove", part2);/*(event) => {
  x2 = x - event.pageX;
  y2 = y - event.pageY;
  x = event.pageX;
  y = event.pageY;
  drag.style.top = `${shiina.offsetTop - y2}px`;
  drag.style.left = `${shiina.offsetLeft - x2}px`;
}*/

shiina.addEventListener("mouseup", part3);/*() => {
  drag = null;
}*/

const bgm = [];

for (let i = 0; i < 6; i++){
  let music = new Audio();
  music.src = `./bgm/${i}.mp3`;
  music.volume = 0.05;
  bgm.push(music);
}

/*document.getElementsByTagName("body")[0].addEventListener("load", () => {
  bgm[Math.floor(Math.random()*6)].load();
  bgm[Math.floor(Math.random()*6)].play();
});*/


if(!localStorage.bgmCounter){
  localStorage.bgmCounter = 1;
}

bgmCounter = Number(localStorage.bgmCounter);

document.getElementsByTagName("header")[0].addEventListener("click", () => {
  let random = Math.floor(Math.random()*6);
  if (localStorage.bgmCounter % 2 == 0){
    bgm[random].load();
    document.getElementById("paimon").style.filter = "brightness(1)";
    bgm[random].play();
    sfx[9].play();
  }
  else if (localStorage.bgmCounter % 2 == 1){
    document.getElementById("paimon").style.filter = "brightness(0.5)";
    bgm[0].pause();
    bgm[1].pause();
    bgm[2].pause();
    bgm[3].pause();
    bgm[4].pause();
    bgm[5].pause();
    sfx[9].play();
  }
  bgmCounter++;
  localStorage.bgmCounter = bgmCounter;
});

//==========================================================================================================
/*
function messageSend () {
  let message = document.createElement("li");
   if(document.getElementById("message_write_box").value != ""){
    message.innerHTML = document.getElementById("message_write_box").value;
    document.getElementById("message_box").appendChild(message);
    message.scrollIntoView(false);
    }
  document.getElementById("message_write_box").value = "";
}

function messageSend_Enter (event) {
  if(event.code != "Enter" ){
    return;
  }
  let message = document.createElement("li");
   if(document.getElementById("message_write_box").value != ""){
    message.innerHTML = document.getElementById("message_write_box").value;
    document.getElementById("message_box").appendChild(message);
    message.scrollIntoView(false);
    }
  document.getElementById("message_write_box").value = "";
}
*/
