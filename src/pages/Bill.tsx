import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Item, FormData } from "../app/slices/nvoicefiels";

interface BillsProps {
  listItems: Item[];
  formData: FormData;
  grandtotal: number;
}

const Bill = () => {
  const [localdata, setLocaldata] = useState<Record<string, BillsProps>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = localStorage.getItem("bills");
    console.log("hello", fetchData);
    if (fetchData != null) {
      const datalocal = JSON.parse(fetchData);
      setLocaldata(datalocal);
    }
  }, []);

  const handledelete = (localidkey: string) => {
    const deleteitem = { ...localdata };
    delete deleteitem[localidkey];
    localStorage.setItem("bills", JSON.stringify(deleteitem));
    setLocaldata(deleteitem);
  };

  const handleToggleItems = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <div>
      <Table sx={{ border: "0.5px solid black", width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Invoice Number</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Mobile</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Address</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Date</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Gender</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Age</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>All Items List</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Grand Total</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Action</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(localdata).map(
            ([key, value]: [string, BillsProps]) => (
              <>
                <TableRow key={key}>
    
                  <TableCell>{value.formData.invoiceNumber}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {value.formData.mobile}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {value.formData.address}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {value.formData.date}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {value.formData.gender}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {value.formData.age}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={() => handleToggleItems(key)}>
                      {openDropdown === key ? "Hide Items" : "View Items"}
                    </Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <strong>{value.grandtotal}</strong>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={() => handledelete(key)}>Delete</Button>
                  </TableCell>
                </TableRow>
                {openDropdown === key && (
                  <TableRow>
                    <TableCell colSpan={9} sx={{ padding: 0 }}>
                      <Table
                        sx={{ border: "1px solid #e0e0e0", margin: "10px 0" }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <strong>Item Name</strong>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <strong>Price</strong>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <strong>Quantity</strong>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {" "}
                              Total
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <strong>GST</strong>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {value.listItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                {Number(item.price).toFixed(2)}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                {Number(item.quantity).toFixed(2)}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                {(
                                  Number(item.price) * Number(item.quantity)
                                ).toFixed(2)}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                {Number(item.gst).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Bill;

