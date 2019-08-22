import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Label } from "./Text";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  // text input without the box
  textInput: {},

  // Text input field with light gray background and rounded corners
  classicTextInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    // borderCo: "1px solid #DBDBDB"
    borderColor: "#DBDBDB",
    height: 36
  }
});

const classicTextInputPropTypes = {
  onChangeText: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  editable: PropTypes.bool,
  required: PropTypes.bool
};

const BasicTextInput = ({ editable, onChangeText, children }) => (
  <TextInput
    editable={editable}
    onChangeText={onChangeText}
    style={styles.textInput}
  >
    {children}
  </TextInput>
);

/**
 * Text input field with light gray background and rounded corners
 * also can have label(required or not) above the text input
 */
const ClassicTextInput = ({
  editable,
  onChangeText,
  children,
  required,
  label
}) =>
  label ? (
    <View style={{ paddingTop: 5, paddingBottom: 3 }}>
      <Label required={required}>{label}</Label>
      <TextInput
        editable={editable}
        onChangeText={onChangeText}
        style={{ ...styles.classicTextInput, marginTop: 3 }}
      >
        {children}
      </TextInput>
    </View>
  ) : (
    <TextInput
      editable={editable}
      onChangeText={onChangeText}
      style={styles.classicTextInput}
    >
      {children}
    </TextInput>
  );
ClassicTextInput.propTypes = classicTextInputPropTypes;

export { BasicTextInput, ClassicTextInput };
