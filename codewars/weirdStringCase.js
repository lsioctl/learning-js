function toWeirdCase(str){
    // Avoid the useless word => wordToWeirdCase(word)
    // thanks to mostly adequate guide to functional programming Book
    return str.split(' ').map(wordToWeirdCase).join(' ');
}

function wordToWeirdCase(word) {
    // still sticking to immutable :D
    const wordArray = [];
    for (let i=0; i < word.length; i++) {
        if (i % 2 == 0) {
            wordArray.push(word[i].toUpperCase());
        } else {
            wordArray.push(word[i].toLowerCase());
        }
    }
    return wordArray.join('');
}

console.log(toWeirdCase('This is a test'));
console.log(toWeirdCase('This is a test') == 'ThIs Is A TeSt');
console.log(wordToWeirdCase('this'));
