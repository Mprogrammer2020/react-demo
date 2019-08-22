import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  ScrollView,
  Platform
} from "react-native";
import Logo from "../../components/Logo";
import { ClassicTextInput } from "../../components/TextInput";
import { Error, Data } from "../../components/Text";
import { Button, MainButton } from "../../components/Button";
import { CheckBox } from "../../components/CheckBox";
import { signUp } from "../../api/user";
import FBLoginButton from "./FBLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { ToryodDivider } from "../../components/Divider";
import { withLoading } from "../../components/Loading";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobilePhoneNumber: "",
      password: "",
      passwordConfirmed: "",
      agreeTermAndPrivacy: false,

      errMessage: null
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSignLoginSuccess = this.onSignLoginSuccess.bind(this);
    this.onAgreeTermAndPrivacyChange = this.onAgreeTermAndPrivacyChange.bind(
      this
    );
  }

  onError(errMessage) {
    this.props.hideLoading();
    this.setState({
      errMessage
    });
  }

  async onSubmit() {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmed,
      agreeTermAndPrivacy
    } = this.state;

    if (!agreeTermAndPrivacy) {
      return this.onError("please accept term and privacy first");
    }

    if (password !== passwordConfirmed) {
      return this.onError("password not the same");
    }

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    };

    this.setState({
      errMessage: null
    });

    this.props.showLoading();

    try {
      const { code, message, errors } = (await signUp(newUser)).data;
      if (code !== 200) {
        let errMessage = message || "server inner error";

        // 422 incorrect format, add more info
        // TODO better error handling, may directly show info below corresping field.
        if (
          errors &&
          errors.code === 422 &&
          errors.errors &&
          errors.errors.length
        ) {
          errMessage += `: ${errors.errors
            .map(e => e.field || "")
            .join(",")} is in incorrect format`;
        }

        return this.onError(errMessage);
      }

      this.props.hideLoading();
      this.props.navigation.replace("SignUpSuccess");
    } catch (ex) {
      return this.onError(err.message);
    }
  }

  onSignLoginSuccess() {
    // navigate after fb login success
    this.props.navigation.navigate("App");
  }

  onAgreeTermAndPrivacyChange() {
    this.setState({
      agreeTermAndPrivacy: !this.state.agreeTermAndPrivacy
    });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      mobilePhoneNumber,
      password,
      passwordConfirmed,
      errMessage
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View alignSelf="center">
          <Logo />
        </View>
        <ClassicTextInput
          label="First Name"
          required={true}
          editable={true}
          onChangeText={text => this.setState({ firstName: text })}
        >
          {firstName}
        </ClassicTextInput>
        <ClassicTextInput
          label="Last Name"
          required={true}
          editable={true}
          onChangeText={text => this.setState({ lastName: text })}
        >
          {lastName}
        </ClassicTextInput>
        <ClassicTextInput
          label="Email"
          required={true}
          editable={true}
          onChangeText={text => this.setState({ email: text })}
        >
          {email}
        </ClassicTextInput>
        <ClassicTextInput
          label="Mobile Number"
          required={true}
          editable={true}
          onChangeText={text => this.setState({ mobilePhoneNumber: text })}
        >
          {mobilePhoneNumber}
        </ClassicTextInput>
        <View style={styles.password}>
          <View
            style={{
              width: "50%",
              paddingRight: 10
            }}
          >
            <ClassicTextInput
              label="Password"
              required={true}
              editable={true}
              onChangeText={text => this.setState({ password: text })}
            >
              {password}
            </ClassicTextInput>
          </View>
          <View
            style={{
              width: "50%",
              paddingLeft: 10
            }}
          >
            <ClassicTextInput
              label="Confirm Password"
              required={true}
              editable={true}
              onChangeText={text => this.setState({ passwordConfirmed: text })}
            >
              {passwordConfirmed}
            </ClassicTextInput>
          </View>
        </View>
        <View style={{ paddingTop: 8 }}>
          <CheckBox
            onClick={this.onAgreeTermAndPrivacyChange}
            isChecked={this.state.agreeTermAndPrivacy}
            text="Uopn creating my account, i agree to:"
            style={{ padding: 0, paddingTop: 5 }}
          />
          <View style={{ paddingTop: 0, marginTop: 2, paddingLeft: 32 }}>
            <Text style={{ color: "#4dabf5" }}>- Term of user</Text>
            <Text style={{ color: "#4dabf5" }}>- Privacy Policy</Text>
          </View>
        </View>

        {errMessage && (
          <View style={{ paddingTop: 5 }}>
            <Error>{errMessage}</Error>
          </View>
        )}
        <View
          style={{
            paddingTop: 20,
            width: "40%",
            alignSelf: "flex-end",
            flexDirection: "column"
          }}
        >
          <MainButton  onPress={() => this.props.navigation.navigate("App")} title="Sign Up" />
        </View>
        <ToryodDivider />
        <View
          style={{
            width: "60%",
            alignSelf: "center",
            marginTop: 10,
            paddingBottom: 20
          }}
        >
        </View>
      </ScrollView>
    );
  }
}

export default withLoading(SignUp);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    height: "100%",
    overflow: "scroll"
  },
  password: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 60
  }
});
