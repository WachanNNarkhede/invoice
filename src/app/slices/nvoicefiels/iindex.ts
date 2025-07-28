// import { createSlice } from "@reduxjs/toolkit";

// interface Items {
//     id: number;
//     name: string;
//     quantity: number;
//     price: number;
//   }

//   interface InvoiceStatee{
//     items: Items[];
//     grandtotal: number;
//   }

//   const initialState: InvoiceStatee ={
//     items: [],
//     grandtotal: 0
//   }

//   const invoicedesliice = createSlice({
//     name: 'invoiceFields',
//     initialState,
//     reducers:{
//         AddItems :(state,action: PayloadAction<Items>) =>{
//             state.items = [...state.items, action.payload];
//         }
//     }
//   })