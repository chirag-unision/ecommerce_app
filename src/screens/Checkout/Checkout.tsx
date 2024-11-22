import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { ScrollView } from 'react-native-gesture-handler';

export default function Checkout() {

    const cart = useSelector(state => state.cart);
    const totalcost = useSelector(state => state.netcost);

    return (
        <View style={styles.backgroundStyle}>
            <Text>Checkout</Text>
            <ScrollView style={modalStyles.centeredView}>

                    <Text style={[styles.textColor, { fontSize: 20, fontWeight: '800', paddingVertical: 20 }]}>Shopping Cart</Text>

                    {/* Items in cart */}
                    {cart.length == 0 ? <>
                        <Image source={require('../../assets/emptycart.png')} style={{ width: 65, height: 65, marginVertical: 100 }} />
                    </> : <>
                        <FlatList
                            data={cart}
                            renderItem={({ item }) => <CartItem id={item.id} showSpinner={false} />}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                        /></>}

                    {/* price */}
                    <View style={[styles.detailSection, { width: '100%', borderBottomWidth: 1 }]}>
                        <Text style={styles.label}>{'Total Price:'}</Text>
                        <Text style={styles.descSection}>{'Rs. ' + totalcost}</Text>
                    </View>

                    {/* address */}
                    <View style={styles.addressSection}>
                        <Text style={[styles.textColor, {fontWeight: '800'}]}>Address Name</Text>
                        <Text style={[styles.textColor]}>128E, Sector 11 Pocket E</Text>
                        <Text style={[styles.textColor]}>Faridabad, Haryana</Text>
                    </View>

                    {/* buttons */}
                    <View style={styles.buttonSection}>
                        <TouchableOpacity
                            style={[modalStyles.button, modalStyles.buttonOpen]}
                            onPress={() => { }}>
                            <Text style={modalStyles.textStyle}>Pay Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[modalStyles.button, modalStyles.buttonClose]}
                            onPress={() => { }}>
                            <Text style={modalStyles.textStyle}>Cash on Delivery</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </View>
    )
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
    addressSection: {
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc'
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
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff'
    },
    modalView: {
        margin: 40,
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