# Go Rules

<img width="30%" src="https://raw.github.com/golang-samples/gopher-vector/master/gopher.png"/>

## Errors handling

### Use context with Errors
Errors package with contexts https://github.com/pkg/errors.
```go
_, err := ioutil.ReadAll(r)
if err != nil {
        return errors.Wrap(err, "read failed")
}
```
