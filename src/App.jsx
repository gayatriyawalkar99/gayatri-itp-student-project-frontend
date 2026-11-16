import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import AdminRoute from './components/AdminRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import AddStudentForm from './Pages/AddStudentForm'
import EditStudentForm from './Pages/EditStudentForm.jsx'
import Home from './Pages/Home'
import Login from './Pages/Login.jsx'
import Navbar from './Pages/Navbar'
import Register from './Pages/Register.jsx'
import ShowStudents from './Pages/ShowStudents'
import ViewStudentForm from './Pages/ViewStudentForm.jsx'
function App() {


  return (
    <>

      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route path='/' element={<Home />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

             <Route path='/show' element={ <ProtectedRoute><ShowStudents /> </ProtectedRoute>} />
            <Route path='/view/:id' element={<ProtectedRoute> <ViewStudentForm /> </ProtectedRoute>} />

            <Route path='/add' element={<AdminRoute><AddStudentForm /> </AdminRoute>} />
            <Route path='/edit/:id' element={<AdminRoute><EditStudentForm /> </AdminRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        </BrowserRouter>
      </AuthProvider>

    </>
  )
}

export default App
