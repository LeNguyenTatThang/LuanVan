/* eslint-disable react/jsx-pascal-case */

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
import Authur from './view/Authur';
import Profile from './view/Profile';
import Review from './view/Review';
import AddProduct from './view/AddProduct';
import CustomerCard from './view/CustomerCard';
import Detail_book from './view/Detail_book';
import Manager from './view/Manager';
import Chat from './view/Chat';
import DetailChapter from './view/DetailChapter';
import RegistrationSuccess from './view/Accept';
import ReadBook from './view/ReadBook';
import Blog from './Blog';



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
        <Route path="/blogs" element={<div className="p-4 sm:ml-64"> <Blog /> </div>} />
        <Route path="/authur" element={<div className="p-4 sm:ml-64"><Authur /> </div>} />
        <Route path="/review" element={<div className="p-4 sm:ml-64"><Review /> </div>} />
        <Route path="/chat" element={<div className="p-4 sm:ml-64"> <Chat /> </div>} />
        <Route path="/signup" element={<div className="p-4 sm:ml-64"> <Register /> </div>} />
        <Route path="/add-book" element={<div className="p-4 sm:ml-64"> <AddProduct /> </div>} />
        <Route path="/customer-card" element={<div className="p-4 sm:ml-64"> <CustomerCard /> </div>} />
        <Route path="/detail-book/:id" element={<div className="p-4 sm:ml-64"> <Detail_book /> </div>} />
        <Route path="/manager-book" element={<div className="p-4 sm:ml-64"> <Manager /> </div>} />
        <Route path="/read-book" element={<div className="p-4 sm:ml-64"> <ReadBook /> </div>} />
        <Route path="/create-account-ok/:id" element={<div className="p-4 sm:ml-64"> <RegistrationSuccess /> </div>} />
        <Route path="/detailchapter" element={<div className="p-4 sm:ml-64"> <DetailChapter /> </div>} />
        <Route path="*" element={<div className="p-4 sm:ml-64"><Page404 /></div>} />
      </Routes>
      <div className="p-4 sm:ml-64"> <Footer /> </div>
    </Router>
  );
}

export default App;
