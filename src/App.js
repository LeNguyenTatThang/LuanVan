
import './App.css';
import Footer from './view/Footer';
import HomePage from './view/HomePage';
import Login from './view/Login';
import Navbar from './view/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from './view/Search';
import Page404 from './view/Page404';
import Product from './view/Product';
import Register from './view/Register';




function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<div className="p-4 sm:ml-64"> <HomePage /> </div>} />
        <Route path="/products" element={<div className="p-4 sm:ml-64"> <Product /> </div>} />
        <Route path="/profiles" element={<div className="p-4 sm:ml-64">  </div>} />
        <Route path="/signin" element={<div className="p-4 sm:ml-64"><Login />  </div>} />
        <Route path="/search" element={<div className="p-4 sm:ml-64"> <Search /> </div>} />
        <Route path="/authur" element={<div className="p-4 sm:ml-64"> </div>} />
        <Route path="/signup" element={<div className="p-4 sm:ml-64"> <Register /> </div>} />
        <Route path="/testapi" element={<div className="p-4 sm:ml-64">  </div>} />
        <Route path="/add-book" element={<div className="p-4 sm:ml-64">  </div>} />
        <Route path="*" element={<div className="p-4 sm:ml-64"><Page404 /></div>} />
      </Routes>
      <div className="p-4 sm:ml-64"> <Footer /> </div>
    </Router>
  );
}

export default App;
