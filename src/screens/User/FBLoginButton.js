import React, { Component } from "react";
import { View } from "react-native";
import { LoginManager, AccessToken, LoginButton } from "react-native-fbsdk";
import Icon from "react-native-vector-icons/FontAwesome";

import { Button } from "../../components/Button";
import { Error } from "../../components/Text";
import { getMe } from "../../api/facebook";
import { fbSignUp } from "../../api/user";
import { withAuth } from "../../AuthContext";
import { withLoading } from "../../components/Loading";

class FBLoginButton extends Component {
  constructor(props) {
    super(props);
    this._fbAuth = this._fbAuth.bind(this);
    this._handleRegisterRsp = this._handleRegisterRsp.bind(this);
    this.state = {
      errMessage: null,
      isLoading: false
    };
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

      // navigate to APP, and
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

  async _fbAuth() {
    try {
      const result = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);
      if (result.isCancelled) {
        return this.setState({
          errMessage: "Facebook Login Cancelled!"
        });
      }

      this.props.showLoading();
      const { accessToken } = await AccessToken.getCurrentAccessToken();
      if (!accessToken) {
        return this.onError("invalid fb token!");
      }

      const { data } = await getMe(accessToken);
      if (!data || !data.email || !data.first_name || !data.last_name) {
        return this.onError("fb profile or email not available");
      }
      const { email, first_name, last_name } = data;
      const response = await fbSignUp(
        { email, first_name, last_name },
        accessToken
      );
      await this._handleRegisterRsp(response.data);
    } catch (err) {
      return this.onError(
        (err && err.message) || "Facebook Login unkowned error occurred!!"
      );
    }
  }

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
          color="#3b5998"
          onPress={this._fbAuth}
          title="Login With Facebook"
          leftIcon={<Icon name="facebook" size={20} color="white" />}
        />
      </View>
    );
  }
}

export default withLoading(withAuth(FBLoginButton));
