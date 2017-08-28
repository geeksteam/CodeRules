# React, <a href="#redux">Redux</a>, <a href="#mobx">MobX</a> coding rules for reactive :rocket: peoples.

![geeks](https://github.com/geeksteam/VacancyFrontendTest/raw/master/logo-git.png)
<img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg" width="80">
<img src="https://react-mdl.github.io/react-mdl/react.svg" width="250">

## React project directory structure:

<pre>
app/src $ tree
├── App // Main app
│   ├── App.jsx
│   └── App.sass
├── Assets // Images or shared css/sass
│   ├── Logo.svg
│   └── Button.sass
├── Store // Redux or MobX Store
│   ├── SomeStore.jsx
│   └── Reducers // Reducers for Redux
│       └── SomeReducer.jsx
├── Сomponents // Components dir
│   ├── LoginForm // Some component
│   │   ├── index.jsx
│   │   ├── LoginForm.sass
│   │   └── LoginForm_test.jsx
│   └── Note // Some component
│       ├── index.jsx
|	├── DumbComponent.jsx
│       ├── note.sass
│       └── note_test.jsx
├── index.jsx
└── main.css
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

<img src="https://raw.githubusercontent.com/mobxjs/mobx/master/docs/mobx.png" width=450 />

## MobX:

### Enabling Decorators with Create-React-App without Ejecting
Install npm decorators plugin `npm install --save babel-plugin-transform-decorators-legacy`.
Go to `node_modules/react-scripts/config/webpack.config.dev.js`, and add `[require.resolve('babel-plugin-transform-decorators-legacy')` to plugins of options object, like this:
```
...
// Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-react-app')],

          // ! We added this line to make decorators work
          plugins: [require.resolve('babel-plugin-transform-decorators-legacy')],

          cacheDirectory: true,
        },
...
```
Do the same with `node_modules/react-scripts/config/webpack.config.prod.js`.

### Export only new store object.
Export only created (singleton) store object to avoid stores dedublication in different components.
Example of `SimpleStore.js` mobx store file:
```js
import {observable} from "mobx";

class simpleStore {
	@observable Domains = [
        'v64.com',
        'io.v64.sh'
    ]
}

const SimpleStore = new simpleStore();
export default SimpleStore;
```
