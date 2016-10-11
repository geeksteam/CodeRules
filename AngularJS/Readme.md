# AngularJS Geeks.team code rules
> We create our rules for better developers colaboration in our company.

![geeks](https://github.com/geeksteam/VacancyFrontendTest/raw/master/logo-git.png)
![angulrjs](https://angularjs.org/img/AngularJS-large.png)

# Project Structure:

We are using feature-based directory structure:
```
app/
    app.scss		-- Our main page scss.
    app.js    -- Our App, modules definition and MainController.
    
    _Vendor   -- All add-ons third-party libs which needs to be included in app
        angualr-websocket.js		-- Some 3rd party library
	
    _Shared/    -- Services, Factories, Values - all that shared accros controllers.
        LoaddataService.js		-- Some shared services
        GlobalValues.js		-- Some Global app.values().
	
    Feed/   -- Our Feed Component
	    template.html   -- Component template
	    style.scss    -- Sass stylesheet of the component
	    FeedComponent.js    -- Component definition and controllers write in ES5 JavaScript

    Results/    -- Our Results GROUP of components
        Info/   -- Info component of Results group
            tempate.html    -- Component html template
	        style.scss    -- Sass stylesheet of the component
			InfoComponent.es6    -- Component definition and controller write in ES6/7 JavaScript

js/
	app.js 		-- All js source files concatenated from /app
	app.min.js		--All js source files concatenated and uglified from /app
	app.min.js.map
	
css/
	app.css		-- All scss files from /app concatenated and compilted to css
	
index.html	-- Main index file.
```

# Tools:
> There are tools which we use and you need to use with us too if we are working together.

## Use JSHint
JSHint can show your code errors during you write it (write the errors )) ). Install it to your Editor.
Turn on ES6 support by adding it to `.jshintrc`:
```js
{ 
    "esversion": 6 
}
```

## Use ESLint
We are using latest from JavaScript. Now we are using **ES6** and some parts of **ES7**.
Install in to your editor. 

Sample ESLint config `.eslintrc.js` in root of the project:
```js
module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
```

Set ESLint to ignore ES5 files by adding `.eslintignore`:
```js
**/*.js
```

## Use Babel
For using all ES6 and part of ES7 we are using **Babel**.
Integrated with Grunt it can do all stuff (transform ES6/7 to js) without any your work.

Sample `.babelrc`:
```js
{
  "presets": ["es2015"],
  "plugins": [
      "syntax-async-functions",
      "transform-async-to-generator"
    ]
}
```

## Use Grunt.js

<img align="right" height="260" src="http://gruntjs.com/img/grunt-logo-no-wordmark.svg">

Grunt.js is a wonderfull tool. You are not frontend developer if you are not using it.

> Make your life easeir, use Grunt.js to compile ES6/7, Sass and make your `.js` and `.scss` files.

See default [Gruntfile.js](https://github.com/geeksteam/CodeRules/blob/master/AngularJS/Gruntfile.js) and [package.json](https://github.com/geeksteam/CodeRules/blob/master/AngularJS/package.json) for project structure mentioned above.


# Naming of Services/Controllers/Components:

## Use camelCase Naming.

Use `camelCase` naming for Services, Controllers:
* `mygreatController` for Controllers, 
* `goodeesServices` for Services, 
* `tasksComponent` for Components,
* and etc.

## Use Components.
Use components instead of Directives. Split your UI to components and elements.
Almost all can be splitted to Components.

> Don't use Directives.

## Use ONLY `controllerAs` syntax.
If the part of UI cannot be in component, use `controllerAs` syntax.

## Use `var self = this`.
Use `var self = this` to bind this into function global varibale for using inside nested functions.

## Don't use anonymous functions in Components, Services and other top-level definitions.
Use separate defined function or class as Controller:

```js
app.component('checkForm', {
	controller: checkFormController,
});

function checkFormController(checkService){

}
```
## **DONT** use $scope or $rootScope.
Don't use $scope or $rootScope.
You can use Services for data sharing, and `this` inside Controllers.

> You DONT NEED $scope and $rootScope!

# Services:

## Use `Services` for sharing and get async data between controllers.
If you need to store some data from one controller to another or you need to get data from backend using `http` or `websocket`,
use `Service` for this.

> **DON'T** do this in Controllers.

## Use returns in Service.
Always use returns if some Controllers bind to some of the objects from your Service:
```js
function getdataService(){
	...
	// Returns:
	return {
		Results: this.Results,
		Check: this.Check
	};
}
```

## Only Service's objects can be bind to controllers.
You can bind only Service's objects inside the Controllers to get the updates while the data in Service changes.

> AngularJS will update the scope only in case of binding object, ***strings,bools are immutable*** and will not update!

Example service:
```js
// Service
app.service('checkService', checkService);
function checkService(){
    // Results object
    this.Results = {};
    this.Results.City = 'Helsinki';
    
    // Returns
    return {
    	Results: this.Results
    }
}
```
Bad:
```js
// Controller
function checkFormController(checkService){
		// City will NOT UPDATE if data is changed in Service
		// because strings are immutable and Angular dont watch for them
		this.FormData.City = checkService.City
}
```
Good:
```js
// Controller
function checkFormController(checkService){
		// Bind to OBJECT not to VALUE if you whant live updates
		this.FormData = checkService
}
```

# Use ES6/7 JavaScript:

> **Always use ES6 features**. 

Because we use Babel and it can transform all of this stuff to ES5.

## Use .es6 files extensions
If you write ES6/7 JS code, use `.es6` file extension. 

Why not `.js` ? Because Grunt+Babel will produce `.js` code from every of your `.es6` file and we cannot mix untransformed ES6 code with standart JS (it would be an erros). We need to compile it to ES6/7 -> JS first, then concatenate to some total `app.js`.

## Use `let`, `const`. Don't use `var`.
Var creates so many headaches to JS developers. So don't use aspirin, use `let` and `const`.

> Use uppercase to the `const` names such as: `const ORANGES = 'Apples';`.

## Classes
You can use classes instead of functions in case you can extend this class with another functions. If you dont plan to extend this class, there is no need to use classes instead of functions. Just use functions.

## Async / Await
Instead of using old promises, use new **Async/Await** syntax from ES7 (or Generators if you prefer). We think its great!

> To transform to ES5 we use `transform-async-to-generator`. So you can use Async/Await and generators created by Babel.

Don't forget that `async function` return Promise **NOT** value. Example:
```js
function One(){
	// Alert text 'a'
	foo().then(
		textFromBar=>{
			alert(textFromBar);
		}
	);
	// Alert promise object not text
	alert( foo() );
}

function bar(){
	return 'a';
}
async function foo() {
	let text = await bar();
	return text;
}
```


## Polyfill browser library:
To use all ES6/7 features you need to add `polyfill.js` to your `index.html`:
```html
<!-- Babel Polyfill -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.min.js"></script>
```

# Startup Logic:

## Configuration.
Inject code into module configuration that must be configured before running the angular app. Ideal candidates include providers and constants.

```js
angular
    .module('app')
    .config(configure);

configure.$inject =
    ['routerHelperProvider'];

function configure (routerHelperProvider) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
}
```

## Run.
Any code that needs to run when an application starts should be declared in a factory, exposed via a function, and injected into the run block.

```js
angular
    .module('app')
    .run(runBlock);

runBlock.$inject = ['authenticator'];

function runBlock(authenticator) {
    authenticator.initialize();
}
```
