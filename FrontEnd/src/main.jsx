
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { Toaster } from './components/ui/toaster.jsx';
import { TooltipProvider } from './components/ui/tooltip'; // Import TooltipProvider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <TooltipProvider> {/* Wrap the App inside TooltipProvider */}
        <App />
        <Toaster />
      </TooltipProvider>
    </Provider>
  </BrowserRouter>
);
