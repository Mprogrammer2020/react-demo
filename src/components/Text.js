import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  label: {
    // color: "#E0E0E0" // light grey
    color: "black"
  },
  error: {
    color: "red"
  },
  data: {
    color: "black"
  }
});

/**
 * Common Label Component
 *
 * <Label></Label>
 */
const labelPropTypes = {
  required: PropTypes.bool,
  children: PropTypes.node
};

// <Label required={required}>{label}</Label>
const Label = ({ children, required }) =>
  required ? (
    <Text style={styles.label}>
      {children}
      <Text style={{ color: "red" }}>*</Text>
    </Text>
  ) : (
    <Text style={styles.label}>{children}</Text>
  );
Label.propTypes = labelPropTypes;

// <Data>Don't have an account</Data>
const Data = ({ children }) => <Text style={styles.data}>{children}</Text>;

// red text
// <Error>some field is missing</Error>
const Error = ({ children }) => <Text style={styles.error}>{children}</Text>;

export { Label, Data, Error };
