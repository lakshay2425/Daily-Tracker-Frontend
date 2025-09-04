import Home from "./pages/Home.jsx"
import DailyEntryForm from "./pages/Form.jsx"
import LoginPage from "./pages/Login.jsx"
import Navbar from "./components/Navbar.jsx"

import {  Routes, Route } from "react-router-dom"
import RenderProtectedRoutes from "./utilis/renderProtectedRoute.jsx"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext.jsx"

function App() {
  const {isAuthenticated, isLoading} = useContext(AuthContext);
  return (
    <>
    <Navbar/>
     <Routes>
      <Route path="/" element={
        <RenderProtectedRoutes
      condition={
        isAuthenticated === false
      }
      renderPage={<LoginPage/>}
      errorMessage="You are already loggedIn"
        devMode={import.meta.env.VITE_DEV_MODE == "true"}
        fallback="/home"
        isLoading={isLoading}
      />}/>

     <Route path="/home" element={
       <RenderProtectedRoutes
      condition={isAuthenticated === true}
      renderPage={<Home/>}
      errorMessage="You cannot access it Login first."
        devMode={import.meta.env.VITE_DEV_MODE == "true"}
        fallback="/"
        isLoading={isLoading}
      />
      }/>

     <Route path="/form" element={
      <RenderProtectedRoutes
      condition={isAuthenticated === true}
      renderPage={<DailyEntryForm/>}
      isLoading={isLoading}
      errorMessage="You cannot access it.Login first."
        devMode={import.meta.env.VITE_DEV_MODE == "true"}
        fallback="/"
      />
     }/>
     </Routes>
    </>
  )
}

export default App
