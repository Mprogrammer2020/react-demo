# Content

- [Code Structure](#code-structure)
- [Color: Color palette of Material ui](#color)
- [Icons: react-native-vector-icons](#icons)
- [Code format: prettier](#code-format)
- [Components: `src/screens/components`](#components)
- [API calls: Axios](#api-calls)
- [Loading Overlay](#loading-overlay)
- [Auth Context](#auth-context)
- [Navigations: React-navigations](#navigations)
- [Time library: MomentJS](#time-library)
- [JS utility: ES6,7/Lodash](#js-utility)

## Code Structure

```bash
├── ios #ios native code and configuration
│   ├── toryodSeller
├── android #android native code and configuration
│   ├── app
├── src
│   ├── __test__/ # unit test case
│   ├── api/ # api calls by module
│   ├── components/ # shared components
│   ├── screens/ # screens and inner components by module
        ├── Profile # Profile module
        │   ├── index.js # profile stack navigation config
        │   ├── ViewProfile.js # view profile screen
        │   ├── EditProfile.js # edit profile screen
        │   ├── .... # more Profile screen and inner components
        ├── Home # Home module
        │   ├── index.js # Home stack navigation config
        │   ├── .... # more Home screen and inner components
│   ├── styles/ # global styles. eg: color
│   ├── utils/ #utils code
│   ├── App.js #App root
│   ├── Navigations.js #navigations root
```

_please use `upper camel case` for variable and file name. and Capitalized for React component variable and file name_

## color

please reference the Color palette of Material ui.
https://material-ui.com/style/color/#color-palette

## Icons

we use react-native-vector-icons.
https://github.com/oblador/react-native-vector-icons

for all the icons in app, please search icons in fontawesome or material first. `https://fontawesome.com/icons?from=io` or `https://material.io/tools/icons/?style=baseline`

## Code format.

we are using `prettier` for code format for now, all code will be auto formatted by prettier when you commit (via commit hooks).

you may want to install the `prettier` extension into your code editor by reference this. `https://prettier.io/docs/en/editors.html`
(this way we will share the same code style/format as the auto-formatted code, and don't need to handle those code formatting conflicts.)

## Components

we have customized some basic Components in [src/components](src/components) dir based on React-native component and some open source react-native component.

please check the propTypes of component in code for more details when needed.

**And if you need common UI component we don't have and will be used in many screens, please put it here((src/components)) and add some comment/propTypes in code.**

- Logo `src/components/Logo`

  the `toryod` logo

- Button `src/components/Button`

  some Custom Button based on `TouchableNativeFeedback` or `TouchableOpacity`

  - `MainButton` render `red` action button with rounded corners
  - `OutlineButton` button `without the border box` and `transparent` background color
  - `ForwardButton` A custom Outline Button, text in the left and `angle-right` icon on the right.

- CheckBox `src/components/CheckBox`

  - CheckBox. basic checkbox, check box in the left, with a text after it.
  - CheckBoxRight. full width checkbox. text in the left and checkbox on right, with a bottom line.
    eg: used in the full width multiple checkbox.

- Divider `src/components/Divider`

  - Divider Basic Divider can be dashed, tweak height.
  - ToryodDivider custom Divider with the toryod icon in the middle

- Text `src/components/Text`

  - Label black text, if `required`, well append a `*` to the label
  - Text black text
  - Error red text

- TextInput `src/components/TextInput`
  - BasicTextInput
  - ClassicTextInput class text input with a label(required or not), and a text input in next line.

## API calls

we are now using axios for api call, and our api call will be wrapped in `src/api` dir.

[axios example](https://github.com/axios/axios#example)

[toryod api docs](https://documenter.getpostman.com/view/147000/tty-erp/7EK5W8i)

**_we have set the http Authorization header with logged user's token via axios globally after successfully logining. so you don't need to add authorization header manually_**

- in your api file, src/api/{some-module}

  ```js
  // this will return a promise
  export const someGetApiByid = id => axios.get(`${config.erp}/some-url/${id}`);

  export const someCreateApi = data =>
    axios.post(`${config.erp}/some-update-url`, data);
  ```

- in your component file, src/screens/{Module}/{SomeSreen}

  ```js
  import { someApiCall } from "../../api/{module}";
  async someActionHandler () {
    try {
      const { data, code, message } = (await someApiCall).data;

      // logic to handle data
    } catch (err) {
      // logic to handle error
    }
  }

  ```

## Loading Overlay

`src/component/Loading`

**please wrap your component which withLoading() when you need to submit/fetch data via server api.**

```js
import { withLoading } from "../../Loading";

// example to wrap YourComponent with loading, and when to show/hide loading.
class YourComponent extends Component {

  async onSubmit() {
    const { showLoading, hideLoading, navigation } = this.props;

    try {
      // show loading overlay when start some api call
      showLoading();

      // our server api usually return { data, code, message } structure for the request
      const { data, code, message } = (await someApiCall).data;
      if (code !== 200 ) { // error checking on response.
        hideLoading();
        // alert() or setState({errMessage: message})
        return
      }

      hideLoading();

      // handle response data and update UI or navigate to some other screen
      this.state( funcToConvertResponseToState{ data })
      // navigation.navigate("OtherScreen")
    } catch (err) {
      hideLoading();
       // alert("submit xxx data err", err.message) or setState({errMessage: err.message})
    }
  }

  render() {
    ....
    <Button onPress={this.onSubmit()} />
  }
}

// export default YourComponent --> Change here
export default withLoading(YourComponent);
```

## Auth Context

we have a global auth React Context(`src/AuthContext`), you can use the withAuth() method to wrap the component which you want to get auth information inside.

**if you only need to use the `userToken` for api call, please don't use `withAuth()`, we have set the http Authorization header with logged user's token via axios globally after successfully logining. so you don't need to do it manually **

```js
import { withAuth } from "../../AuthContext";

class YourComponent extends Component {
  render() {
    // after wrap your component with withAuth(),
    // your component now can consume the auth context information.
    // so you can get auth context information via this.prop.authCtx
    const {
      authCtx: {
        profile: { id, account_id, first_name, last_name, email },
        userToken
      }
    } = this.props;
  }
}

// export default YourComponent
// now wrap YourComponent withAuth, so you can get auth context information via this.prop.authCtx
export default withAuth(YourComponent);
```

## Navigations

We use react-navigation for our screen navigation.

https://github.com/react-navigation/react-navigation

basically we have four `tab navigations(Home, Messenger, Order, Account)`, and a `nested stack navigation` in every tab navigation.

and we have a custom `<NavigationHeader>` component in `src/components/NavigationHeader`, you can use it to custom the navigation header of a Screen/Modal

if you add a new screen, add the screen configuration into the navigation config (`screens/{module_name}/index.js`)

```js
{
  screen: ProductList, // the screen Component
  path: "products",  // this is the path will be used in deep link
  navigationOptions: ({ navigation }) => ({ // the navigationOptions of react-navigation
    header: (
      <NavigationHeader
        onBackIconPress={() => navigation.goBack()} // the pressHandler of the back icon in the left, if it's null, will hide the icon
        centerTitle="products" //  the title in center
        rightIcons={[ // null, 1, or more React icons/nodes in the right.
          <Icon
            name="search"
            color="white"
            size={20}
            onPress={() => alert("search products not implemented yet")}
          />,
          <Icon
            name="plus"
            color="white"
            size={20}
            onPress={() => alert("add product not implemented yet")}
          />
        ]}
      />
    )
  })
  }
```

## Time library

we will moment.js for time/date parse/display/format, https://momentjs.com/docs/

## JS utility

we can use all the ES6,7 features.

and we use lodash for some additional js utility。

https://lodash.com/docs
