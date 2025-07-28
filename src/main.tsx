import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Bills from './Bill.tsx';
import Taxxt from './taxt.tsx'
import Taxtxt from './txtxtx.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/bills/:username" element={<Bills />} />
          <Route path="/taxt" element={<Taxxt />} />
          <Route path="/txtxt" element={<Taxtxt />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
