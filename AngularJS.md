# AngularJS project structure and code rules

![geeks](https://github.com/geeksteam/VacancyFrontendTest/raw/master/logo-git.png)
![angulrjs](https://angularjs.org/img/AngularJS-large.png)

## Project Structure

We are using feature-based directory structure:
```
app/
    app.scss		-- Our main page scss.
    app.js    -- Our App, modules definition and MainController.
    
    _Vendor   -- All add-ons third-party libs which needs to be included in app
        angualr-websocket.js
	
    _Shared/    -- Services, Factories, Values - all that shared accros controllers.
        LoaddataService.js
        GlobalValues.js
	
    Feed/   -- Our Feed Component
	    template.html   -- Component template
	    style.scss    -- Sass stylesheet of the component
	    FeedComponent.js    -- Component definition and controllers
	
    Results/    -- Our Results GROUP of components
        Info/   -- Info component of Results group
            tempate.html    -- Component html template
	        style.scss    -- Sass stylesheet of the component
            InfoComponent.js    -- Component definition and controller
	    
    Login/    -- Our Login Controller
        LoginForm.html
        LoginAdditionalInfo.html
        LoginController.js
	
js/
	app.js 		-- All js source files concatenated from /app
	app.min.js		--All js source files concatenated and uglified from /app
	app.min.js.map
	
css/
	app.css		-- All scss files from /app concatenated and compilted to css
	
index.html	-- Main index file.
```

## Use Grunt.js

Make your life easeir, use Grunt.js to compile and make your .js and .scss files.

See default Gruntfile.js and package.json for project structure mentioned above.

## camelCase Naming

Use `camelCase` naming for Services, Controllers:
* `mygreatController` for Controllers, 
* `goodeesServices` for Services, 
* `tasksComponent` for Components,
* and etc.

## Use Components
Use components instead of Directives. Split your UI to components and elements.

## Use `controllerAs`
If the part of UI cannot be in component, use `controllerAs` syntax.

## Use `var self = this`
Use `var self = this` to bind this into function global varibale for using inside nested functions.

## Don't use anonymous functions in Components and etc. definitions
Use separate defined function or class as Controller:

```js
app.component('checkForm', {
	controller: checkFormController,
});

function checkFormController(checkService){

}
```
# **DONT** use $scope or $rootScope
Don't use $scope or $rootScope.
You can use Services for data sharing, and `this` inside Controllers.

You DONT NEED $scope and $rootScope!

# Services

## Use `Services` for sharing and get async data between controllers.
If you need to store some data from one controller to another or you need to get data from backend using `http` or `websocket`,
use `Service` for this.
**DON'T** do this in Controllers.

## Use returns in Service
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

## Only Service's objects can be bind to controllers
You can bind only Service's objects inside the Controllers to get the updates while the data in Service changes.
AngularJS will update the scope only in case of binding object, ***strings,bools are immutable*** and will not update!

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

# Startup Logic

## Configuration
Inject code into module configuration that must be configured before running the angular app. Ideal candidates include providers and constants.

```js
angular
    .module('app')
    .config(configure);

configure.$inject =
    ['routerHelperProvider', 'exceptionHandlerProvider', 'toastr'];

function configure (routerHelperProvider, exceptionHandlerProvider, toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
}
```

## Run
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
