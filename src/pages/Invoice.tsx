import Button from "@mui/material/Button";
import "../App.css"
import { type Item } from "../app/slices/nvoicefiels";
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
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import {
  setSelectedName,
  setFormData,
  updatetotalbill,
} from "../app/slices/nvoicefiels";
import { useEffect, useState } from "react";
import UpperBox from "../components/UpperBox";

function Invoicepage() {
  const dispatch = useDispatch();
  const { selectedName, formData } = useAppSelector(
    (state) => state.invoiceFields
  );



  const [items, setItems] = useState({
    itemame: "",
    price: "",
    quantity: "",
    gst: "",     
  });

  useEffect(() => {
    if (items.price && items.quantity) {
      const calculatedGst = Number(items.price) * Number(items.quantity) * 0.18;
      setItems((prev) => ({ ...prev, gst: calculatedGst.toFixed(2) }));
    } else {
      setItems((prev) => ({ ...prev, gst: "" }));
    }
  }, [items.price, items.quantity]);

  const [listItems, setListItems] = useState<Item[]>([]);

  const handleItemsaveinrow = (field: keyof typeof items, value: string) => {
    setItems({ ...items, [field]: value });
  };


  //wheneven we want to  make changes in json object we use [] for keys

  const handleAddItem = () => {
    if (items.itemame && items.price && items.quantity) {
      setListItems([
        ...listItems,
        {
          id: listItems.length + 1, 
          name: items.itemame,
          quantity: Number(items.quantity),
          price: Number(items.price),
          gst:
            Number(items.gst) ||
            Number(items.price) * Number(items.quantity) * 0.18,
        },
      ]);
    }
    console.log(listItems);

    setItems({
      itemame: "",  price: "", quantity: "", gst: "",
    });
  
  };

  const grandtotal = listItems.reduce(
    (acc, item) =>
      acc + Number(item.price) * Number(item.quantity) + Number(item.gst),
    0
  );

  const total = listItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  useEffect(() => {
    dispatch(updatetotalbill(grandtotal.toString()));
  }, [grandtotal, dispatch]);
  // 1.18 also

  const handleSubmit = () => {
    if ( selectedName && listItems.length && formData.address && formData.date && formData.gender && formData.age &&formData.invoiceNumber &&formData.mobile && grandtotal > 0
    ) {
      let existingBills;

      try {
        const stored = JSON.parse(localStorage.getItem("bills") || "[]");
        existingBills = Array.isArray(stored) ? stored : [];
      } catch (error) {
        existingBills = [];
        console.log(error); 
      }

      const newBill = { listItems, formData, grandtotal };

      localStorage.setItem(
        "bills",
        JSON.stringify([...existingBills, newBill])
      );
      setListItems([]);
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

      console.log("Saved Bill:", newBill);
      dispatch(setSelectedName(""));
    } else {
      console.log("Please select a user and add at least one item.");
    }
  };

  const handleDelete = (itemid: string | number) => {
    setListItems(() => {
      return listItems.filter((wachan) => wachan.id != itemid);
    });
  };

  const handleItemChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number) => {
    const field = event.target.name;
    const value = event.target.value;

    setListItems((currentavalable) => {
      const newitem = [...currentavalable];
      const innerarrayvalue = { ...newitem[index] };

      // if(field === "itemame") {
      // if (value === "") {items.itemame = "";
      //   } else {
      //     items.itemame = value;
      //   }
      // }
      if (field === "price") {
      if (value === "") {items.price = "";
        } else {
          innerarrayvalue.price = value;
        }
      }
      if (field === "quantity") {
      if (value === "") {innerarrayvalue.quantity = "";
        } else { innerarrayvalue.quantity = Number(value);
        }
      }
      if (field === "gst") {
        if (value === "") { innerarrayvalue.gst = ""; } 
        else {innerarrayvalue.gst = Number(value);
        }
      }
      newitem[index] = innerarrayvalue;
      return newitem;
    });
  };


  return (
    <div className="App">
      <UpperBox />
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={item.name}
                    name="name"
                    onChange={(e) => handleItemChange(e, index)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={item.quantity}
                    name="quantity"
                    type="number"
                    onChange={(e) => handleItemChange(e, index)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={item.price}
                    name="price"
                    type="number"
                    onChange={(e) => handleItemChange(e, index)}
                  />
                </TableCell>
                <TableCell>
                  {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={item.gst}
                    name="gst"
                    type="number"
                    onChange={(e) => handleItemChange(e, index)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="itemame-label">Item Name</InputLabel>
                  <Select
                    labelId="itemame-label"
                    id="itemame"
                    name="itemame"
                    value={items.itemame} 
                    label="Item Name"
                    onChange={(event) =>
                      handleItemsaveinrow("itemame", event.target.value)
                    }
                  >
                    <MenuItem value="Item 1">Item 1</MenuItem>
                    <MenuItem value="Item 2">Item 2</MenuItem>
                    <MenuItem value="Item 3">Item 3</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="Quantity "
                  variant="outlined"
                  size="small"
                  sx={{ m: 1, Width: 50 }}
                  value={items.quantity}
                  onChange={(event) =>
                    handleItemsaveinrow("quantity", event.target.value)
                  }
                  type="number"
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="Price "
                  variant="outlined"
                  size="small"
                  sx={{ m: 1, Width: 50 }}
                  value={items.price}
                  onChange={(event) =>
                    handleItemsaveinrow("price", event.target.value)
                  }
                  type="number"
                />
              </TableCell>

              <TableCell>
                {(Number(items.price) * Number(items.quantity)).toFixed(2)}
              </TableCell>
              <TableCell>
                <TextField
                  label="GST"
                  value={items.gst}
                  onChange={(event) =>
                    handleItemsaveinrow("gst", event.target.value)
                  }
                  type="number"
                />
              </TableCell>

              <TableCell>
                <Button
                  variant="contained"
                  onClick={handleAddItem}
                  color="primary"
                  size="small"
                  sx={{ m: 1, height: "40px", width: "100px" }}
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
          sx={{
            transform: "translateX(400px)",
            width: "120px",
            marginTop: "20px",
          }}
          value={grandtotal}
        />

        <TextField
          id="outlined-basic"
          label="Total without GST"
          variant="outlined"
          size="small"
          sx={{
            transform: "translateX(80px)",
            width: "120px",
            marginTop: "20px",
          }}
          value={total}
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

export default Invoicepage;
