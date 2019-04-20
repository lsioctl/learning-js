function *generator() {
  let it = 0;
  while(it < 20) {
    it++;
    yield it
  }
  return it;

}

let g = generator();

while (!g.next().done) {
  console.log(g.next());
}
