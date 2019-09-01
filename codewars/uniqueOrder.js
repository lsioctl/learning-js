/**
 * 
 * @param {Array or String} iterable
 * 
 * @returns {Array} list of items without any elements with 
 * the same value next to each other and preserving the original 
 * order of elements.
 * 
 */

function uniqueInOrder(i) {
    //your code here - remember iterable can be a string or an array
    
    // ensure we play with an array
    const iArray = Array.from(i);

    // we will store the previous item
    // we will let type coercion doing is job here
    // TODO: check perf
    let previous = '';

    const solution = iArray.filter(item => {
        if (previous != item) {
            previous = item;
            return item;
        }
    })

    return solution;
}

console.log(uniqueInOrder('AAAABBBCCDAABBB'));
console.log(['A','B','C','D','A','B']);

/**
 * Saw interesting solution like:
 * 
 * 1. simple for, which works fine on String and Arrays (aaah, the filter hype :D)
 * 2. return [].filter.call(iterable, (function (a, i) { return iterable[i - 1] !== a }));
 * 
 */


