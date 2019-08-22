import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    height: 24,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 6
  },
  line: {
    height: 24,
    borderBottomWidth: 1,
    transform: [{ translateY: -12 }]
  },
  shortWidth: {
    width: 20
  },
  dashed: {
    borderStyle: "dashed"
  }
});

const propTypes = {
  dashed: PropTypes.bool,
  borderColor: PropTypes.string,
  orientation: PropTypes.oneOf(["left", "center", "right"]),
  height: PropTypes.number
};

const defaultProps = {
  dashed: false,
  orientation: "left",
  borderColor: "#e8e8e8",
  height: 1
};

/**
 * Basic Divider Component
 */
class Divider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.line,
            { borderColor: props.borderColor },
            props.dashed && styles.dashed,
            props.orientation === "left" ? styles.shortWidth : { flex: 1 },
            { borderBottomWidth: props.height ? props.height : 1 }
          ]}
        />
        {props.children}
        <View
          style={[
            styles.line,
            { borderColor: props.borderColor },
            props.dashed && styles.dashed,
            props.orientation === "right" ? styles.shortWidth : { flex: 1 },
            { borderBottomWidth: props.height ? props.height : 1 }
          ]}
        />
      </View>
    );
  }
}
Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;

/**
 * Divider with Toryod icon in the center
 */
const ToryodDivider = props => (
  <Divider borderColor="#E0E0E0" orientation="center">
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 6 / 2,
        backgroundColor: "red",
        marginLeft: 5
      }}
    />
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 6 / 2,
        backgroundColor: "green",
        marginLeft: 5
      }}
    />
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 6 / 2,
        backgroundColor: "blue",
        marginLeft: 5,
        marginRight: 5
      }}
    />
  </Divider>
);

export { Divider, ToryodDivider };
