import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increase, decrease, getProducts } from '../appSlice';
import { addtoCart } from '../appSlice';
import Item from './components/Item';
import CartItem from './components/CartItem';
import { API } from '../../app.json';
import { useNavigation } from '@react-navigation/native';
import routes from '../constants/routes';

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

function Home(): React.JSX.Element {

    const [modal, setModal] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(API)
            .then(res => {
                const data = res.data;
                dispatch(getProducts({data: data}));
            })
    }, [])

    const cart = useSelector(state => state.cart);
    const totalcost = useSelector(state => state.netcost);
    const data = useSelector(state => state.productsData);

    const inCart= cart.filter((item:object) => item.id==modal?.id);

    const handleModal = (data: ItemProps) => {
        setModal(data);
        setModalVisible(true);
    }

    const handleCart = () => {
        setCartVisible(true);
    }

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleCheckout = () => {
        setCartVisible(false);
        navigation.navigate(routes.CHECKOUT);
    }

    return (
        <SafeAreaView style={styles.backgroundStyle}>

            {/* Modal box for product view */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={modalStyles.centeredView}>
                    <View style={[modalStyles.modalView, {padding: 25}]}>

                        {/* image */}
                        <View style={{paddingVertical: 15}}>
                            <Image source={{ uri: modal?.image }} style={styles.image} />
                        </View>

                        {/* description */}
                        <View style={styles.detailSection}>
                            <Text style={styles.label}>{'Description'}</Text>
                            <Text style={styles.descSection}>{modal?.description}</Text>
                        </View>

                        {/* price */}
                        <View style={styles.detailSection}>
                            <Text style={styles.label}>{'Price'}</Text>
                            <Text style={styles.descSection}>{'Rs. '+modal?.price}</Text>
                        </View>

                        {/* buttons */}
                        <View style={styles.buttonSection}>
                            { inCart.length==1 ? <>
                                <View style={styles2.spinner}>
                                    <TouchableOpacity onPress={() => dispatch(decrease({id: inCart[0].id}))}><Text style={styles2.spinbutton}>{'-'}</Text></TouchableOpacity>
                                    <View><Text style={styles2.spinCount}>{inCart[0].count}</Text></View>
                                    <TouchableOpacity onPress={() => dispatch(increase({id: inCart[0].id}))}><Text style={styles2.spinbutton}>{'+'}</Text></TouchableOpacity>
                                </View>
                            </> : <>
                            <TouchableOpacity
                                style={[modalStyles.button, modalStyles.buttonOpen]}
                                onPress={
                                    () => {
                                        dispatch(addtoCart({ id: modal.id, price: modal.price }))
                                        setModalVisible(!modalVisible)
                                    }}>
                                <Image source={require('../assets/cartlogo.png')} style={styles.cartIcon} />
                                <Text style={modalStyles.textStyle}>Add to Cart</Text>
                            </TouchableOpacity>
                            </> }
                            <TouchableOpacity
                                style={[modalStyles.button, modalStyles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={modalStyles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

            {/* Modal box for cart */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={cartVisible}
                onRequestClose={() => {
                    setCartVisible(!cartVisible);
                }}>
                <View style={modalStyles.centeredView}>
                    <View style={[modalStyles.modalView, {padding: 10}]}>

                        <Text style={[styles.textColor, {fontSize: 20, fontWeight: '800', paddingVertical: 20}]}>Shopping Cart</Text>

                        {/* Items in cart */}
                        {cart.length==0 ? <>
                            <Image source={require('../assets/emptycart.png')} style={{width: 65, height: 65, marginVertical: 100}} />
                        </> : <>
                        <FlatList
                            data={cart}
                            renderItem={({ item }) => <CartItem id={item.id} showSpinner={true} />}
                            keyExtractor={item => item.id}
                        /></>}

                        {/* price */}
                        <View style={[styles.detailSection, { width: 350, borderBottomWidth: 1 }]}>
                            <Text style={styles.label}>{'Total Price:'}</Text>
                            <Text style={styles.descSection}>{'Rs. '+totalcost}</Text>
                        </View>

                        {/* buttons */}
                        <View style={styles.buttonSection}>
                            <TouchableOpacity
                                style={[modalStyles.button, modalStyles.buttonOpen]}
                                onPress={handleCheckout}>
                                <Text style={modalStyles.textStyle}>Checkout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[modalStyles.button, modalStyles.buttonClose]}
                                onPress={() => setCartVisible(!cartVisible)}>
                                <Text style={modalStyles.textStyle}>Shop More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headText]}>Shopping</Text>
                <TouchableOpacity onPress={handleCart} style={{ position: 'absolute', right: 10 }}>
                    <Image source={require('../assets/cartlogo.png')} style={{width: 30, height: 30}} />
                </TouchableOpacity>
            </View>
            <View>
                <TextInput style={{borderWidth: 1, borderColor: '#ccc', color: "#000", margin: 10, borderRadius: 5}} placeholder='Search here' placeholderTextColor='#ccc' />
            </View>

            {/* List of Items */}
            <FlatList
                data={data}
                renderItem={({ item }) => <Item id={item.id} title={item.title} category={item.category} price={item.price} image={item.image} rating={item.rating} handleModal={() => handleModal(item)} />}
                keyExtractor={item => item.id}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#fff',
        height: Dimensions.get('window').height
    },
    textColor: {
        color: '#000'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    buttonSection: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        padding: 15
    },
    detailSection: {
        alignItems: 'flex-start', 
        justifyContent: 'flex-start', 
        flexDirection: 'row', 
        marginVertical: 5
    },
    label: {
        color: 'black', 
        width: 100, 
        fontWeight: '800', 
        fontSize: 17
    },
    descSection: {
        color: 'black', 
        width: 220, 
        fontWeight: '600', 
        fontSize: 17, 
        textAlign: 'justify' 
    },
    cartIcon: {
        width: 30, 
        height: 30, 
        marginRight: 10
    },
    header: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 10, 
        backgroundColor: 'orange'
    },
    headText: {
        fontSize: 20, 
        fontWeight: '800', 
        color: '#fff'
    }
});

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000ab'
    },
    modalView: {
        marginVertical: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
    button: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 18,
        marginHorizontal: 10,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonOpen: {
        backgroundColor: 'orange',
    },
    buttonClose: {
        backgroundColor: '#a1a1a1',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

const styles2 = StyleSheet.create({
    spinner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#fff',
      marginHorizontal: 10,
    },
    spinCount: {
      color: '#000',
      backgroundColor: '#f1f1f1',
      paddingHorizontal: 10,
      paddingVertical: 12,
      fontWeight: '900',
      fontSize: 16
    },
    spinbutton: {
      color: '#000',
      backgroundColor: 'orange',
      paddingHorizontal: 10,
      paddingVertical: 12,
      fontWeight: '900',
      fontSize: 16
    }
  })


export default Home;
