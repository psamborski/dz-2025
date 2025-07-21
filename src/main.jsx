import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWrapper from './App.jsx'
import {ErrorBoundary} from "./components/Helpers/ErrorBoundary.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppWrapper />
    </ErrorBoundary>
  </StrictMode>,
)
