from: https://reactjs.org/docs/thinking-in-react.html

On this part I wanted to use react without a bundler (webpack),
following mostly:

https://reactjs.org/docs/add-react-to-a-website.html


# TODO

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://fb.me/react-error-boundaries to learn more about error boundaries.

Warning: Encountered two children with the same key, `Electronics`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.

Invariant Violation: The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX. in span (created by ProductRow) in td (created by ProductRow) in tr (created by ProductRow) in ProductRow (created by ProductTable) in tbody (created by ProductTable) in table (created by ProductTable) in ProductTable (created by 



https://reactjs.org/docs/faq-styling.html

https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd


Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
    in input (created by SearchBar)
    in form (created by SearchBar)
    in SearchBar (created by FilterableProductTable)
    in div (created by FilterableProductTable)
    in FilterableProductTable

# What did I learn

## Synthetic events

When wanting to console log event, non standard event object
and target null, ...

It is because of Synthethic events that are pooled. So
we can't access them async

https://reactjs.org/docs/events.html#event-pooling

## ES6 class or not ?

There is a way with React Hooks to avoid ES 6 Classes.

https://reactjs.org/docs/hooks-intro.html

One of the argument is 

Classes confuse both people and machines 

Additionally, React has been out for about five years, and we want to make sure it stays relevant in the next five years. As Svelte, Angular, Glimmer, and others show, ahead-of-time compilation of components has a lot of future potential. Especially if it’s not limited to templates. Recently, we’ve been experimenting with component folding using Prepack, and we’ve seen promising early results. However, we found that class components can encourage unintentional patterns that make these optimizations fall back to a slower path. Classes present issues for today’s tools, too. For example, classes don’t minify very well, and they make hot reloading flaky and unreliable. We want to present an API that makes it more likely for code to stay on the optimizable path.








