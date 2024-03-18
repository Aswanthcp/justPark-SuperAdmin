import { useSelector } from "react-redux";
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import User from "./pages/user/User";
import UserDetailsPage from "./pages/user/UserDetailsPage";
import PlacePage from "./pages/Place/PlacePage";
import PlaceCreatePage from "./pages/Place/PlaceCreatePage";
import PlaceDetailsPage from "./pages/Place/PlaceDetailsPage";
import SlotPage from "./pages/slot/SlotPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReservationPage from "./pages/reservations/ReservationPage";

function App() {
  const token = useSelector((state) => state.token);
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/place"
          element={
            <ProtectedRoute>
              <PlacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/place/add/"
          element={
            <ProtectedRoute>
              <PlaceCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/place/:id"
          element={
            <ProtectedRoute>
              <PlaceDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/slot/"
          element={
            <ProtectedRoute>
              <SlotPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations/"
          element={
            <ProtectedRoute>
              <ReservationPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
