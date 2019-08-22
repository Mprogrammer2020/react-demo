import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignUpSuccess = ({ props }) => (
  <View style={styles.container}>
    <Icon name="account-check" color="#DD4B39" size={120} />
    <Text style={styles.thanks}>Thank you for your register</Text>
    <Text>A confirmation email has been sent to your mailbox</Text>
    <Text style={styles.problem}>having problem receiving email?</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  thanks: {
    fontWeight: "600",
    fontSize: 20
  },
  notes: {
    fontWeight: "600"
  },
  problem: {
    color: "#4dabf5",
    paddingLeft: 10
  }
});

export default SignUpSuccess;
