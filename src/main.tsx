import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Bill from './pages/Bill.tsx'
// import Invoicepage from './pages/Invoice.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/bill" element={<Bill />} />    
          {/* <Route path='/invoicepage'    element={<Invoicepage/>}  /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
