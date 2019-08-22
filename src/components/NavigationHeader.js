import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

const propTypes = {
  // if this param is specified, will render a back arrow icon in the left side
  onBackIconPress: PropTypes.func,

  // the title in the center,
  centerTitle: PropTypes.string,

  // the right icon or icons array
  rightIcons: PropTypes.oneOfType([
    PropTypes.arrayOf[PropTypes.node],
    PropTypes.node
  ])
};

/**
 * Common <NavigationHeader>, used in Navigation/Modal Header
 * 
 * eg: 
 * 
 * header with only title and right icons, without back icon in left
 * <NavigationHeader 
 *  centerTitle="Store Name" 
 *  rightIcons={ <Icon name="bell" /> }/>
 *
 * header with back icon in left, title in center, and a edit icon in the right
 * <NavigationHeader
      onBackIconPress={() => navigation.goBack()}
      centerTitle={navigation.state.params.name}
      rightIcons={<Icon name="edit" onPress={() => ()}
    />
 *
 * header with back icon in left, title in center, and two icons (search icon and plus icon) in the right
 * <NavigationHeader
      onBackIconPress={() => navigation.goBack()}
      centerTitle="Product"
      rightIcons={[
      <Icon name="search" ... />,
      <Icon name="plus" ... />
    ]}
   />
 */
const NavigationHeader = ({ onBackIconPress, centerTitle, rightIcons }) => {
  let rightIconsDiv = null;
  if (rightIcons) {
    // icons array
    if (Array.isArray(rightIcons) && rightIcons.length > 0) {
      rightIconsDiv = (
        <View style={{ flexDirection: "row" }}>
          {rightIcons.map((icon, key) => (
            <View key={key} style={{ marginLeft: 12 }}>
              {icon}
            </View>
          ))}
        </View>
      );
    } else {
      // single icon or React node
      rightIconsDiv = rightIcons;
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {onBackIconPress && (
          <Icon
            name="arrow-left"
            size={20}
            color="white"
            onPress={onBackIconPress}
          />
        )}
      </View>

      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: 20,
            marginRight: 20
          }}
        >
          {centerTitle}
        </Text>
      </View>
      <View>{rightIconsDiv}</View>
    </View>
  );
};
NavigationHeader.propTypes = propTypes;

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#1D4F90",
    color: "#fff",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
