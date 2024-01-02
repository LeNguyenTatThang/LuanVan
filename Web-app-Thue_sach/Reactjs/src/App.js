/* eslint-disable react/jsx-pascal-case */

import './App.css';
import Footer from './view/Footer';
import HomePage from './view/HomePage';
import Login from './view/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Blog from './view/Blog';
import PostChapter from './view/PostChapter';
import Menu from './view/Menu';
import Logout from './view/Logout';
function App() {
  return (
    <Router >
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/profiles" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/post-chapter/:itemId" element={<PostChapter />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/authur" element={<Authur />} />
        <Route path="/review" element={<Review />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/add-book" element={<AddProduct />} />
        <Route path="/customer-card" element={<CustomerCard />} />
        <Route path="/detail-book/:id" element={<Detail_book />} />
        <Route path="/manager-book" element={<Manager />} />
        <Route path="/read-book" element={<ReadBook />} />
        <Route path="/create-account-ok/:id" element={<RegistrationSuccess />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/detailchapter/:sach_id/:chuong"
          element={

            <DetailChapter />

          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
