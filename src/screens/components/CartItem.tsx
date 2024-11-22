import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increase, decrease } from '../../appSlice';

interface ItemProps {
    id: number;
    showSpinner: boolean;
}

function CartItem(props: ItemProps) {

    const cart= useSelector(state => state.cart);
    const products= useSelector(state => state.productsData);
    const dispatch= useDispatch();
  
    const inCart= cart.filter((item:object) => item.id==props.id);
    const data= products.filter((item:object) => item.id==props.id);
  
    return (
      <View style={styles2.container}>

        {/* Image */}
        <View style={{width: 100, alignItems: 'center'}}>
          <Image source={{ uri: data[0]?.image }} style={styles2.image} />
        </View>

        {/* Info */}
        <View style={styles2.infoContainer}>

          {/* Title */}
          <Text style={[styles2.textColor, styles2.title]}>
              {data[0]?.title?.substring(0,60)}{data[0]?.title?.length>60?'...':''}
          </Text>

          {/* Section C */}
          <View style={styles2.sectionC}>
              <Text style={[styles2.text, styles2.textColor]}>{'Rs. '+data[0]?.price}</Text>
              { inCart.length==1 && props.showSpinner && <> 
              <View style={styles2.spinner}>
                  <TouchableOpacity onPress={() => dispatch(decrease({id: inCart[0].id}))}>
                    <Text style={styles2.spinbutton}>{'-'}</Text>
                  </TouchableOpacity>
                  <View>
                    <Text style={styles2.spinCount}>{inCart[0].count}</Text>
                  </View>
                  <TouchableOpacity onPress={() => dispatch(increase({id: inCart[0].id}))}>
                    <Text style={styles2.spinbutton}>{'+'}</Text>
                  </TouchableOpacity>
              </View></>}
          </View>

          {/* Category */}
          <Text style={[styles2.text2, styles2.textColor2]}>
            {'Category: '+data[0]?.category}
          </Text>

        </View>

      </View>
    )
  }
  
  const styles2 = StyleSheet.create({
    container: {
      // width: 350,
      padding: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'contain'
    },
    title: {
      fontSize: 18, 
      fontWeight: '600', 
      maxHeight: 48
    },
    infoContainer: {
      alignItems: 'flex-start', 
      justifyContent: 'space-between', 
      paddingHorizontal: 5, 
      width: 250
    },
    sectionC: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: 240, 
        height: 25
    },
    spinner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: '#fff',
      marginHorizontal: 10
    },
    spinCount: {
      color: '#000',
      backgroundColor: '#f1f1f1',
      paddingHorizontal: 10,
      paddingVertical: 2,
      fontWeight: '900',
      fontSize: 16
    },
    spinbutton: {
      color: '#000',
      backgroundColor: 'orange',
      paddingHorizontal: 10,
      paddingVertical: 2,
      fontWeight: '900',
      fontSize: 16
    },
    text: {
        fontWeight: '900',
        fontSize: 16
    },
    text2: {
        fontWeight: '700'
    },
    textColor: {
      color: '#000'
    },
    textColor2: {
      color: '#a1a1a1'
    },
  })

  export default CartItem;