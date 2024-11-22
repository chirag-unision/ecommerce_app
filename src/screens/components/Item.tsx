import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { increase, decrease } from '../../appSlice';

interface ItemProps {
    id: number;
    title: string;
    description?: string;
    price: number;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    handleModal(): void;
}

function Item(props: ItemProps) {

    const cart= useSelector(state => state.cart);
    const dispatch= useDispatch();
  
    const inCart= cart.filter((item:object) => item.id==props.id);
  
    return (
      <Pressable onPress={props.handleModal}>
      <View style={styles2.container}>

        {/* Image */}
        <View style={{width: 150, alignItems: 'center'}}>
          <Image source={{ uri: props.image }} style={styles2.image} />
        </View>

        {/* Info */}
        <View style={styles2.infoContainer}>

          {/* Title */}
          <Text style={[styles2.textColor, styles2.title]}>
              {props.title.substring(0,40)}{props.title.length>40?'...':''}
          </Text>

          {/* Rating */}
          <View style={styles2.rating}>
            <AirbnbRating
                count={5}
                defaultRating={props.rating.rate}
                size={20}
                reviewSize={0}
                isDisabled
                starContainerStyle={{marginTop: -20}}
            />
            <Text style={[styles2.text2, styles2.textColor2, {paddingHorizontal: 5}]}>
                {'('+props.rating.count+')'}
            </Text>
          </View>

          {/* Section C */}
          <View style={styles2.sectionC}>

              {/* Price */}
              <Text style={[styles2.text, styles2.textColor]}>{'Rs. '+props.price}</Text>

              {/* Item Spinner */}
              { inCart.length==1 && <>
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
            {'Category: '+props.category}
          </Text>

        </View>

      </View>
      </Pressable>
    )
  }
  
  const styles2 = StyleSheet.create({
    container: {
      width: Dimensions.get('window').width-20,
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    image: {
      width: 150,
      height: 150,
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
      width: Dimensions.get('window').width-190
    },
    rating: {
      flexDirection: 'row',
       alignItems: 'center'
    },
    sectionC: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: Dimensions.get('window').width-200, 
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

  export default Item;