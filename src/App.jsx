import Home from "./pages/Home.jsx"
import DailyEntryForm from "./pages/Form.jsx"
import LoginPage from "./pages/Login.jsx"
import Navbar from "./components/Navbar.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import RenderProtectedRoutes from "./utilis/renderProtectedRoute.jsx"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext.jsx"

function App() {
  const {isAuthenticated, isLoading} = useContext(AuthContext);
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={
        <RenderProtectedRoutes
      condition={
        isAuthenticated === false
      }
      renderPage={<><Navbar/><LoginPage/></>}
      errorMessage="You are already loggedIn"
        devMode={import.meta.env.VITE_DEV_MODE}
        fallback={<><Navbar/><Home/></>}
        isLoading={isLoading}
      />}/>

     <Route path="/home" element={
       <RenderProtectedRoutes
      condition={isAuthenticated}
      renderPage={<><Navbar/><Home/></>}
      errorMessage="You cannot access it Login first."
        devMode={import.meta.env.VITE_DEV_MODE}
        fallback={<LoginPage/>}
        isLoading={isLoading}
      />
      }/>

     <Route path="/form" element={
      <RenderProtectedRoutes
      condition={isAuthenticated}
      renderPage={<><Navbar/><DailyEntryForm/></>}
      isLoading={isLoading}
      errorMessage="You cannot access it Login first."
        devMode={import.meta.env.VITE_DEV_MODE}
        fallback={<LoginPage/>}
      />
     }/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
