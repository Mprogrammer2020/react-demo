import React, { Component } from "react";

import RNCheckBox from "react-native-check-box";
import PropTypes from "prop-types";

//  NOTE native CheckBox only available on Android now, will need some UI lib support same CheckBox on ios
// import { CheckBox, Switch, Platform } from "react-native";
// export default (Platform.OS === "android" ? CheckBox : Switch);

/**
 * some custom checkbox base on react-native-check-box
 */
const checkBoxPropTypes = {
  isChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,

  text: PropTypes.string,
  style: PropTypes.object
};

// 1. basic checkbox, check box in the left, with a text after it.
// eg: the checkbox to accept the usage terms or privacy policy
const CheckBox = ({ text, ...props }) => (
  <RNCheckBox
    style={{
      flex: 1,
      padding: 8
    }}
    {...props}
    rightText={text}
    checkBoxColor="red"
    uncheckedCheckBoxColor="#E0E0E0"
  />
);
CheckBox.propTypes = checkBoxPropTypes;

// 2. full width checkbox. text in the left and checkbox on right, with a bottom line
// eg: the full width multiple checkbox.
const CheckBoxRight = ({ text, ...props }) => (
  <RNCheckBox
    style={{
      flex: 1,
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#EEEEEE"
    }}
    {...props}
    leftText={text}
    checkBoxColor="red"
    uncheckedCheckBoxColor="#E0E0E0"
  />
);
CheckBoxRight.propTypes = checkBoxPropTypes;

export { CheckBox, CheckBoxRight };
