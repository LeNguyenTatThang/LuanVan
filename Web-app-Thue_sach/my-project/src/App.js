
import './App.css';
import HomeBook from './views/HomeBook';
import NoPage from './views/NoPage';
import Profile from './views/Profile';
import Review from './views/Review';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from './views/Search';
import Product from './views/Product';
import Signin from './views/Signin';
import Authur from './views/Authur';
import SignUp from './views/SignUp';
import HomeAdmin from './views/admin/HomeAdmin';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<div className="p-4 sm:ml-64"> <HomeBook /> </div>} />
          <Route path="/products" element={<div className="p-4 sm:ml-64"> <Product /> </div>} />
          <Route path="/profiles" element={<div className="p-4 sm:ml-64"> <Signin /> </div>} />
          <Route path="/search" element={<div className="p-4 sm:ml-64"> <Search /> </div>} />
          <Route path="/authur" element={<div className="p-4 sm:ml-64"> <Authur /> </div>} />
          <Route path="/signup" element={<div className="p-4 sm:ml-64"> <SignUp /> </div>} />
          <Route path="/admin" element={<div className="p-4 sm:ml-64"> <HomeAdmin /> </div>} />
          <Route path="/dashboard" element={<div className="p-4 sm:ml-64"> <div>hello</div> </div>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
