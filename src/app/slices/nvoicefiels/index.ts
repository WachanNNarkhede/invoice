// src/slices/invoiceFields/index.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  invoiceNumber: string;
  mobile: string;
  address: string;
  date: string;
  gender: string;
  age: string;
}
interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
interface InvoiceState {
  selectedName: string;
  formData: FormData;
  items: Item[];
}



const initialState: InvoiceState = {
  selectedName: '',
  formData: {
    invoiceNumber: '',
    mobile: '',
    address: '',
    date: '',
    gender: '',
    age: '',
},
  items: [], 
};



const invoiceFieldsSlice = createSlice({
  name: 'invoiceFields',
  initialState,
  reducers: {
   
    },
  },
});



export default invoiceFieldsSlice.reducer;
