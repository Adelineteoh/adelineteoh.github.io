let media = document.getElementById("media");
let controls = document.getElementsByClassName("controls")[0];

let play = document.getElementsByClassName("play")[0];
let stop = document.getElementsByClassName("stop")[0];
let rwd = document.getElementsByClassName("rwd")[0];
let fwd = document.getElementsByClassName("fwd")[0];
let mute = document.getElementsByClassName("mute")[0];
/* In the context of a craft tutorial video, I find in my experience that I often have trouble catching up to the speed of the video when following tutorials,
and thus need to go back and find where I left off. Thus, I decided to split the video into chapters using the 'goback' id, and the 'chapter' function. */
let goback = document.getElementsByClassName("goback")[0];

let timerWrapper = document.getElementsByClassName("timer")[0];
let timer = document.getElementsByClassName("timer-span")[0];
let timerBar = document.getElementsByClassName("timer-bar")[0];

let intervalFwd;
let intervalRwd;

media.removeAttribute("controls");
controls.style.visibility = "visible";


/* Play/Pause */
play.addEventListener('click', playPauseMedia);

function playPauseMedia(){

  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);

  if(media.paused){
    play.setAttribute('data-icon', 'u');
    media.play();
  } else {
    play.setAttribute('data-icon', 'P');
    media.pause();
  }
}

/* Rewind/Forward */

stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

function stopMedia() {
  media.pause();
  media.currentTime = 0;
  play.setAttribute('data-icon', 'P');
  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
}

rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);

function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove("active");
  if(rwd.classList.contains("active")) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add("active");
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");

  if(fwd.classList.contains("active")) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add("active");
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward(){
  if(media.currentTime <=3) {
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward(){
  if(media.currentTime >= media.duration - 3) {
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

/* Time Elapsed */
media.addEventListener("timeupdate", setTime);

function setTime(){
  console.log("update")
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);

  let minuteValue = minutes.toString().padStart(2, "0");
  let secondValue = seconds.toString().padStart(2, "0");

  let mediaTime = `${minuteValue}:${secondValue}`;
  
  timer.textContent = mediaTime;

  let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
  timerBar.style.width = `${barLength}px`;
}

mute.addEventListener("click", muteUnmute);

function muteUnmute(){
  console.log("i should mute");
}

function muteUnmute(){
  if(media.muted){
    media.muted = false;
    mute.setAttribute("data-icon", 'Q');
  }

  else{
    media.muted = true;
    mute.setAttribute("data-icon", 'U');
  }
}

/*Chapter PlaybackRate */

goback.addEventListener("click", chapter);

/* This is the function I would use if there was only a singular chapter I wanted to bookmark and return to */
function chapter(){
  media.currentTime = 42;
}


/* This is the function I used, which allows me to set multiple chapters for the users to return to using the return button*/
let chapterArray = [
  129,
  42,
]

function chapter(){
  let currentTime = media.currentTime;
  for (const chapters of chapterArray) {
    if(currentTime > chapters){
      media.currentTime = chapters; 
      break;
    }
  }
}