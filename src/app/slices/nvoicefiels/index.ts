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
  items: Item[];
  grandtotal: string;
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
  items: [],
  grandtotal: "0.00",
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
} = invoiceFieldsSlice.actions;
export default invoiceFieldsSlice.reducer;
// export const {} = invoiceFieldsSlice.actions