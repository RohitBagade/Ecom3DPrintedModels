import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Category from './Pages/Category';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
// import About from './Pages/Protein';
// import Contact from './Pages/Gainer';
// import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import protein_banner from './Components/Assets/banner1.png';
import gainer_banner from './Components/Assets/banner2.png';
import creatine_banner from './Components/Assets/banner3.png';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} /> */}
          <Route path='/protein' element={<Category banner={protein_banner} category="Protein" />} />
          <Route path='/gainer' element={<Category banner={gainer_banner} category="Gainer" />} />
          <Route path='/creatine' element={<Category banner={creatine_banner} category="Creatine" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
