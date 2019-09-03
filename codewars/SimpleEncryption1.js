function encryptStep(stepTextArray) {
    // we store in this array all element with even Index
    let evenIndexArray = [];
    // we store in this array all element with odd Index
    let oddIndexArray = [];
    for (let i=0; i < stepTextArray.length; i++) {
        if (i % 2 == 0) {
            evenIndexArray.push(stepTextArray[i]);
        } else {
            oddIndexArray.push(stepTextArray[i]);
        }
    }
    return oddIndexArray.concat(evenIndexArray);
}

function encrypt(text, n) {
    if (n < 1) {
        return text;
    };

    if (text === null || text === '') {
        return text;
    }

    // we work with Arrays until the last step
    // so we do only on array creation and one join
    // note: spread operator below equivalen to Array.from(text)
    let stepTextArray = [ ...text];

    for (let i=1; i <= n; i++) {
        stepTextArray = encryptStep(stepTextArray);
    }

    return stepTextArray.join('');
}

function decryptStep(stepTextArray) {
    const stepSolutionArray = [];
    const stepTextArrayLength = stepTextArray.length;
    // find the 'middle' of the Array
    const middleIndex = Math.trunc(stepTextArrayLength/2);

    // we know the first array contains even indexes of the step
    // slice extracts up to but not including end
    // note if stepTextArray has an odd length, this array will
    // be smaller than evenIndexArray
    let oddIndexArray = stepTextArray.slice(0, middleIndex);
    // we know the first array contains even indexes of the step
    // If end is omitted, slice extracts through the end of the sequence (arr.length).
    let evenIndexArray = stepTextArray.slice(middleIndex);

    for (let i=0; i < oddIndexArray.length; i++) {
        stepSolutionArray.push(evenIndexArray[i]);
        stepSolutionArray.push(oddIndexArray[i]);
    }

    // if the StepTextArray Length is even, we add the remaing evenIndexArray item
    if (stepTextArrayLength % 2 != 0) {
        console.log('uneven');
        // take care with this as JS does not send error with array[undefined]
        stepSolutionArray.push(evenIndexArray[evenIndexArray.length - 1]);
    }
    return stepSolutionArray;
}

function decrypt(text, n) {
    if (n < 1) {
        return text;
    };

    if (text === null || text === '') {
        return text;
    }

    // we work with Arrays until the last step
    // so we do only on array creation and one join
    // note: spread operator below equivalen to Array.from(text)
    let stepTextArray = [ ...text];

    for (let i=1; i <= n; i++) {
        stepTextArray = decryptStep(stepTextArray);
        console.log(`step ${i}: ${stepTextArray.join('')}`)
    }

    return stepTextArray.join('');
}

console.log(encrypt("This is a test!", 0));
console.log(encrypt("This is a test!", 1));

console.log(decrypt("This is a test!", 1));

console.log(encryptStep("This is a test!"));

console.log(decryptStep('hsi  etTi sats!'));
console.log(decrypt('hsi  etTi sats!', 1));

console.log(decrypt("s eT ashi tist!", 2));
console.log(decryptStep(Array.from('s eT ashi tist!')));
console.log(decryptStep(decryptStep(Array.from('s eT ashi tist!')).join('')).join('W'));
console.log(decryptStep('hsi  etTi sats!').join(''));
console.log(decrypt('s eT ashi tist!', 2));

/**
 * What did I learn today:
 * 
 * Be carefull with Arrays and undefined index, I catched no error and it messed things
 * up for a long time
 * 
 * Even for this small piece of code, Debug can become a mess, I have to find a way to do smaller functions, and start implementing
 * a Unit test solution
 * 
 * Always code simple use case first
 * 
 * I liked this solution as it is efficient and readable in
 * 
 * https://www.codewars.com/kata/57814d79a56c88e3e0000786/solutions/javascript
 * 
 * 
 function encrypt(text, n) {
  console.log(text, n);
  if (!text || n <= 0) return text; 
  while (n--) {
    let ans = '';
    for (let i = 1; i < text.length; i += 2) {
      ans += text[i];
    }
    for (let i = 0; i < text.length; i += 2) {
      ans += text[i];
    }
    text = ans;
  }
  return text;
}

function decrypt(encryptedText, n) {
  if (!encryptedText || n <= 0) return encryptedText;
  const ans = new Array(encryptedText.length);
  while (n--) {
    let j = 0;
    for (let i = 1; i < ans.length; i += 2) {
      ans[i] = encryptedText[j++];
    }
    for (let i = 0; i < ans.length; i += 2) {
      ans[i] = encryptedText[j++];
    }
    encryptedText = ans.join('');
  }
  return encryptedText;
}
 * 
 */