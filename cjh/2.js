function *calculator(input) {
  // this is tricky, doubleThat is really the double
  // of input, input/2 is a return value
  var doubleThat = 2 * (yield(input / 2));
  var another = yield(doubleThat);
  return (input * doubleThat * another);
}

const calc = calculator(10);

console.log(calc.next())
console.log(calc.next(50));
console.log(calc.next(100));
