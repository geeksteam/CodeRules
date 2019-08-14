# React coding rules for reactive :rocket: peoples.

![geeks](https://github.com/geeksteam/VacancyFrontendTest/raw/master/logo-git.png)
<img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg" width="80">
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="80">

## React project directory structure:

<pre>
app/src $ tree
├── App // Main app
│   ├── App.jsx
│   └── App.sass
├── Assets // Images or shared css/sass
│   ├── Logo.svg
│   └── Button.sass
├── Сomponents // Reusable Components dir
│   ├── LoginForm // Some component
│   │   ├── index.jsx
│   │   ├── LoginForm.sass
│   │   └── LoginForm_test.jsx
│   └── Note.jsx // Some simple component
├── Navigation // Navigation elements components
│   └── TopNavigation // Reducers for Redux
│       ├── index.jsx
│       ├── TopNavigation.sass
│       └── TopNavigation.jsx
├── Stores // Redux or MobX Store
│   ├── SomeStore.jsx
│   └── Reducers // Reducers for Redux
│       └── SomeReducer.jsx
├── Services // Global services as Rest, GraphQL and etc.
|   └── RestService.jsx // Some Service
├── Screens // Screens (pages) component
│   └── MainScreen // Some screen component
│       ├── index.jsx
│       ├── MainScreen.sass
│       └── MainScreen_test.jsx
├── index.jsx
└── main.sass
</pre>

## Components:

### Don't render to the body
As Den mentioned in his [Blog](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375), render root component into `Body` will slow down your React application. Render it to `Div id="root"` inside `Body`.

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
