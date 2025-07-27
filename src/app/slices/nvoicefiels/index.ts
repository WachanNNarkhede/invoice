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
    addTodo: () => {},
    setSelectedName(state, action: PayloadAction<string>) {
      state.selectedName = action.payload;
    },
    setFormData(state, action: PayloadAction<FormData>) {
      state.formData = action.payload;
    },
    updateFormField(state, action: PayloadAction<{ field: keyof FormData; value: string }>) {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
      addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    resetItems(state) {
      state.items = [];
    },
  },
});



export const { setSelectedName, setFormData, updateFormField, addItem, resetItems,addTodo } = invoiceFieldsSlice.actions;
export default invoiceFieldsSlice.reducer;