
import Button from '@mui/material/Button'
import './App.css'
import { Container, FormControl, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography, InputLabel, TextField, Box, type SelectChangeEvent } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useAppSelector } from './app/hooks';
import { setSelectedName, setFormData, updateFormField, addItem }  from './app/slices/nvoicefiels';
import Userdata from './data/user.json';
import { useState } from 'react';







function Taxtxt() {
 const dispatch = useDispatch();
 const {selectedName, formData, items} = useAppSelector((state)=>state.invoiceFields);

const handledropdown = (event:SelectChangeEvent<string> ) => {
const name = event.target.value; 
dispatch(setSelectedName(name));
const namecompare =  Userdata.find((u)=>u.name===name);
if(namecompare){
dispatch(setFormData({
    invoiceNumber: namecompare?.invoiceNumber, 
  mobile: namecompare?.mobile,
  address: namecompare?.address,
  date: namecompare?.date,
  gender: namecompare?.gender,
  age: namecompare?.age
}))
}else{

  dispatch(setFormData({
    invoiceNumber: '', 
  mobile: '',
  address: '',
  date: '',
  gender: '',
  age: ''
}))
}

};



const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  dispatch(updateFormField({ field: name as keyof typeof formData, value  }));
};


const handleAddItem = () => {

};

  return (
    <div className="App" >

      


      <Container maxWidth="lg" sx={{ bgcolor: 'grey.50', py: 4, borderRadius: 2 , border: '2px solid #ccc'}}>
    <h1>Invoice Form</h1>


{/* TODO: Replace with actual Dropdown import if available */}
 <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Name"
          value={selectedName}
         onChange={handledropdown}
          
          
        >

          <MenuItem value='Person 1'>ACC</MenuItem>
          <MenuItem value='Person 2'>ABB</MenuItem>
          <MenuItem value='Person 3'>ADD</MenuItem>
        </Select>
      </FormControl>
      <TextField
      name="invoiceNumber"
        id="outlined-basic"
        label="Invoice Number"
        variant="outlined"
        sx={{ m: 1, minWidth: 120 }}
         value={formData.invoiceNumber}
  onChange={handleTextChange}
      />
      
      <TextField
        id="outlined-basic"
        label="Mobile Number"
        variant="outlined"
        sx={{ m: 1, minWidth: 120 }}
      value={formData.mobile}
      />
      <TextField
        id="outlined-basic"
        label="Address"
        variant="outlined"
        sx={{ m: 1, minWidth: 120 }}
        value={formData.address}
      />
      <TextField
        id="outlined-basic"
        label="Date"
        variant="outlined"
        sx={{ m: 1, minWidth: 120 }}
      />
      <TextField
        id="outlined-basic"
        label="Gender"
        variant="outlined"
        sx={{ m: 1, minWidth: 120 }}
      />
      <TextField
        id="outlined-basic"
        label="Age"
        variant="outlined"
        sx={{ m: 1, minWidth: 120 }}
      />
      </Container>


      

          <Container
      maxWidth="lg"
      sx={{
        bgcolor: 'grey.200',
        py: 4,
        borderRadius: 2,
        border: '2px solid #ccc',
        height: '50vh',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Items Selected Table
      </Typography>

      <Table sx={{ border: '1px solid #ccc' }}>
        <TableHead>
          <TableRow> 
            <TableCell><strong>Item</strong></TableCell>
            <TableCell><strong>Quantity</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
                        <TableCell><strong>Total Price</strong></TableCell>
                                    <TableCell><strong>GST (18%)</strong></TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell><TextField id="outlined-basic" label="Item 1" variant="outlined" size='small' sx={{ m: 1, Width: 50 }} /></TableCell>
            <TableCell><TextField id="outlined-basic" label="Quantity 1" variant="outlined" size='small' sx={{ m: 1, Width: 50 }} /></TableCell>
            <TableCell><TextField id="outlined-basic" label="Price 1" variant="outlined" size='small' sx={{ m: 1, Width: 50 }} /></TableCell>
            <TableCell></TableCell>
            <TableCell><Button variant="contained" onClick={handleAddItem} color="primary">Add Item </Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item 2</TableCell>
            <TableCell>Quantity 2</TableCell>
            <TableCell>Price 2</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Gst</TableCell>
          </TableRow>
        
          <TextField
        id="outlined-basic"
        label="Total with GST"
        variant="outlined"
        size='small'
        sx={{ m: 1, mt: 2, transform: 'translateX(320%)', minWidth: 50,height: 50, width: 150 
         }}
      />
        </TableBody>
      </Table>
    </Container>

    <Box fontSize={60} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 ,mr: 40 }}>
      <Button size='large' variant="contained" color="primary">
        
        Submit

      </Button>
    </Box>
    
  </div>
  )
}

export default Taxtxt


// import Button from '@mui/material/Button';
// import { Container, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, Box } from '@mui/material';
// import { type SelectChangeEvent } from '@mui/material/Select'; // Use SelectChangeEvent
// import { useAppDispatch, useAppSelector } from './app/hooks';
// import { setSelectedName, setFormData, updateFormField } from './app/slices/nvoicefiels'; // Fixed import
// import usersData from './data/user.json'; // Fixed to users.json
// import './App.css';

// function App() {
//   const dispatch = useAppDispatch();
//   const { selectedName, formData } = useAppSelector((state) => state.invoiceFields); // Fixed state key

//   // Handle name selection and auto-fill
//   const handleNameChange = (event: SelectChangeEvent<string>) => {
//     const name = event.target.value as string;
//     dispatch(setSelectedName(name));
//     const user = usersData.find((u) => u.name === name);
//     if (user) {
//       dispatch(setFormData({
//         invoiceNumber: user.invoiceNumber,
//         mobile: user.mobile,
//         address: user.address,
//         date: user.date,
//         gender: user.gender,
//         age: user.age,
//       }));
//     } else {
//       dispatch(setFormData({
//         invoiceNumber: '',
//         mobile: '',
//         address: '',
//         date: '',
//         gender: '',
//         age: '',
//       }));
//     }
//   };

//   // Handle form field changes
//   const handleFieldChange = (field: keyof typeof formData, value: string) => {
//     dispatch(updateFormField({ field, value }));
//   };

//   return (
//     <div className="App">
//       <Container maxWidth="lg" sx={{ bgcolor: 'grey.50', py: 4, borderRadius: 2, border: '2px solid #ccc' }}>
//         <h1>Invoice Form</h1>

//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel id="demo-simple-select-label">Name</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={selectedName}
//             label="Name"
//             onChange={handleNameChange}
//           >
//             <MenuItem value=""><em>None</em></MenuItem>
//             <MenuItem value="ACC">ACC</MenuItem>
//             <MenuItem value="ABB">ABB</MenuItem>
//             <MenuItem value="ADD">ADD</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           id="outlined-basic"
//           label="Invoice Number"
//           variant="outlined"
//           sx={{ m: 1, minWidth: 120 }}
//           value={formData.invoiceNumber}
//           onChange={(e) => handleFieldChange('invoiceNumber', e.target.value)}
//         />
//         <TextField
//           id="outlined-basic"
//           label="Mobile Number"
//           variant="outlined"
//           sx={{ m: 1, minWidth: 120 }}
//           value={formData.mobile}
//           onChange={(e) => handleFieldChange('mobile', e.target.value)}
//         />
//         <TextField
//           id="outlined-basic"
//           label="Address"
//           variant="outlined"
//           sx={{ m: 1, minWidth: 120 }}
//           value={formData.address}
//           onChange={(e) => handleFieldChange('address', e.target.value)}
//         />
//         <TextField
//           id="outlined-basic"
//           label="Date"
//           variant="outlined"
//           sx={{ m: 1, minWidth: 120 }}
//           value={formData.date}
//           onChange={(e) => handleFieldChange('date', e.target.value)}
//         />
//         <TextField
//           id="outlined-basic"
//           label="Gender"
//           variant="outlined"
//           sx={{ m: 1, minWidth: 120 }}
//           value={formData.gender}
//           onChange={(e) => handleFieldChange('gender', e.target.value)}
//         />
//         <TextField
//           id="outlined-basic"
//           label="Age"
//           variant="outlined"
//           sx={{ m: 1, minWidth: 120 }}
//           value={formData.age}
//           onChange={(e) => handleFieldChange('age', e.target.value)}
//         />
//       </Container>

//       <Container
//         maxWidth="lg"
//         sx={{
//           bgcolor: 'grey.200',
//           py: 4,
//           borderRadius: 2,
//           border: '2px solid #ccc',
//           height: '50vh',
//           overflow: 'hidden',
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Items Selected Table
//         </Typography>

//         <Table sx={{ border: '1px solid #ccc' }}>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Item</strong></TableCell>
//               <TableCell><strong>Quantity</strong></TableCell>
//               <TableCell><strong>Price</strong></TableCell>
//               <TableCell><strong>Total Price</strong></TableCell>
//               <TableCell><strong>GST (18%)</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell>Item 1</TableCell>
//               <TableCell>Quantity 1</TableCell>
//               <TableCell>Price 1</TableCell>
//               <TableCell>Total</TableCell>
//               <TableCell>Gst</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>Item 2</TableCell>
//               <TableCell>Quantity 2</TableCell>
//               <TableCell>Price 2</TableCell>
//               <TableCell>Total</TableCell>
//               <TableCell>Gst</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>Item 3</TableCell>
//               <TableCell>Quantity 3</TableCell>
//               <TableCell>Price 3</TableCell>
//               <TableCell>Total</TableCell>
//               <TableCell>Gst</TableCell>
//             </TableRow>
//             <TextField
//               id="outlined-basic"
//               label="Total with GST"
//               variant="outlined"
//               size="small"
//               sx={{ m: 1, mt: 2, transform: 'translateX(320%)', minWidth: 50, height: 50, width: 150 }}
//             />
//           </TableBody>
//         </Table>
//       </Container>

//       <Box fontSize={60} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 40 }}>
//         <Button size="large" variant="contained" color="primary">
//           Submit
//         </Button>
//       </Box>
//     </div>
//   );
// }

// export default App;