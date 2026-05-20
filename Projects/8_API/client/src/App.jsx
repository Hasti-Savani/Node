import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dhashboard";
import AdminRoute from "./routes/AdminRoute ";
import AddProduct from "./pages/admin/AddProducts";
import EditProduct from "./pages/admin/EditProduct";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route
          path="/admin"
          element={
            <AdminRoute >
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;