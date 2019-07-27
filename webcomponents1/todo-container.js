(function () {
// we created a module with IIFE so we are in the component scope
// and can use the same variables names

// a template tag is not considered inside a document
// until it is activated
// scripts don't run, images don't load and styling/markup
// is not rendered
const template = document.createElement('template');

template.innerHTML = `
<style>
    :host {
    display: block;
    font-family: sans-serif;
    text-align: center;
    }

    button {
    border: none;
    cursor: pointer;
    }

    ul {
    list-style: none;
    padding: 0;
    }
</style>
<h1>To do</h1>

<input type="text" placeholder="Add a new to do"></input>
<button>✅</button>

<ul id="todos"></ul>
`;


class TodoContainer extends HTMLElement {

    constructor() {
        // we need to call super constructor with ES6 classes
        super();
        this._shadowRoot = this.attachShadow({'mode': 'open'});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$todoList = this._shadowRoot.querySelector('ul');
        this.$input = this._shadowRoot.querySelector('input');
        this.$submitButton = this._shadowRoot.querySelector('button');
        // explicitly bind 'this' of _addTodo to this
        // with only this._addTodo as a callback,
        // this is the target element - here the button
        // (implicit this binding with addEventListner)
        this.$submitButton.addEventListener('click', this._addTodo.bind(this));
        this._todos = [];
    }

    connectedCallback() {
        // invoked when the custom element is first connected to
        // the document DOM
        console.log(`${this.localName} connected`);
    }

    _renderTodoList() {
        this.$todoList.innerHTML = '';
        this._todos.forEach((todo, checked) => {
            const todoItem = document.createElement('todo-item');
            todoItem.item = todo;
            this.$todoList.appendChild(todoItem);
        });
    }

    _renderAddedTodo() {
        // with this we only update todo item and not re-render all
        // of them
        // Not satisfied of the way I get the last todo
        // because we have this information in _addTodo before
        // pushing in _todos
        const todoItem = document.createElement('todo-item');
        todoItem.item = this._todos.slice(-1)[0];
        this.$todoList.appendChild(todoItem);
    }

    _addTodo() {
        // we avoid adding empty todos
        if (this.$input.value.length == 0) {
            return;
        }
        // in the way it as been called
        // 'this' is not the target element but the object
        this._todos.push({'text': this.$input.value, 'index': this._todos.length + 1});
        this._renderAddedTodo();
        this.$input.value = '';
    }

    set todos(value) {
        this._todos = value;
        this._renderTodoList();
    }
}

// hook to 'export' this class to our application
// within the IIFE 'module'
App.TodoContainer = TodoContainer;

})();