import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddPet from './components/AddPet';
import SearchResults from "./pages/SearchResults";
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import CategoryPage from './pages/CategoryPage';
import ManagePets from './pages/ManagePets';
import ManageUsers from './pages/ManageUsers';
import AdoptionRequests from './pages/AdoptionRequests';
import Analytics from './pages/Analytics';
import UserDashboard from './pages/UserDashboard';
import Favorites from './pages/Favorites';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import MyRequests from './pages/MyRequests';
import MyAdoptions from './pages/MyAdoptions';
import ChangePassword from './pages/ChangePassword';
import PetDetails from "./pages/PetDetails";
import EditPet from './pages/EditPet';
import About from './pages/About';
import Contact from './pages/Contact';
import ManageMessages from './pages/ManageMessages';
import PetCare from './pages/PetCare';
import VetBooking from './pages/VetBooking';
import ManageVetBookings from "./pages/ManageVetBookings";
import MyVetAppointments from "./pages/MyVetAppointments";
import Vets from "./pages/Vets";
import ManageVets from './components/ManageVets';
import AddVet from "./pages/AddVet";

function App() {
  return (
    <Router>
      <div className='app-container'>
      <Navbar />
      <div className='main-content'>
      <Routes>
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
               <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/add-pet"
          element={
            <AdminRoute>
              <AddPet />
            </AdminRoute>
          }
        />
        <Route
          path="/add-vet"
          element={
            <AdminRoute>
              <AddVet />
            </AdminRoute>
          }
        />
        <Route 
          path='/edit-pet/:id'
          element={
            <AdminRoute>
              <EditPet />
            </AdminRoute>
          }
        />
        <Route
          path="/manage-vet-bookings"
          element={
            <AdminRoute>
              <ManageVetBookings />
            </AdminRoute>
          }
        />
        <Route
          path="/category/:type"
          element={<CategoryPage />}
        />
        <Route
          path="/manage-pets"
          element={<ManagePets />}
        />
        <Route
          path="/manage-users"
          element={<ManageUsers />}
        />
        <Route
          path="/manage-vets"
          element={
              <ManageVets />
          }
        />
        <Route
          path="/adoption-requests"
          element={<AdoptionRequests />}
        />
        <Route
          path="/manage-messages"
          element={
              <ManageMessages />
          }
        />
        <Route
          path="/analytics"
          element={<Analytics />}
        />
        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />
        <Route
          path="/favorites"
          element={<Favorites />}
        />
        <Route
          path="/pet-care"
          element={<PetCare />}
        />
        <Route
          path="/vets"
          element={<Vets />}
        />
        <Route
          path="/vet-booking"
          element={<VetBooking />}
        />
        <Route
          path="/my-requests"
          element={<MyRequests />}
        />
        <Route
          path="/my-vet-appointments"
          element={<MyVetAppointments />}
        />
        <Route
          path="/my-adoptions"
          element={<MyAdoptions />}
        />
        <Route
          path="/notifications"
          element={<Notifications />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/search-results"
          element={<SearchResults />}
        />
        <Route
          path="/pet/:id"
          element={<PetDetails />}
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
      </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;