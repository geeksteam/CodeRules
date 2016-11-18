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

---

## Useful links
[Great article about package layouts](https://medium.com/@benbjohnson/standard-package-layout-7cdbc8391fc1#.87ughckae)
