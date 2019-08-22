import React from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { withAuth } from "../AuthContext";
import { refreshToken } from "../api/user";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    console.log("========Auth Loading _bootstrapAsync");
    // TODO may also want to cache the expires_in date, and cached date,
    // then calculate if the token is expired before call refresh token api when loading
    const { loadToken, saveToken, removeToken } = this.props.authCtx;
    try {
      // load token from cache
      const userToken = await loadToken();
      let newToken = null;
console.log(userToken)
      // refresh token api here.
      if (userToken) {
        const { data, code } = (await refreshToken(userToken)).data;

        if (code === 200 && data && data.access_token) {
          // store new token to context
          newToken = data.access_token;
          await saveToken(newToken, data.profile);
        } else {
          // refreshToken failed, expired token
          await removeToken();
        }
      }

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(newToken ? "App" : "Auth");
    } catch (ex) {
      // redirect to Auth screen when unkown error
      this.props.navigation.navigate("Auth");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      </View>
    );
  }
}

export default withAuth(AuthLoadingScreen);

// const ForwardRef = React.forwardRef((props, ref) => (
//   <MyContext.Consumer>
//     {context => <AuthLoadingScreen context={context} {...props} />}
//   </MyContext.Consumer>
// ));

// export default ({ navigation }) => (
//   <View style={styles.container}>
//     <ForwardRef navigation={navigation} />
//   </View>
// );
