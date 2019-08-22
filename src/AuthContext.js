import React, { Component } from "react";
import { AsyncStorage } from "react-native";

import { setAxiosToken } from "./api/common";

export const AuthContext = React.createContext({
  profile: {},
  userToken: null
});

// inject the context props (authCtx) to the Component by wrapping the Component withAuth()
export const withAuth = ComponentWithAuth => props => (
  <AuthContext.Consumer>
    {authCtxProps => <ComponentWithAuth {...props} authCtx={authCtxProps} />}
  </AuthContext.Consumer>
);

export default class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      userToken: null
    };

    this.saveToken = this.saveToken.bind(this);
    this.removeToken = this.removeToken.bind(this);
    this.loadToken = this.loadToken.bind(this);
  }

  async saveToken(userToken, profile = {}) {
    this.setState({ userToken, profile });

    // async cache the userToken
    try {
      await AsyncStorage.setItem("userToken", userToken);

      setAxiosToken(userToken);
    } catch (error) {
      console.log("save token cache error:", error);
    }
  }

  async removeToken() {
    this.setState({ profile: {}, userToken: null });

    // remove the cached userToken
    try {
      const resp = await AsyncStorage.removeItem("userToken");
      return resp;
    } catch (error) {
      console.log("remove token cache error:", error);
    }
  }

  async loadToken() {
    // load cached token
    try {
      const resp = await AsyncStorage.getItem("userToken");
      return resp;
    } catch (error) {
      console.log("load token cache error:", error);
    }
  }

  // componentWillMount() {
  //   console.log("componentWillMount in AuthContext:");
  //   AsyncStorage.getItem("userToken")
  //     .then(token => {
  //       console.log("get cached user token success:", token);
  //       this.setState({ token });
  //     })
  //     .catch(error => {
  //       console.log("get cached user token failed:", error);
  //     });
  // }

  render() {
    return (
      <AuthContext.Provider
        value={{
          userToken: this.state.userToken,
          profile: this.state.profile,
          saveToken: this.saveToken,
          removeToken: this.removeToken,
          loadToken: this.loadToken
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
