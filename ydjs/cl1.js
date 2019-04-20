function func1() {
    // lexical scope, author time
    let a = "yes";
    
    function inside() {
        // inside as closure on his parent lexical scope
        console.log(a);
    }

    return inside;
}

let func2 = func1();
/* inside is executed,
** but outside is lexical scope
*/
/* func1 is executed
** garbage collector should remove all associated variable
** BUT
** it returns inside which has a closure on this scope
** so GC does not remove it
*/

func2(); // outputs "yes"