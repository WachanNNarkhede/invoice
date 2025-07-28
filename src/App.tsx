import Button from '@mui/material/Button';
import { Container, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, Box } from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setSelectedName, setFormData, updateFormField, resetItems, addItem } from './app/slices/nvoicefiels'; // Fixed import
import usersData from './data/user.json'; // Fixed to users.json
import './App.css';
import { Link } from 'react-router-dom';

// Interface for table items    
function App() {

  
  const dispatch = useAppDispatch();
  const { selectedName, formData, items } = useAppSelector((state) => state.invoiceFields);

  // State for new item input
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' });

  // Handle name selection and auto-fill form
  const handleNameChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.value as string;
    dispatch(setSelectedName(name));
    const user = usersData.find((u) => u.name === name);
    if (user) {
      dispatch(setFormData({  
        invoiceNumber: user.invoiceNumber,
        mobile: user.mobile,
        address: user.address,
        date: user.date,
        gender: user.gender,
        age: user.age,
      }));  
    } else {
      dispatch(setFormData({
        invoiceNumber: '',
        mobile: '',
        address: '',
        date: '',
        gender: '',
        age: '',
      }));
    }
  };

  // Handle form field changes
  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    dispatch(updateFormField({ field, value }));
  };

  // Handle new item input changes
  const handleNewItemChange = (field: keyof typeof newItem, value: string) => {
    setNewItem({ ...newItem, [field]: value });
  };

  // Add new item to table (via Redux)
  const addItemToTable = () => {
    if (newItem.name && newItem.quantity && newItem.price) {
      dispatch(addItem({
        id: items.length + 1,
        name: newItem.name,
        quantity: Number(newItem.quantity),
        price: Number(newItem.price),
      }));
      setNewItem({ name: '', quantity: '', price: '' }); // Reset inputs
    }
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const gst = subtotal * 0.18; // 18% GST
    return (subtotal + gst).toFixed(2);
  };

  // Handle submit
  const handleSubmit = () => {
    if (selectedName && items.length > 0) {
      // Get existing bills for the user from local storage
      const existingBills = JSON.parse(localStorage.getItem(`bills_${selectedName}`) || '[]');
      // Add new bill
      const newBill = {
        formData,
        items,
        grandTotal: calculateGrandTotal(),
        timestamp: new Date().toISOString(),
      };
      // Save to local storage
      localStorage.setItem(`bills_${selectedName}`, JSON.stringify([...existingBills, newBill]));
      // Log to console
      console.log('Saved Bill:', newBill);
      // Clear table
      dispatch(resetItems());
      setNewItem({ name: '', quantity: '', price: '' });
    } else {
      console.log('Please select a user and add at least one item.');
    }
  };

  return (
    <div className="App">
      <Container maxWidth="lg" sx={{ bgcolor: 'grey.50', py: 4, borderRadius: 2, border: '2px solid #ccc' }}>
        <h1>Invoice Form</h1>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedName}
            label="Name"
            onChange={handleNameChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Person 1">erson 1</MenuItem>
            <MenuItem value="Person 2">Person 2</MenuItem>
            <MenuItem value="Person 3">Person 3</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="outlined-basic"
          label="Invoice Number"
          variant="outlined"
          sx={{ m: 1, minWidth: 120 }}
          value={formData.invoiceNumber}
          onChange={(e) => handleFieldChange('invoiceNumber', e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Mobile Number"
          variant="outlined"
          sx={{ m: 1, minWidth: 120 }}
          value={formData.mobile}
          onChange={(e) => handleFieldChange('mobile', e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          sx={{ m: 1, minWidth: 120 }}
          value={formData.address}
          onChange={(e) => handleFieldChange('address', e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Date"
          variant="outlined"
          sx={{ m: 1, minWidth: 120 }}
          value={formData.date}
          onChange={(e) => handleFieldChange('date', e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Gender"
          variant="outlined"
          sx={{ m: 1, minWidth: 120 }}
          value={formData.gender}
          onChange={(e) => handleFieldChange('gender', e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Age"
          variant="outlined"
          sx={{ m: 1, minWidth: 120 }}
          value={formData.age}
          onChange={(e) => handleFieldChange('age', e.target.value)}
        />

        {selectedName && (
          <Button
            component={Link}
            to={`/bills/${selectedName}`}
            variant="outlined"
            sx={{ m: 1 }}
          >
            View Bills for {selectedName}
          </Button>
        )}
      </Container>

      <Container
        maxWidth="lg"
        sx={{
          bgcolor: 'grey.200',
          py: 4,
          borderRadius: 2,
          border: '2px solid #ccc',
          overflow: 'auto',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Items Selected Table
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            label="Item Name"
            variant="outlined"
            size="small"
            value={newItem.name}
            onChange={(e) => handleNewItemChange('name', e.target.value)}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            size="small"
            type="number"
            value={newItem.quantity}
            onChange={(e) => handleNewItemChange('quantity', e.target.value)}
            sx={{ minWidth: 100 }}
          />
          <TextField
            label="Price"
            variant="outlined"
            size="small"
            type="number"
            value={newItem.price}
            onChange={(e) => handleNewItemChange('price', e.target.value)}
            sx={{ minWidth: 100 }}
          />
          <Button variant="contained" onClick={addItemToTable}>
            Add Item
          </Button>
        </Box>

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
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{(item.quantity * item.price).toFixed(2)}</TableCell>
                <TableCell>{(item.quantity * item.price * 0.18).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {items.length > 0 && (
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <TextField
                    id="outlined-basic"
                    label="Total with GST"
                    variant="outlined"
                    size="small"
                    value={calculateGrandTotal()}
                    InputProps={{ readOnly: true }}
                    sx={{ m: 1, mt: 2, transform: 'translateX(320%)', minWidth: 50, width: 150 }}
                  />
                </TableCell>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>

      <Box fontSize={60} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 40 }}>
        <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default App;