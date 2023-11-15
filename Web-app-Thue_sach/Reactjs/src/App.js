
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
import TestIMG from './view/TestIMG';
import Authur from './view/Authur';
import Profile from './view/Profile';
import Review from './view/Review';
import AddProduct from './view/AddProduct';



function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<div className="p-4 sm:ml-64"> <HomePage /> </div>} />
        <Route path="/products" element={<div className="p-4 sm:ml-64"> <Product /> </div>} />
        <Route path="/profiles" element={<div className="p-4 sm:ml-64"><Profile />  </div>} />
        <Route path="/signin" element={<div className="p-4 sm:ml-64"><Login />  </div>} />
        <Route path="/search" element={<div className="p-4 sm:ml-64"> <Search /> </div>} />
        <Route path="/authur" element={<div className="p-4 sm:ml-64"><Authur /> </div>} />
        <Route path="/review" element={<div className="p-4 sm:ml-64"><Review /> </div>} />
        <Route path="/signup" element={<div className="p-4 sm:ml-64"> <Register /> </div>} />
        <Route path="/testimg" element={<div className="p-4 sm:ml-64"> <TestIMG /> </div>} />
        <Route path="/testapi" element={<div className="p-4 sm:ml-64">  </div>} />
        <Route path="/add-book" element={<div className="p-4 sm:ml-64"> <AddProduct /> </div>} />
        <Route path="*" element={<div className="p-4 sm:ml-64"><Page404 /></div>} />
      </Routes>
      <div className="p-4 sm:ml-64"> <Footer /> </div>
    </Router>
  );
}

export default App;
