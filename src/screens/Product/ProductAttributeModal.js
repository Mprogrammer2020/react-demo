import CheckBox from "react-native-check-box";

import React, { Component } from "react";
import { Modal, ScrollView, View } from "react-native";

import NavigationHeader from "../../components/NavigationHeader";
import { MainButton } from "../../components/Button";
import { CheckBoxRight } from "../../components/CheckBox";

export default class ProductAttributeModal extends Component {
  state = {
    selectedValues: this.props.selectedValues
  };

  onClick(id) {
    const selectedValues = this.state.selectedValues;
    if (selectedValues.has(id)) {
      selectedValues.delete(id);
    } else {
      selectedValues.add(id);
    }
    this.setState({
      selectedValues
    });
  }

  onUnCheck() {}

  render() {
    const {
      onModalClose,
      visible,
      onSave,
      attributeToEdit: { values }
    } = this.props;

    const { selectedValues } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={onModalClose}
      >
        <NavigationHeader
          onBackIconPress={() => onModalClose()}
          centerTitle="Product Attribute"
        />

        <ScrollView>
          {values.map(({ name, id }, key) => (
            <CheckBoxRight
              key={key}
              text={name}
              isChecked={selectedValues.has(id)}
              onClick={() => this.onClick(id)}
            />
          ))}
        </ScrollView>
        <View style={{ width: 200, alignSelf: "center", marginBottom: 10 }}>
          <MainButton onPress={() => onSave(selectedValues)} title="Save" />
        </View>
      </Modal>
    );
  }
}
