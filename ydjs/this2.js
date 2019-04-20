function foo() {
    console.log(this.a);
}

var a = 'a';


foo(); 

// node by default uses strict mode,
// the global object is not elligible for this default binding