const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

async function getVideo() {
    try {
        const localMediaStream = await navigator
        .mediaDevices.getUserMedia({video: true, audio: false});
        // this is deprecated now
        /**
         * 
         * from https://stackoverflow.com/questions/51101408/deprecation-of-createobjecturl-and-replace-with-the-new-htmlmediaelement-srcobje
         * [Deprecation] URL.createObjectURL with media streams 
         * is deprecated and will be removed in M68, around July 2018. 
         * Please use HTMLMediaElement.srcObject instead.
         */
        //video.src = window.URL.createObjectURL(localMediaStream);
        video.srcObject = localMediaStream;
        // HTML Video Element play returns a promise. We have
        // to wait for it before properties like videoHeight ...
        // are properly set
        try {
            await video.play();
        } catch (err) {
            console.log('Failed to play webcam video: ' + err);
        };
    } catch (err) {
        console.log('Failed to getUserMedia for webcam: ' + err);
    };
}

async function paintToCanevas() {
    // in the example it was done in a different way
    // on the global scope:
    // video.addEventListener('canplay', painToCanevas)
    // which is trigger as soon as video.play() is called
    // TODO: what is the more 'JS Way' to do it ?
    await getVideo();
    const width = video.videoWidth;
    const height = video.videoHeight;

    console.log(width + ' * ' + height);

    // we resize the canvas with the webcam video image size
    canvas.width = width;
    canvas.height = height;

    // we copy webcam video image every x ms at the 0,0 coordinates
    // (uper left canvas corner)
    // we return the value to be able to stop this copy
    // by calling clearInterval(return value)
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 10);
}

function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();

    // get the data from the canvas
    const data = canvas.toDataURL('image/jpeg');

    //
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'yeaaaah');
    link.innerHTML = `<img src=${data} alt="amazing"></img>`

    strip.insertBefore(link, strip.firstChild);


    console.log(data);
}

paintToCanevas();

