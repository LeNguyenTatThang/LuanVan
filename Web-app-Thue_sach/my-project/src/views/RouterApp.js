import React from 'react'

import HomeBook from './HomeBook';
import NoPage from './NoPage';
import { BrowserRouter as Routes, Route } from "react-router-dom";
import Search from './Search';
import Product from './Product';
import Signin from './Signin';
import Authur from './Authur';
import SignUp from './SignUp';

import HomeAdmin from './HomeAdmin';
export default function RouterApp() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<div className="p-4 sm:ml-64"> <HomeBook /> </div>} />
                <Route path="/products" element={<div className="p-4 sm:ml-64"> <Product /> </div>} />
                <Route path="/profiles" element={<div className="p-4 sm:ml-64"> <Signin /> </div>} />
                <Route path="/search" element={<div className="p-4 sm:ml-64"> <Search /> </div>} />
                <Route path="/authur" element={<div className="p-4 sm:ml-64"> <Authur /> </div>} />
                <Route path="/signup" element={<div className="p-4 sm:ml-64"> <SignUp /> </div>} />
                <Route path="/admin" element={<div className="p-4 sm:ml-64"> <HomeAdmin /> </div>} />
                <Route path="*" element={<div className="p-4 sm:ml-64"><NoPage /></div>} />
            </Routes>
        </div>
    )
}
