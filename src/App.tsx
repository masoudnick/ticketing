import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthMiddleware, GuestMiddleware } from './routes/AuthMiddleware';
import { Dashboard, SignIn, SignUp, Cartabl, Packages, Basics, Users, Profile } from '@/pages';
import './App.css'
import "./styles/tailwind.css";
import "./styles/index.scss";



const router = createBrowserRouter([
  {
    element: <AuthMiddleware />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        handle: { title: "داشبورد" }
      },
      {
        path: "tickets",
        children: [
          {
            path: "cartabl",
            element: <Cartabl />,
            handle: { title: "کارتابل وظایف" }
          },
          {
            path: "packages",
            element: <Packages />,
            handle: { title: "بسته‌های پشتیبانی" }
          },
        ]
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
      {
        path: "settings",
        children: [
          {
            path: "basics",
            element: <Basics />,
            handle: { title: "اطلاعات پایه" }
          },
          {
            path: "users",
            element: <Users />,
            handle: { title: "" }
          },
        ]
      }
    ]
  },
  {
    element: <GuestMiddleware />,
    children: [
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  }
])



function App() {


  return (
    <RadixDirectionProvider dir="rtl">
        <RouterProvider router={router}></RouterProvider>
    </RadixDirectionProvider>
  )
}

export default App
