
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
import Addbook from './views/Addbook';
import Navbar from './views/Navbar';



function App() {
  // const [user, isUser] = useState < User > ({})


  // const [userLogin, setUserLogin] = useState({})
  // const tokenUser = JSON.parse(localStorage.getItem('token'))
  // useEffect(() => {
  //   if (tokenUser) {
  //     isUser(tokenUser)
  //   }
  //   // setUserLogin(tokenUser)
  // }, [])
  // // console.log(use)


  return (
    <>
      <Router>

        <Navbar />

        <Routes>
          <Route path="/" element={<div className="p-4 sm:ml-64"> <HomeBook /> </div>} />
          <Route path="/products" element={<div className="p-4 sm:ml-64"> <Product /> </div>} />
          <Route path="/profiles" element={<div className="p-4 sm:ml-64"> <Profile /> </div>} />
          <Route path="/signin" element={<div className="p-4 sm:ml-64"> <Signin /> </div>} />
          <Route path="/search" element={<div className="p-4 sm:ml-64"> <Search /> </div>} />
          <Route path="/authur" element={<div className="p-4 sm:ml-64"> <Authur /> </div>} />
          <Route path="/signup" element={<div className="p-4 sm:ml-64"> <SignUp /> </div>} />
          <Route path="/testapi" element={<div className="p-4 sm:ml-64"> <TestApi /> </div>} />
          <Route path="/add-book" element={<div className="p-4 sm:ml-64"> <Addbook /> </div>} />
          <Route path="*" element={<div className="p-4 sm:ml-64"><NoPage /></div>} />
        </Routes>
        <div className="p-4 sm:ml-64"> <Footer /> </div>
      </Router>
    </>
  );
}

export default App;
