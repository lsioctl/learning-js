// our App object used to have a dedicated scope
// with our IIFE modules (we can't use ES6 modules with file URI)
// see comments in html file
const App = {};

// we have to wait scripts are all loaded before having the
// custom elements objects

window.onload = function () {
    console.log(App);
    // custom elements tag must contain a -
    window.customElements.define('todo-container', App.TodoContainer);
    window.customElements.define('todo-item', App.TodoItem);
}

