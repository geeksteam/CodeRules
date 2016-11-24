# Api Testing
We are testing our API using Apiary and Dredd testing integrated in our CI.

![Dredd](https://raw.githubusercontent.com/apiaryio/dredd/master/img/dredd.png)

## Project structure
In our tests we have many `.apib` files in feature based directory structure instead one big `.apib` file.
Files concatenated during test process using `Grunfile.js` and `grunt build`.

### Files naming
File with group name and group description must be named `about.apib`.
We're use automatic files concatenation during build one big `apib` file, for proper files order prepend order number in filename.
Ex: `10-about.apib`, `20-main.apib`, `30-clean.apib`.

## Hooks

### Hook files
Global hooks placed inside `/_hooks` directory.
Hook files inside feature directory must be named `feature-name_hooks.py`.

### Hook's tests naming and status code
Tests that using hooks must have `!Hook` prefix to its name and point to dummy url `[HEAD /@hook]`.
Ex: 
```
## !Hook FTP account testing [HEAD /@hook]
Test FTP account by ftp client

+ Response 299
```

To mark test which using hook as success/fail we are using http code `299` for hook's success execution.
Http code `299` set to transaction inside hooks when hook success:
```python
transaction['real']['statusCode'] = 299
```

Using this technique we prevent that http requests have been executed but not hooks and we'll got success test 
without knowing what hooks did.

### Hooks global variables
As Dredd can't pass global variables to the hooks, we are pass them to each hooks in `transaction` object.
You can get them in every hook in this object.

To add global variables to `transaction` we'are using `_hooks/globals.py` 
hook that execute `before_each` and sets those vars.

Example of `_hooks/globals.py`:
```python
import dredd_hooks as hooks

testDomain = 'google.com'

# Add globals
@hooks.before_each
def set_globals(transaction):
                    transaction['request']['headers']['Testing-domain'] = testDomain
```

### Variables inside requests/expectations
We are using `$VAR` syntax inside our requests and reponses in `.apib` files to convert them to variables.
For passing variables inside `apib` responses/requests we're using `_hooks/variables.py` hook:
```python
import dredd_hooks as hooks

## Local stash
# variables
variables = {}
# example variable
variables['$USER_NAME']='regularUser'

# Replace $VARS
@hooks.before_each
def set_variables(transaction):
	if transaction['skip'] != True:
		# Iterate over keys
		for key, value in variables.iteritems():
			transaction['request']['body'] = transaction['request']['body'].replace(key, value)
			transaction['expected']['body'] = transaction['expected']['body'].replace(key, value)
```
