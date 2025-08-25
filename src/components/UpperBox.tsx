import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import {
  setFormData,
  setSelectedName,
  // updateFormField,
} from "../app/slices/nvoicefiels";
import Userdata from "../data/user.json";
import { Link } from "react-router-dom";

const UpperBox = () => {
  const dispatch = useDispatch();
  const { selectedName, formData } = useAppSelector(
    (state) => state.invoiceFields
  );

  

  const handledropdownautofill = (newvalue:string | null) => {
if(newvalue){
   const datafromjson = Userdata.find((u)=> u.name === newvalue);
    if(datafromjson){
      dispatch(setSelectedName(newvalue));


     

      dispatch(setFormData({
        invoiceNumber: datafromjson?.invoiceNumber,
            mobile: datafromjson?.mobile,
            address: datafromjson?.address,
            date: datafromjson?.date,
            gender: datafromjson?.gender,
            age: datafromjson?.age,
      }))
    

    }else{
       dispatch(setFormData({
          invoiceNumber: "",
            mobile: "",
            address: "",
            date: "",
            gender: "",
            age: "",
      }))
    }
}
   
    
  };

const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  dispatch(setFormData({ [name]: value }));
};


  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "grey.50",
          py: 3,
          borderRadius: 2,
          border: "2px solid #ccc",
          mb: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Invoice Form
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Name"
          value={selectedName}
          onChange={handledropdownautofill}
        >

          {Userdata.map((user)=>( <MenuItem  value={user.name} > {user.name} </MenuItem>))}

          
        </Select> */}
        
              <Autocomplete
              
                disablePortal
                id="combo-box-demo"
                options={Userdata.map((user) => user.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Name" />}
                value={selectedName}
                onChange={(_, newvalue) => handledropdownautofill(newvalue)}
              />
            </FormControl>
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }}>
            <TextField
              name="invoiceNumber"
              id="outlined-basic"
              label="Invoice Number"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.invoiceNumber}
              onChange={handleTextChange}
            />
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }}>
            <TextField
              id="outlined-basic"
              name="mobile"
              type="number"
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={formData.mobile}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  handleTextChange(e);
                }
              }}
              inputProps={{ maxLength: 10 }}
            />
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }}>
            <TextField
              id="outlined-basic"
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              value={formData.address}
              onChange={handleTextChange}
            />
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }}>
            <TextField
              name="date"
              id="outlined-basic"
              label="Date"
              variant="outlined"
              fullWidth
              value={formData.date}
              onChange={handleTextChange}
            />
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 22%", md: "1 1 15%" } }}>
            <TextField
              name="gender"
              id="outlined-basic"
              label="Gender"
              variant="outlined"
              fullWidth
              value={formData.gender}
              onChange={handleTextChange}
            />
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 22%", md: "1 1 15%" } }}>
            <TextField
              name="age"
              id="outlined-basic"
              label="Age"
              variant="outlined"
              fullWidth
              value={formData.age}
              onChange={handleTextChange}
              type="number"
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>
          <Box
            sx={{
              flex: "1 1 100%",
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button
              component={Link}
              to="/bill"
              variant="contained"
              color="primary"
            >
              Go To Bill Data
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default UpperBox;
