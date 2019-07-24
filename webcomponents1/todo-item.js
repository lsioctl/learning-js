(function () {
// we created a module with IIFE so we are in the component scope
// and can use the same variables names
const template = document.createElement('template');

template.innerHTML = `
<style>
    :host {
    display: block;
    font-family: sans-serif;
    }

    .completed {
    text-decoration: line-through;
    }

    button {
    border: none;
    cursor: pointer;
    }
</style>
<li class="item">
    <input type="checkbox">
    <label></label>
    <button>❌</button>
</li>
`;


class TodoItem extends HTMLElement {

    constructor() {
        // we need to call super constructor with ES6 classes
        super();
        this._shadowRoot = this.attachShadow({'mode': 'open'});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$item = this._shadowRoot.querySelector('.item');
        this.$text = this._shadowRoot.querySelector('label');
    }

    _renderTodoItem() {
        this.$item.innerHTML = this.$text;
    }

    set item(value) {
        this.$text = value;
        this._renderTodoItem(); 
    }
}

// hook to 'export' this class to our application
// within the IIFE 'module'
App.TodoItem = TodoItem;
})();
