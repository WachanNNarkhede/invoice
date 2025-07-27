import { useParams, Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface FormData {
  invoiceNumber: string;
  mobile: string;
  address: string;
  date: string;
  gender: string;
  age: string;
}

interface Bill {
  formData: FormData;
  items: Item[];
  grandTotal: string;
  timestamp: string;
}

function Bills() {
  const { username } = useParams<{ username: string }>();
  const [bills, setBills] = useState<Bill[]>([]);

  // Load bills from local storage
  useEffect(() => {
    if (username) {
      const savedBills = JSON.parse(localStorage.getItem(`bills_${username}`) || '[]');
      setBills(savedBills);
    }
  }, [username]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bills for {username}
      </Typography>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
        Back to Form
      </Button>
      {bills.length === 0 ? (
        <Typography>No bills found for {username}.</Typography>
      ) : (
        <Table sx={{ border: '1px solid #ccc' }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Invoice Number</strong></TableCell>
              <TableCell><strong>Mobile</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Gender</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Items</strong></TableCell>
              <TableCell><strong>Grand Total</strong></TableCell>
              <TableCell><strong>Timestamp</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill, index) => (
              <TableRow key={index}>
                <TableCell>{bill.formData.invoiceNumber}</TableCell>
                <TableCell>{bill.formData.mobile}</TableCell>
                <TableCell>{bill.formData.address}</TableCell>
                <TableCell>{bill.formData.date}</TableCell>
                <TableCell>{bill.formData.gender}</TableCell>
                <TableCell>{bill.formData.age}</TableCell>
                <TableCell>
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
                      {bill.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{(item.quantity * item.price).toFixed(2)}</TableCell>
                          <TableCell>{(item.quantity * item.price * 0.18).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableCell>
                <TableCell>{bill.grandTotal}</TableCell>
                <TableCell>{new Date(bill.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}

export default Bills;