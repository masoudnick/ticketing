import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout, AuthLayout } from './layouts';
import { Dashboard, SignIn, SignUp, Cartabl, Packages, Basics, Users } from '@/pages';
import './App.css'
import "./styles/tailwind.css";
import "./styles/index.scss";



const router = createBrowserRouter([
  {
    element: <MainLayout />,
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
    element: <AuthLayout />,
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
    // <>
    //   <Router>
    //     <Routes>

    //       <Route element={<MainLayout />}>
    //         <Route path="/" index element={<Dashboard />} handle={{ title: "داشبورد" }} />
    //         <Route path="tickets">
    //           <Route path="cartabl" element={<Cartabl />} handle={{ title: "کارتابل وظایف" }} />
    //           <Route path="packages" element={<Packages />} handle={{ title: "بسته‌های پشتیبانی" }} />
    //         </Route>
    //       </Route>

    //       <Route element={<AuthLayout />}>
    //         <Route path="/signin" element={<SignIn />} />
    //         <Route path="/signup" element={<SignUp />} />
    //       </Route>
    //     </Routes>
    //   </Router >
    // </>
  )
}

export default App
