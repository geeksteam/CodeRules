# AngularJS project structure and code rules

## Project Structure

We are using feature-based directory structure:
```
app/
    app.js    -- Our App, modules definition and MainController.
    _Vendor   -- All add-ons third-party libs which needs to be included in app
        angualr-websocket.js
    _Shared/    -- Services, Factories, Values - all that shared accros controllers.
        LoaddataService.js
        GlobalValues.js
    Feed/   -- Our Feed Component
        template.html   -- Component template
        FeedComponent.js    -- Component definition and controllers
    Results/    -- Our Results GROUP of components
        Info/   -- Info component of Results group
            tempate.html    -- Component html template
            InfoComponent.js    -- Component definition and controller
            style.scss    -- Sass stylesheet of the component
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
Use Grunt.js for watch and compile.

Default Gruntfile.js:
```js
module.exports = function(grunt) {
    // Files list
    var ConcatJSFiles = [
            'app/_Vendor/**/*.js',
            'app/app.js',
            'app/*.js',
            'app/_Shared/**/*.js',
            'app/**/*.js'
        ];
    grunt.initConfig({
        // Concat
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';',
                sourceMap: true,
                sourceMapName: 'js/app.js.map'
            },
            dist: {
                // the files to concatenate
                src: ConcatJSFiles,
                // the location of the resulting JS file
                dest: 'js/app.js',
            }
        },
        // Uglify
        uglify: {
            my_target: {
                files: {
                    'js/app.min.js': ConcatJSFiles
                }
            },
            options: {
                mangle: false,
                sourceMap: true
            },
        },
        // Include Source
        includeSource: {
            app: {
                files: {
                    //Overwriting index.html
                    'index.html': 'index.src.html'
                }
            }
        },
        // Watcher
        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['uglify','concat'],
                //tasks: ['includeSource'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat']);
};
```

## Naming

Use `camelCase` naming for Services, Controllers:
* `mygreatController` for Controllers, 
* `goodeesServices` for Services, 
* `tasksComponent` for Components,
* and etc.

## Use Components
Use components instead of Directives. Split your UI to components and elements.

## Use `controllerAs`
If the part og UI cannot be in component, use `controllerAs` syntax.

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
