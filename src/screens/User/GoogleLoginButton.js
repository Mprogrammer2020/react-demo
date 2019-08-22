import React, { Component } from "react";
import { View, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Button } from "../../components/Button";
import { Error } from "../../components/Text";
import { googleSignUp } from "../../api/user";
import { withAuth } from "../../AuthContext";
import { withLoading } from "../../components/Loading";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";

class GoogleLoginButton extends Component {
  constructor(props) {
    super(props);
    this._signIn = this._signIn.bind(this);
    this._handleRegisterRsp = this._handleRegisterRsp.bind(this);
    this.state = {
      errMessage: null,
      isLoading: false
    };
  }

  async componentDidMount() {
    GoogleSignin.configure();
  }

  async _handleRegisterRsp(rsp) {
    const { authCtx, onSignLoginSuccess } = this.props;

    try {
      const { data, code, message } = rsp;
      if (!data || !data.access_token || code !== 200) {
        const errMessage = message || "server inner error";
        return this.onError(errMessage);
      }

      // set the auth user
      await authCtx.saveToken(data.access_token, data.profile || {});

      this.props.hideLoading();

      // navigate to APP
      onSignLoginSuccess();
    } catch (err) {
      this.setState({
        errMessage: err.message
      });
    }
  }

  onError(errMessage) {
    this.props.hideLoading();
    this.setState({
      errMessage
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      this.props.showLoading();
      const userInfo = await GoogleSignin.signIn();
      if (
        !userInfo ||
        !userInfo.accessToken ||
        !userInfo.user ||
        !userInfo.user.email ||
        !userInfo.user.givenName ||
        !userInfo.user.familyName
      ) {
        return this.onError("google profile or email missing ");
      }

      const {
        accessToken,
        user: { email, givenName, familyName }
      } = userInfo;
      const response = await googleSignUp(
        { email, first_name: givenName, last_name: familyName },
        accessToken
      );
    //  await this._handleRegisterRsp(response.data);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        return this.onError("google login cancelled");
        // } else if (error.code === statusCodes.IN_PROGRESS) {
        //   this.setState({
        //     errMessage: "google login in progress"
        //   });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Alert.alert("play services not available or outdated");
        return this.onError("play services not available or outdated");
      } else {
        // Alert.alert("Something went wrong", error.message);
          this.props.navigation.navigate("App");
        return this.onError("Something went wrong");
      }
    }
  };

  render() {
    // use our custom Button
    const { errMessage } = this.state;
    return (
      <View>
        {errMessage && (
          <View style={{ paddingTop: 5 }}>
            <Error>{errMessage}</Error>
          </View>
        )}
        <Button
          color="#DD4B39"
          onPress={this._signIn}
          title="Sign in with Google+"
          leftIcon={<Icon name="google-plus" size={20} color="white" />}
        />
      </View>
    );
  }
}

export default withLoading(withAuth(GoogleLoginButton));
