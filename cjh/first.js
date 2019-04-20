console.log('Example with callbacks');
setTimeout(function() {
  console.log('I promised to run after 1 second');
  setTimeout(function() {
    console.log('I promised to run after 2 seconds');
  }, 1000)
}, 1000)

console.log('Example with promises')
const wait = () => new Promise((resolve, reject) => {
  setTimeout(resolve, 1000);
})

wait().then(() => {
  console.log('I promised to run after 1 second');
  return wait();
})
.then(() => console.log('I promised to run after 2 seconds'))
