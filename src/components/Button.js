// https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js
// RN Button can only custom color, and don't have style custom and icon custom.
// use Touchable to custom a Mainbutton and OutlineButton

import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

class Button extends React.Component {
  render() {
    const {
      accessibilityLabel,
      color,
      onPress,
      title,
      disabled,
      outline,
      leftIcon,
      rightIcon,
      textStyle,
      buttonContainerStyle
    } = this.props;

    const buttonStyles = [styles.button];
    const textStyles = [styles.text];

    if (textStyle) {
      textStyles.push(textStyle);
    }

    if (buttonContainerStyle) {
      buttonStyles.push(buttonContainerStyle);
    }

    // TODO check the button background color and text color on ios device.
    // on emulator, android/ios are the same.

    // if (color) {
    //   if (Platform.OS === "ios") {
    //     textStyles.push({ color: color });
    //   } else {
    //     buttonStyles.push({ backgroundColor: color });
    //   }
    // }
    buttonStyles.push({ backgroundColor: color });

    if (outline) {
      buttonStyles.push(styles.buttonOutline);
      textStyles.push(styles.textOutline);
    }

    const accessibilityStates = [];
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
      accessibilityStates.push("disabled");
    }

    // invariant(
    //   typeof title === "string",
    //   "The title prop of a Button must be a string"
    // );

    // const formattedTitle =
    //   Platform.OS === "android" ? title.toUpperCase() : title;
    formattedTitle = title;

    const Touchable =
      Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <Touchable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityStates={accessibilityStates}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={buttonStyles}>
          {leftIcon ? (
            <View style={{ paddingLeft: 10 }}>{leftIcon}</View>
          ) : null}
          <Text style={textStyles} disabled={disabled}>
            {formattedTitle}
          </Text>
          {rightIcon ? (
            <View style={{ paddingRight: 10 }}>{rightIcon}</View>
          ) : null}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        borderRadius: 10
      },
      android: {
        elevation: 4,
        // Material design blue from https://material.google.com/style/color.html#color-color-palette
        backgroundColor: "#2196F3",
        borderRadius: 10
      }
    })
  },
  text: {
    textAlign: "center",
    padding: 8,
    ...Platform.select({
      ios: {
        // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
        // color: "#007AFF",
        // fontSize: 18
        color: "white"
      },
      android: {
        color: "white",
        fontWeight: "500"
      }
    })
  },
  buttonOutline: {
    borderWidth: 0, // TODO, how to hide the button border
    backgroundColor: "transparent",
    borderRadius: 0,
    elevation: 0
  },
  textOutline: {
    padding: 8,
    color: "black",
    borderRadius: 0,
    elevation: 0
  },
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: "#dfdfdf"
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: "#cdcdcd"
    },
    android: {
      color: "#a1a1a1"
    }
  })
});

const ButtonPropTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired, // the text content of of Button

  accessibilityLabel: PropTypes.string,

  // the button color (main background color)
  color: PropTypes.string,

  // if the Button is outline
  disabled: PropTypes.bool,

  // if it's outline Button
  outline: PropTypes.bool,

  // custom the left and right icon in the button
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,

  // custom the text style,
  // eg: may change the text color
  textStyle: PropTypes.object,

  // custom the root Container style,
  // eg: maybe change root container's justify-content from center to space-between/space-around
  buttonContainerStyle: PropTypes.object
};

// Main Button, render red action button with rounded corners
const MainButton = props => <Button {...props} color="#F44336" />;
MainButton.propTypes = ButtonPropTypes;

// Outline Button, without the box and background color
const OutlineButton = props => <Button {...props} outline={true} />;
OutlineButton.propTypes = ButtonPropTypes;

// forward action button, A custom Outline Button
// text in the left and angle-right icon on the right
const ForwardButton = props => (
  <Button
    {...props}
    outline={true}
    rightIcon={<Icon name="angle-right" size={24} color="black" />}
    buttonContainerStyle={{
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#e8e8e8",
      paddingTop: 8,
      paddingBottom: 8
    }}
  />
);
OutlineButton.propTypes = ButtonPropTypes;

export { Button, MainButton, OutlineButton, ForwardButton };
