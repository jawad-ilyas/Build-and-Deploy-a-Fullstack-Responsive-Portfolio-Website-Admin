import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Testimonial from './pages/testominal/Testominal.jsx';
import { Provider } from 'react-redux';
import { store } from './store/Store.js';
import { About } from './pages/index.js';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "testominal",
        element: <Testimonial />
      },
      {
        path : "about",
        element : <About />
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} >
      
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
