
import './App.css';
import HomeBook from './views/HomeBook';
import NoPage from './views/NoPage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from './views/Search';
import Product from './views/Product';
import Signin from './views/Signin';
import Authur from './views/Authur';
import SignUp from './views/SignUp';
import Footer from './views/Footer';
import Profile from './views/Profile';
import TestApi from './views/TestApi';
import { useState } from 'react';
import { useEffect } from 'react';
import { User } from './domain/index'
function App() {
  const [user, isUser] = useState < User > ({})


  const [userLogin, setUserLogin] = useState({})
  const tokenUser = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    if (tokenUser) {
      isUser(tokenUser)
    }
    // setUserLogin(tokenUser)
  }, [])
  // console.log(use)
  return (
    <>
      <Router>
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <Link to="/"><span className="ml-3">THUÊ SÁCH ONLINE</span></Link>
                </div>
              </li>
              <li>
                <Link to="/"><div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" viewBox="0 0 23 23" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Trang chủ</span>

                </div></Link>
              </li>
              <li>
                <Link to="/products"> <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 23 23">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Sản phẩm</span>

                </div></Link>
              </li>
              <li>
                <Link to="/search"><div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" viewBox="0 0 23 23" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Tìm kiếm</span>
                </div></Link>
              </li>
              <li>
                <Link to="/chats"><div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" width="24" height="24" viewBox="0 0 23 23" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />  <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3" />  <line x1="8" y1="9" x2="16" y2="9" />  <line x1="8" y1="13" x2="14" y2="13" /></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Chat</span>
                </div></Link>
              </li>
              <li>
                <Link to="/signin"><div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" viewBox="0 0 23 23" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {user ? <> <span className="flex-1 ml-3 whitespace-nowrap">{user?.name}</span></> : <>  <span className="flex-1 ml-3 whitespace-nowrap">Tài khoản </span></>}

                </div></Link>
              </li>
            </ul>
          </div>
        </aside >

        <Routes>
          <Route path="/" element={<div className="p-4 sm:ml-64"> <HomeBook /> </div>} />
          <Route path="/products" element={<div className="p-4 sm:ml-64"> <Product /> </div>} />
          <Route path="/profiles" element={<div className="p-4 sm:ml-64"> <Profile /> </div>} />
          <Route path="/signin" element={<div className="p-4 sm:ml-64"> <Signin /> </div>} />
          <Route path="/search" element={<div className="p-4 sm:ml-64"> <Search /> </div>} />
          <Route path="/authur" element={<div className="p-4 sm:ml-64"> <Authur /> </div>} />
          <Route path="/signup" element={<div className="p-4 sm:ml-64"> <SignUp /> </div>} />
          <Route path="/testapi" element={<div className="p-4 sm:ml-64"> <TestApi /> </div>} />
          <Route path="*" element={<div className="p-4 sm:ml-64"><NoPage /></div>} />
        </Routes>
        <div className="p-4 sm:ml-64"> <Footer /> </div>
      </Router>
    </>
  );
}

export default App;
