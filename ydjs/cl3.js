// here only global i, so when timer is called,
// global i is 5

for(var i=0; i<5; i++) {
    console.log(i);
    setTimeout(function timer(){
        console.log('first' + i);
    }, i*1000)
}


// here IFFE create is own scope at each iteration
// but no closure for timer because scope has no var, only global
for(var i=0; i<5; i++) {
    console.log(i);
    (function IFFE() {
        setTimeout(function timer(){
            console.log('second' + i);
        }, i*1000)
    })();
}

// here timer has a closure on a var, which catch iterated i
for(var i=0; i<5; i++) {
    console.log(i);
    (function IFFE() {
        var a = i;
        setTimeout(function timer(){
            console.log('third' + a);
        }, i*1000)
    })();
}

// more elegant, let property of block scope different
// for each iterations
// so timer has a closur on parent i scope (not global)
for(let i=0; i<5; i++) {
    setTimeout(function timer(){
        console.log('last' + i);
    }, i*1000)
}
