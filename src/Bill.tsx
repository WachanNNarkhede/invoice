import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Item, FormData } from "./app/slices/nvoicefiels";
// import { useAppSelector } from "./app/hooks";


interface BillsProps {
  listItems: Item[];
  formData: FormData;
  grandtotal: number;
}

const TxtBill = () => {
 

  const [localdata, setLocaldata] = useState<Record<string, BillsProps>>({});
  useEffect(() => {
    const fecth = localStorage.getItem('bills');
     console.log('hello',fecth);
    if (fecth != null) {
      const datalocal = JSON.parse(fecth);
      setLocaldata(datalocal);
     
    }
   
  }, []);

 

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Invoice Number</strong>
            </TableCell>
            <TableCell>
              <strong>Mobile</strong>
            </TableCell>
            <TableCell>
              <strong>Address</strong>
            </TableCell>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell>
              <strong>Gender</strong>
            </TableCell>
            <TableCell>
              <strong>Age</strong>
            </TableCell>

            <TableCell>
              <strong>Grand Total</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          

          {Object.entries(localdata).map(
            ([key, value]: [string, BillsProps]) => (
              <TableRow key={key}>
                <TableCell>{value.formData.invoiceNumber}</TableCell>
                <TableCell>{value.formData.mobile}</TableCell>
                <TableCell>{value.formData.address}</TableCell>
                <TableCell>{value.formData.date}</TableCell>
                <TableCell>{value.formData.gender}</TableCell>
                <TableCell>{value.formData.age}</TableCell>
                <TableCell>
                  <strong>{value.grandtotal}</strong>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TxtBill;
