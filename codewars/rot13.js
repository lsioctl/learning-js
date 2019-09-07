function rotWithCache(rotIndice){

    const abc = 'abcdefghijklmnopqrstuvwxyz';
    const abcArray = Array.from(abc);
    const upAbc = abc.toUpperCase();
    const upAbcArray = Array.from(upAbc);
    const abcMod = abc.length;

    // Maps will be computed once and cached thanks
    // to the closure of the returned function
    abcMap = new Map();
    abcReverseMap = new Map();
    upAbcMap = new Map();
    upAbcReverseMap = new Map();

    for (let i=0; i < abcMod; i++) {
        abcMap.set(abcArray[i], i);
        upAbcMap.set(upAbcArray[i], i);
        abcReverseMap.set(i, abcArray[i]);
        upAbcReverseMap.set(i, upAbcArray[i]);
    };

    return function (message) {
        const solutionArray = [];
        for (let i=0; i < message.length; i++) {
            const c = message[i];
            // translate if lowercase
            if (abcMap.has(c)) {
                solutionArray
                .push(abcReverseMap
                    .get((abcMap.get(c) + rotIndice) % abcMod)
                )
                continue;
            }
            // translate if upercase
            if (upAbcMap.has(c)) {
                solutionArray
                .push(upAbcReverseMap
                    .get((upAbcMap.get(c) + rotIndice) % abcMod)
                )
                continue;
            }
            // keep original if special char
            solutionArray.push(c);
        }
        return solutionArray.join('');
    }
}
    
// here the the Maps are calculated and cached with the closure
rot13 = rotWithCache(13);

console.log(rot13("test"));
console.log(rot13("Test"));

/**
 * 
 * I like the simplicity behind this Ninja Code
 * 
 * const rot13 = str => str.replace(/[a-z]/gi, letter => String.fromCharCode(letter.charCodeAt(0) + (letter.toLowerCase() <= 'm' ? 13: -13)));
 *
 */
