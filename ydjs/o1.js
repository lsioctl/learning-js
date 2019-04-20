var myObj = {
    a: 2,
    b: function foo() {
        console.log(a)
    }
};

var c = Object.getOwnPropertyDescriptor(myObj, "a");

console.log(c);

var myObj2 = {
    a: 2,
    // specific getter
    get b() {
        return 2; 
    }
}

myObj2.b = 3;
console.log(myObj2.b); //2

var myObj3 = {
    // define a getter for a
    get a() {
        // _a_ name is just chosen by convention, it could be anything else
        return this._a_;
    },
    // define a setter for a
    set a(val) {
        this._a_ = 2 * val;
    }
};

myObj3.a = 2;

console.log(myObj3.a) //4


