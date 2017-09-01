
![geeks](https://github.com/geeksteam/VacancyFrontendTest/raw/master/logo-git.png)
<img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg" width="80" />
<img src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png" width="250" />

# Redux best practice

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
