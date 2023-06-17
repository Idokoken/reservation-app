import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AcountPage";
import SharedProfileLayout from "./pages/SharedProfileLayout";
import PlacesPage from "./pages/PlacesPage";
import BookingsPage from "./pages/BookingsPage";
import Layout from "./Layout";
import AddNewPlaces from "./pages/AddNewPlaces";
import { UserContext } from "./context/userContext";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route Index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/account" element={<SharedProfileLayout />}>
            <Route index element={<AccountPage />} />
            <Route path="places" element={<PlacesPage />} />
            <Route path="bookings" element={<BookingsPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route
              path="/account/places/new"
              element={<AddNewPlaces />}
            ></Route>
            <Route
              path="/account/places/new/:id"
              element={<AddNewPlaces />}
            ></Route>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
