![geeks](https://github.com/geeksteam/VacancyFrontendTest/raw/master/logo-git.png)
<img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg" width="80">
<img src="https://raw.githubusercontent.com/mobxjs/mobx/master/docs/mobx.png" width=250 />

# MobX Best Practices

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

### Use Provider and @inject
If you need to pass store through multiple layers of components use `<Provider store=... />` and `@inject`.
```js
@inject("color") @observer
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.props.color}}>
        {this.props.children}
      </button>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <Provider color="red">
        <div>
            {children}
        </div>
    </Provider>;
  }
}
```
[More about Providers](https://github.com/mobxjs/mobx-react#provider-and-inject)
