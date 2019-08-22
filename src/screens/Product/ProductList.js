
import React, { Component } from 'react';
import { StyleSheet, Dimensions,Alert } from 'react-native';
import {
  TabView,
  TabBar,
  SceneMap,
   Route,
   NavigationState,
   
   
} from 'react-native-tab-view';
import AllProucts from './ProductionTabs/AllProucts';
import Reject from './ProductionTabs/Reject';
import Approved from './ProductionTabs/Approved';
import Pending from './ProductionTabs/Pending';
import { withAuth } from "../../AuthContext";
import axios from 'axios';

type State = NavigationState<
  Route<{
    key: string,
    title: string,
  }>
>;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class ProductList extends Component {
  componentDidMount() {
    const {
      authCtx: { userToken = {} },
      navigation
    } = this.props;
    this.setState({usertoken:userToken},()=>{
      this.getCountApi()
    })
   }
  
  getCountApi = async () => {
    const token = "Bearer "+ this.state.usertoken
   // console.warn(token)
      axios({
          url: 'https://api.taradtoryoddev.com/erp/v1/merchant/products/count_by_status',
          method:'get',
          headers: { 'Authorization': token, 'Content-Type': 'application/json' },
      })
          .then((response) => {

           console.warn(response.data.data[0].total_products)

              this.setState({total_products:response.data.data[0].total_products,
                total_products:response.data.data[0].total_products,
                total_products: response.data.data[0].total_products
              })
             
             
          })
          .catch((error) => {
            console.warn("error")

              this.setState({ loaded: false})
              console.log(error);
          });
  };



  static title = 'Scrollable top bar';
  static backgroundColor = '#3f51b5';
  static appbarElevation = 0;

  state = {
    index: 0,
    routes: [
      { key: 'AllProucts', title: 'All(2)' },
      { key: 'Approved', title: 'Approved(2)' },
      { key: 'Reject', title: 'Rejected(1)'},
      { key: 'Pending', title: 'Pending(2)' },
    ],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });

  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  _renderScene = SceneMap({
    Reject: Reject,
    Approved: Approved,
    AllProucts: AllProucts,
    Pending: Pending,
  });

  render() {
   
    return (
      <TabView
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: 'white',
  },
  tab: {
    width: 130,
  },
  indicator: {
    backgroundColor: 'red',
  },
  label: {
    color: 'black',
    fontSize:12,
    fontWeight: '800',
  },
});

export default withAuth(ProductList);
