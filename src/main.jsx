import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import App from './App.jsx'
import './index.css'
import theme from './theme.js';
import {Home,Movies,Shows,Search,Watchlist, DetailPage} from './pages/index.js'
import Protected from './components/routes/Protected.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/movies',
        element:<Movies/>
      },
      {
        path:'/shows',
        element:<Shows/>
      },
      {
        path:'/search',
        element:<Search/>
      },
      {
        path:'/:type/:id',
        element:<DetailPage/>
      },
      {
        
        path: "/watchlist",
        element: (
          <Protected>
            <Watchlist />
          </Protected>
            
        )
      },
      
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
