function order(words){
    // For the regexp we declare it once to optimize
    // memory footprint 
    // TODO: would JS optimize in the sort callback something like
    // str.match(/\d/g) ?
    // we are using the long syntax for RegExp object
    // new Regexp('pattern', 'flags')
    // instead of the short one 
    // /pattern/flags/
    // note with the constructor and a string, we
    // need to escape so \d becomes \\d
    // we take the first one to avoid doubtfull
    // comparison when staying in String
    // and avoid Number objects creations
    digitPattern = new RegExp('\\d');

    const wordsArray = words.split(' ');

    // two ways to immutable, slice or spread operator
    const sortedArray = wordsArray.slice().sort((a, b) => {
        // comparator function between word a and b
        // we stay in String, and avoid type coercion and
        // maybe implicit Integer or Number object creation
        // TOCHECK. Maybe over optimization and bad practice
        return a.match(digitPattern)[0].localeCompare(b.match(digitPattern)[0]);
    });

    //console.log(wordsArray);
    //console.log(sortedArray)


    return sortedArray.join(' ');
}

console.log(order("is2 Thi1s T4est 3a") === "Thi1s is2 3a T4est" );