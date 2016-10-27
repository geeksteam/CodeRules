# React coding rules for reactive :rocket: peoples.

![geeks](https://github.com/geeksteam/VacancyFrontendTest/raw/master/logo-git.png)
<img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg" width="80">
<img src="https://react-mdl.github.io/react-mdl/react.svg" width="250">

## Directory Structure:

app/src $ tree
.
├── components
│   ├── Store // Redux Store
│   │   ├── Store.jsx
│   │   └──Reducers // Reducers
│   │      └── SomeReducer.jsx
│   ├── App // Component
│   │   ├── App.jsx
│   │   ├── app.sass
│   │   └── app_test.jsx
│   ├── Note // Component
│   │   ├── Note.jsx
│   │   ├── note.sass
│   │   └── note_test.jsx
│   └── index.js
├── index.jsx
└── main.css

## Components:

### Component declaration.

Use ES6 classes to declare component instead of old and ugly React.CreateComponent.

> Why? Because you can easy extend your class and it reads much better.

Always describe **propTypes**.

> Why? Because when you change something in your component in few month, you dont remember which props uses, 
and it catch the bugs with error props sets.

Use arrow functions instead of `function my()` and don't use `self = this`.

> Why? If you use `function my()` instead of arrow function you need to attach `self = this` or `.bind(this)` to access `this` inside the function. With arrow function `this` is auto-binded.

Example component declaration:

```js
class SuperComponent extends React.Component {
  // Set default component state
  state = {
      // ...
  }
  // Use arrow functions to auto-bind this
  handleChangeWebSite = (event) => {
      // ...
  }
  // Render function
  render = () => {
      // ...
  }
}
// Always set propTypes
SuperComponent.propTypes = {
  name: React.PropTypes.string
};
// Set default props if needed
SuperComponent.defaultProps = {
  name: 'Mark Zuckerberg'
};

export default SuperComponent;
```

### `IF` logic in components.
If your component has few states depending on `if`
set render parts as `const` and then use if in `render()`.


Example of processing state:
```js
render(){
      // Dumb no data
      const NoData = (
          <div />
      );
      // Processing state
      const Processing = (
          <div>
            <h4>Waiting for { this.props.ResultType } results...</h4>
          </div>
      );

      // If we have procesing state return it
      if (this.props.Results.Processing){
        return Processing
      }
      // Otherwise return dumb
      return NoData;
  }
}
```

### Dont use className in components.
To provide consistency of your component dont use className while use component.

Bad:
```js
<SuperComponent className=red />
```

Instead use `className` inside `render()` of your components.

Good:
```js
render(){
      const RedDiv = (
          <div className=red></div>
      );
      return RedDiv;
}
```

### Use `setValue()` to setState from input.
TODO

![Redux](https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png)

## Redux:

### Connect using arrow functions.
If your connector simple and connect only one object use anonymous arrow function instead of sepatate function.

> Why? Because arrow function here are read much better.

Simple connector:
```js
// Connect redux store and return component
export default connect( 
    (store)=>{ 
      return { Results: store } 
    }
  )(SuperComponent);
```

## Use redux-form
http://redux-form.com
TODO

### Use redux-raven-middleware for sending errors with state. 
https://blog.sentry.io/2016/08/24/redux-middleware-error-logging.html
TODO

### Use combine Reducers
As your app grows more complex, you'll want to split your reducing function into separate functions, each managing `own parts of the state`.
