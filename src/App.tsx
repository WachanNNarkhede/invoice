
// import { useDispatch } from 'react-redux'
import './App.css'
// import { useAppSelector } from './app/hooks'
import Invoicepage from './pages/Invoice'
// import { updateCount } from './app/slices/nvoicefiels';
// import { Button } from '@mui/material';


function App() {
//   const dispatch = useDispatch();
// const{count}= useAppSelector((state)=>state.invoiceFields)

// const inc = ()=>{
// dispatch(updateCount(count +1))
// }
// const dec =()=>{
//   dispatch(updateCount(count > 0 ? count - 1 : 0))

    
// }

  return (
   <>
{/* <Button
onClick={inc}>
  inc
</Button>
<Button
onClick={dec}>
  dec
</Button>
<h1>{count}</h1> */}
   <Invoicepage />

   </>
  )
}

export default App
