import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    productsData: [],
    netcost: 0
}

const totalcost= (state)=> {
    let total= 0;
    state.cart.map((item)=> {
        total += item.count*item.price;
    })
    state.netcost= total.toFixed(2);
}

export const slice= createSlice({
    name: 'app',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.productsData= action.payload.data;
            console.log("Products Fetched!");
        },
        addtoCart: (state, action) => {
            const item= {
                id: action.payload.id,
                price: action.payload.price,
                count: 1
            }
            state.cart.push(item);
            console.log("Added!"+JSON.stringify(state.cart));
            totalcost(state);
        },
        increase: (state, action) => {
            const i= state.cart.findIndex((item) => item.id==action.payload.id)
            state.cart[i].count += 1;
            totalcost(state);
        },
        decrease: (state, action) => {
            const i= state.cart.findIndex((item) => item.id==action.payload.id)
            if(state.cart[i].count > 1) {
                state.cart[i].count -= 1;
            } else {
                state.cart= state.cart.filter((item) => item.id!==action.payload.id)
            }
            totalcost(state);
        },
        
    }
})

export const {getProducts, addtoCart, increase, decrease} = slice.actions;

export default slice.reducer;