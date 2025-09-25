import './minimalist.css';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './provider/ThemeProvider';
import AuthProvider from './provider/AuthProvider';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './lib/axios-config.js';
import CartProvider from './provider/CartProvider';
import ErrorBoundary from './components/errorUI/ErrorBoundary';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
