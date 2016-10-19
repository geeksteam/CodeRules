# React coding rules for reactive :rocket: peoples.

![geeks](https://github.com/geeksteam/VacancyFrontendTest/raw/master/logo-git.png)
<img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg" width="80">
<img src="https://react-mdl.github.io/react-mdl/react.svg" width="250">

## Components:

### Component declaration

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

## Redux

### Connect using arrow functions
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

