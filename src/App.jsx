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
      renderPage={<><Navbar currentPath="/"/><LoginPage/></>}
      errorMessage="You are already loggedIn"
        devMode={import.meta.env.VITE_DEV_MODE}
        fallback="/home"
        isLoading={isLoading}
      />}/>

     <Route path="/home" element={
       <RenderProtectedRoutes
      condition={isAuthenticated}
      renderPage={<><Navbar currentPath="/home" /><Home/></>}
      errorMessage="You cannot access it Login first."
        devMode={import.meta.env.VITE_DEV_MODE}
        fallback="/"
        isLoading={isLoading}
      />
      }/>

     <Route path="/form" element={
      <RenderProtectedRoutes
      condition={isAuthenticated}
      renderPage={<><Navbar currentPath="/form"/><DailyEntryForm/></>}
      isLoading={isLoading}
      errorMessage="You cannot access it Login first."
        devMode={import.meta.env.VITE_DEV_MODE}
        fallback="/"
      />
     }/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
