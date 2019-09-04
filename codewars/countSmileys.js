function countSmileys(arr) {
    // I use here the litteral notation as I don't
    // like constructor with litteral and constructor
    // with strings will imply more \ to escape
    const smileyRegExp = /(\:|\;)(|-|\~)(\)|D)/

    // avoid the hype reduce here, there is really no need
    let count = 0;

    for (let i=0; i < arr.length; i++) {
        if (arr[i].match(smileyRegExp)) {
            count ++;
        };
    }

    return count;
}

console.log(countSmileys([';]', ':[', ';*', ':$', ';-D']) == 1);

/**
 * Note: I should have avoid capture groups, as they are not needed
 * 
 * this Ninja code in the solutions is very interesting:
 * const countSmileys = ss => ss.reduce((a, s) => a + /^[:;][-~]?[D)]$/.test(s), 0);
 * 
 */