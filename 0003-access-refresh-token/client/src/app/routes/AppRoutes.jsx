import { createBrowserRouter, RouterProvider } from "react-router"
import RegisterPage from "../../features/auth/ui/pages/RegisterPage"
import ProfilePage from "../../features/auth/ui/pages/ProfilePage"
import App from "../../App"

const AppRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
        },
        {
            path: "/register",
            element: <RegisterPage/>,
        },
        {
            path: "/profile",
            element: <ProfilePage/>,
        }
    ])
  return <RouterProvider router={router} />
}

export default AppRoutes