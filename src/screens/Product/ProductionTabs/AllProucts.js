import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image
} from "react-native";

import { getProductAll } from "../../../api/user";
import axios from "axios";
import { withNavigation } from "react-navigation";

class AllProucts extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      serverData: []
    };
    this.offset = 4;
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    axios
      .get(
        "https://api.taradtoryoddev.com/erp/v1/products?limit=" + this.offset,
        {}
      )
      .then(responseJson => {
        //   console.warn(responseJson.data.data)

        this.offset = this.offset + 4;
        this.setState({
          serverData: [...this.state.serverData, ...responseJson.data.data],
          loading: false
        });
      })
      .catch(error => {
        // console.warn(error)
      });
  }

  // getData = () => {
  //   fetch('https://api.taradtoryoddev.com/erp/v1/products?limit='+ )
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     this.offset = this.offset + 4;
  //     this.setState({
  //       serverData: [...this.state.serverData, ...responseJson.data],
  //       loading: false,
  //     });
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // }

  loadMoreData = () => {
    this.setState({ fetching_from_server: true }, () => {
      axios
        .get(
          "https://api.taradtoryoddev.com/erp/v1/products?limit=" + this.offset,
          {}
        )
        .then(responseJson => {
          //  console.warn(responseJson.data)

          this.offset = this.offset + 4;
          this.setState({
            serverData: [...this.state.serverData, ...responseJson.data.data],
            fetching_from_server: false
          });
        })
        .catch(error => {
          // console.warn(error)
        });
    });
  };

  renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>Load More</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            keyExtractor={(item, index) => index}
            data={this.state.serverData}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ViewProduct", item)
                }
              >
                <View style={styles.item}>
                  <View style={styles.avatar}>
                    <Image
                      style={styles.avatar}
                      source={
                        item.images[0] !== null
                          ? { uri: item.images[0] }
                          : require("../../../../assets/default.jpeg")
                      }
                    />
                  </View>

                  <View style={styles.details}>
                    <Text style={styles.name}>{item.name}</Text>
                    {/* <Text style={styles.number}>{item.pricing.display_price}</Text> */}
                    <Text style={styles.number}>
                      "{item.pricing.display_sales_price} -{" "}
                      {item.pricing.display_save_price}
                    </Text>
                    <Text style={styles.number}>
                      {" "}
                      Last Date: {item.created_date}
                    </Text>
                    <Text style={styles.number}>
                      {" "}
                      Last Update: {item.updated_date}
                    </Text>
                    {item.status.code === "approved" && (
                      <TouchableOpacity
                        style={{
                          marginTop: 6,
                          backgroundColor: "#00B134",
                          borderRadius: 4,
                          width: 120
                        }}
                        onPress={this._onPressButton}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            marginLeft: 10,
                            marginRight: 10,
                            color: "white",
                            marginTop: 5,
                            marginBottom: 5
                          }}
                        >
                          Approved
                        </Text>
                      </TouchableOpacity>
                    )}
                    {item.status.code === "pending" && (
                      <TouchableOpacity
                        style={{
                          marginTop: 6,
                          backgroundColor: "#FF4905",
                          borderRadius: 4,
                          width: 120
                        }}
                        onPress={this._onPressButton}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            marginLeft: 10,
                            marginRight: 10,
                            color: "white",
                            marginTop: 5,
                            marginBottom: 5
                          }}
                        >
                          Pending
                        </Text>
                      </TouchableOpacity>
                    )}
                    {item.status.code === "rejected" && (
                      <TouchableOpacity
                        style={{
                          marginTop: 6,
                          backgroundColor: "#FD001B",
                          borderRadius: 4,
                          width: 120
                        }}
                        onPress={this._onPressButton}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            marginLeft: 10,
                            marginRight: 10,
                            color: "white",
                            marginTop: 5,
                            marginBottom: 5
                          }}
                        >
                          Rejected
                        </Text>
                      </TouchableOpacity>
                    )}
                    {item.status.code === "draft" && (
                      <TouchableOpacity
                        style={{
                          marginTop: 6,
                          backgroundColor: "#6F6D73",
                          borderRadius: 4,
                          width: 120
                        }}
                        onPress={this._onPressButton}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            marginLeft: 10,
                            marginRight: 10,
                            color: "white",
                            marginTop: 5,
                            marginBottom: 5
                          }}
                        >
                          Draft
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={this.renderFooter.bind(this)}
            //Adding Load More button as footer component
          />
        )}
      </View>
    );
  }
}

export default withNavigation(AllProucts);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
  },
  item: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10
  },
  avatar: {
    height: 110,
    width: 100,
    borderWidth: 1,

    alignItems: "center",
    justifyContent: "center"
  },

  details: {
    marginLeft: 20
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    marginRight: 100
  },
  number: {
    marginTop: 5,
    fontSize: 12,
    color: "#999",
    marginRight: 10
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0, 0, 0, .08)"
  }
});
