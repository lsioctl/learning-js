// this is a common day to day use of closur

function wait(msg) {
    setTimeout(function tmout() {
        console.log(msg);
    }, 1000);
}

wait("ahahahah");

/* 1 second after the call of wait(), his inner scope should be long
** gone. But tmout function has still a reference on it (a.k.a closure)
*/

