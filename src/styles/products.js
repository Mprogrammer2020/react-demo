
import {
    StyleSheet,   
  } from 'react-native';
const Styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    loadMoreBtn: {
      padding: 10,
      backgroundColor: '#800000',
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
    },
    item: {
      backgroundColor: 'white',
      flexDirection: 'row',
      padding:10
    },
    avatar: {
      height: 110,
      width: 100,
      borderWidth:1,
  
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    details: {
      marginLeft: 20,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 14,
      color: 'black',
      marginRight:100,
  
    },
    number: {
      marginTop:5,
      fontSize: 12,
      color: '#999',
      marginRight:10
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'rgba(0, 0, 0, .08)',
    },
  });


  export default Styles