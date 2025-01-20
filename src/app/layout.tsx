'use client'
import React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Navbar from './_component/navbar/page';
import { Provider } from 'react-redux'
import { store } from './../lib/redux/store';
import { Toaster } from 'react-hot-toast';


export default function RootLayout({ children }: RootLayoutProps) {
  return <>
  <html>
    <head>

    </head>
    <body>
      <Provider store={store}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
      <Navbar/>
      <Toaster/>
      {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
      </Provider>
    </body>
  </html>
  
  </>
}
