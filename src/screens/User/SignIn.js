import React, { Component } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Logo from "../../components/Logo";
import { ClassicTextInput } from "../../components/TextInput";
import { Error, Data } from "../../components/Text";
import { Button, MainButton } from "../../components/Button";
import { ToryodDivider } from "../../components/Divider";
import FBLoginButton from "./FBLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { signIn } from "../../api/user";
import { withAuth } from "../../AuthContext";
import { withLoading } from "../../components/Loading";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      errMessage: null
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSignLoginSuccess = this.onSignLoginSuccess.bind(this);
  }

  async onSubmit() {
    const { email, password } = this.state;
    const authCtx = this.props.authCtx;

    try {
      this.props.showLoading();
      const { data, code, message } = (await signIn(email, password)).data;
      if (!data || !data.access_token || code !== 200) {
        const errMessage = message || "server inner error";
        this.setState({
          errMessage
        });
        this.props.hideLoading();
        return;
      }

      console.log("sign in successfully,", data.access_token, data.profile);
      await authCtx.saveToken(data.access_token, data.profile || {});

      this.props.hideLoading();

      // navigate to APP, and set the auth user
      return this.props.navigation.navigate("App");
    } catch (err) {
      this.props.hideLoading();
      this.setState({
        errMessage: err.message
      });
    }
  }

  onSignLoginSuccess() {
    // navigate after fb login success
    this.props.navigation.navigate("App");
  }

  render() {
    const { email, password, errMessage } = this.state;
    return (
      <View style={styles.container}>
        <View alignSelf="center">
          <Logo />
        </View>
        <ClassicTextInput
          label="Email"
          required={true}
          editable={true}
          onChangeText={text => this.setState({ email: text })}
        >
          {email}
        </ClassicTextInput>
        <ClassicTextInput
          label="Password"
          required={true}
          editable={true}
          onChangeText={text => this.setState({ password: text })}
        >
          {password}
        </ClassicTextInput>
        <Data>
          Forgot password?
          <Text style={{ color: "#4dabf5", paddingLeft: 10 }}>Click here</Text>
        </Data>
        {errMessage && (
          <View style={{ paddingTop: 5 }}>
            <Error>{errMessage}</Error>
          </View>
        )}
        <View style={{ width: "40%", alignSelf: "flex-end", marginTop: 40 }}>
          <MainButton onPress={() => this.props.navigation.navigate("App")} title="Sign In" />
        </View>
        <ToryodDivider />
        <View
          style={{
            width: "60%",
            alignSelf: "center",
            marginTop: 10
          }}
        >
          <View style={{ alignSelf: "center" }}>
            <Data>Don't have an account</Data>
          </View>
          <View style={{ marginTop: 10 }}>
            <MainButton
              onPress={() => this.props.navigation.navigate("SignUp")}
              title="Sign Up"
            />
          </View>
          
         
        </View>
      </View>
    );
  }
}

export default withLoading(withAuth(SignIn));

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 0,
    backgroundColor: "white",
    height: "100%",
    overflow: "scroll"
  },
  password: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white"
  }
});
