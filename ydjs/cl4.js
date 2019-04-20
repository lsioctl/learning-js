function myModule() {
    let something = "cool";
    let another = [1, 2, 3];

    function doSomething() {
        console.log(something);
    }

    function doAnother() {
        console.log(another.join('; '));
    }

    return {
        // we use advanced object litteral here to avoid a: a, b: b
        doSomething,
        doAnother
    }
}

// Note: const can not be reasigned
const foo = myModule();

foo.doSomething();
foo.doAnother();