// get the elements

const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');

const skipButtons = document.querySelectorAll('[data-skip]');

const ranges = document.querySelectorAll('.player__slider');

// define the functions

function toggleVideo() {
    // note that video.play() is blocked if autoplay
    // is disabled
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function ninjaToggleVideo() {
    video.paused ? video.play(): video.pause();
}

function xtremeNinjaToggleVideo() {
    // hard to read but interesting 
    video[video.paused ? 'play': 'pause']();
}

// other elements can play or pause video
// e.g space bar
// so we add this outside toggleVideo
function changeToggleButton() {
    toggle.innerText = this.paused ? '►': '❚❚';
    console.log('aaaaaa');
}

function skip() {
    // dataset.skip is a string, we ne to cast it as a float
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRanges(){
    // input name are conveniently named with the video 
    // properties. Should not be used in production 
    video[this.name] = this.value;
}

// add events listeners
toggle.addEventListener('click', toggleVideo);
video.addEventListener('click', toggleVideo);

video.addEventListener('play', changeToggleButton);
video.addEventListener('pause', changeToggleButton);

skipButtons.forEach(ele => {
    ele.addEventListener('click', skip);
});

ranges.forEach(ele => {
    ele.addEventListener('click', handleRanges);
})


// note for elements dir is a toggle on FF
// but not on Chrome
//console.log(video);
console.dir(video);