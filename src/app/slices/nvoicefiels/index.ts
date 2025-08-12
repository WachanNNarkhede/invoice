import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  invoiceNumber: string;
  mobile: string;
  address: string;
  date: string;
  gender: string;
  age: string;
}

export interface Item {
  gst: number | string;
  id: number;
  name: string ;
  quantity: number | string;
  price: number | string;

  
}
export interface InvoiceState {
  selectedName: string;
  formData: FormData;
  grandtotal: string;
  count: number;
}

const initialState: InvoiceState = {
  selectedName: "",
  formData: {
    invoiceNumber: "",
    mobile: "",
    address: "",
    date: "",
    gender: "",
    age: "",
  },
  grandtotal: "0.00",
  count: 0,
};

const invoiceFieldsSlice = createSlice({
  name: "invoiceFields",
  initialState,
  reducers: {
    setSelectedName(state, action: PayloadAction<string>) {
      state.selectedName = action.payload;
    },
    setFormData(state, action: PayloadAction<FormData>) {
      state.formData = action.payload;
    },
    updateFormField(
      state,
      action: PayloadAction<{ field: keyof FormData; value: string }>
    ) {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
   
updateCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },


    updatetotalbill(state, action: PayloadAction<string>) {
      state.grandtotal = action.payload;
    },
  },
});

export const {
  setSelectedName,
  setFormData,
  updateFormField,
  updatetotalbill,
  updateCount
} = invoiceFieldsSlice.actions;
export default invoiceFieldsSlice.reducer;  