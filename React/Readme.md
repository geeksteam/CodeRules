# React coding rules for reactive peoples.

![geeks](https://github.com/geeksteam/VacancyFrontendTest/raw/master/logo-git.png)
<img src="https://react-mdl.github.io/react-mdl/react.svg" width="250">

## Components:

### Component declaration

Use ES6 classes to declare component instead of old and ugly React.CreateComponent.

> Why? Because you can easy extend your class and it reads much better.

Always describe **propTypes**.

> Why? Because when you change something in your component in few month, you dont remember which props uses, 
and it catch the bugs with error props sets.

Use arrow functions instead of `function my()` and don't use `self = this`.

> Why? If you use `function my()` instead of arrow function you need to attach `self = this` to access `this` inside the function.

Example component declaration:

```js
class SuperComponent extends React.Component {
  // Set default component state
  state = {
      // ...
  }
  
  // Use arrow functions
  handleChangeWebSite = (event) => {
      // ...
  }
  
  
}
// Always set propTypes
SuperComponent.propTypes = {
  name: React.PropTypes.string
};

```
