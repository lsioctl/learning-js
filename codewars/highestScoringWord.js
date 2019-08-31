/**
 * 
 * @param {String} s 
 * @returns {String} the word in s with the highest getSum()
 * 
 */

function high(s) {
    const wordsArray = s.split(' ');
    const sortedWordsArray = wordsArray.slice().sort((a,b) => {
        return getSum(b) - getSum(a);
    });
    return sortedWordsArray[0];
}
/**
 * 
 * @param {String} s
 * @returns {Number} score points of s
 * 
 * Each letter of a word scores points 
 * according to its position in the alphabet: 
 * a = 1, b = 2, c = 3 etc.
 * 
 */
function getSum(s) {
    // case of we go to lower case, and then the decimal value 
    // starts with a = 97
    return s.toLowerCase().split('').reduce((acc, c) => {
        return acc + c.charCodeAt(0) - 96;
    }, 0);
}

console.log(getSum('vsdgsadg'));
console.log(high('man i need a taxi up to ubud') === 'taxi');