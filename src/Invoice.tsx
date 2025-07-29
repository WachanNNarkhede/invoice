import Button from "@mui/material/Button";
import "./App.css";
import { type Item } from "./app/slices/nvoicefiels";
import {
  Container,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  InputLabel,
  TextField,
  Box,
  type SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./app/hooks";
import {
  setSelectedName,
  setFormData,
  updateFormField,
  updatetotalbill,
} from "./app/slices/nvoicefiels";
import Userdata from "./data/user.json";
import { useEffect, useState } from "react";

function Taxtxt() {
  const dispatch = useDispatch();
  const { selectedName, formData } = useAppSelector(
    (state) => state.invoiceFields
  );

  const handledropdown = (event: SelectChangeEvent<string>) => {
    const name = event.target.value;
    dispatch(setSelectedName(name));
    const namecompare = Userdata.find((u) => u.name === name);
    if (namecompare) {
      dispatch(
        setFormData({
          invoiceNumber: namecompare?.invoiceNumber,
          mobile: namecompare?.mobile,
          address: namecompare?.address,
          date: namecompare?.date,
          gender: namecompare?.gender,
          age: namecompare?.age,
        })
      );
    } else {
      dispatch(
        setFormData({
          invoiceNumber: "",
          mobile: "",
          address: "",
          date: "",
          gender: "",
          age: "",
        })
      );
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(updateFormField({ field: name as keyof typeof formData, value }));
  };

  const [items, setItems] = useState({ itemame: "", price: "", quantity: "" });

  const [listItems, setListItems] = useState<Item[]>([]);

  const handleItemCHange = (field: keyof typeof items, value: string) => {
    setItems({ ...items, [field]: value });
  };

  //wheneven we want to  make changes in json object we use [] for keys

  const handleAddItem = () => {
    if (items.itemame && items.price && items.quantity) {
      setListItems([
        ...listItems,
        {
          id: listItems.length + 1, //table
          name: items.itemame,
          quantity: Number(items.quantity),
          price: Number(items.price),
        },
      ]);
    }
    console.log(listItems);

    setItems({ itemame: "", price: "", quantity: "" });
    //row
  };


  const grandtotal = listItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity * 0.18 + item.price * item.quantity,
    0
  );
useEffect(() => {
    dispatch(updatetotalbill(grandtotal.toString()));
  }, [grandtotal, dispatch]);
  // 1.18 also

  const handleSubmit = () => {
    if (selectedName && listItems.length > 0) {
      
      const existingBills = JSON.parse(
        localStorage.getItem('bills' ) || "[]"
      );

      localStorage.setItem(
        'bills' ,
        JSON.stringify([...existingBills, { listItems, formData, grandtotal }])
      );
       setListItems([]);
      console.log("Saved Bill:", { listItems, formData, grandtotal });
    } else {
      console.log("Please select a user and add at least one item.");
    }
  };
  return (
    <div className="App">
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "grey.50",
          py: 4,
          borderRadius: 2,
          border: "2px solid #ccc",
        }}
      >
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
            <MenuItem value="Person 1">ACC</MenuItem>
            <MenuItem value="Person 2">ABB</MenuItem>
            <MenuItem value="Person 3">ADD</MenuItem>
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
          onChange={handleTextChange}
        />
        <TextField
          id="outlined-basic"
          label="Date"
          variant="outlined"
          sx={{ m: 1, minWidth: 120 }}
          value={formData.date}
          onChange={handleTextChange}
        />
        <TextField
          id="outlined-basic"
          label="Gender"
          variant="outlined"
          sx={{ m: 1, minWidth: 120 }}
          value={formData.gender}
          onChange={handleTextChange}
        />
        <TextField
          id="outlined-basic"
          label="Age"
          variant="outlined"
          sx={{ m: 1, minWidth: 120 }}
          value={formData.age}
          onChange={handleTextChange}
        />
      </Container>

      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "grey.200",
          py: 4,
          borderRadius: 2,
          border: "2px solid #ccc",
          height: "50vh",
          overflow: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Items Selected Table
        </Typography>

        <Table sx={{ border: "1px solid #ccc", overflow: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Item</strong>
              </TableCell>
              <TableCell>
                <strong>Quantity</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Total Price</strong>
              </TableCell>
              <TableCell>
                <strong>GST (18%)</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((item) => (
              <TableRow>
                <TableCell >{item.name}</TableCell>
                <TableCell >{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price * item.quantity}</TableCell>
                <TableCell>{item.price * item.quantity * 0.18}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="Item 1"
                  variant="outlined"
                  size="small"
                  sx={{ m: 1, Width: 50 }}
                  onChange={(event) =>
                    handleItemCHange("itemame", event.target.value)
                  }
                  value={items.itemame}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="Quantity 1"
                  variant="outlined"
                  size="small"
                  sx={{ m: 1, Width: 50 }}
                  value={items.quantity}
                  onChange={(event) =>
                    handleItemCHange("quantity", event.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="Price 1"
                  variant="outlined"
                  size="small"
                  sx={{ m: 1, Width: 50 }}
                  value={items.price}
                  onChange={(event) =>
                    handleItemCHange("price", event.target.value)
                  }
                />
              </TableCell>

              <TableCell></TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={handleAddItem}
                  color="primary"
                >
                  Add Item
                </Button>
              </TableCell>
            </TableRow>

            {/*  we first have to access index for accessing name in json */}
            {/* to render array  in html we use .map  */}
          </TableBody>
        </Table>

        <TextField
          id="outlined-basic"
          label="Total with GST"
          variant="outlined"
          size="small"
          sx={{}}
          value={grandtotal}
        />
      </Container>

      <Box
        fontSize={60}
        sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 40 }}
      >
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default Taxtxt;