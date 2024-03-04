import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/About";
import { Contact } from "./pages/contact";
import { Service } from "./pages/service";
import { Register } from "./pages/Register";
import { Login } from "./pages/login";
import {Navbar} from "./components/Navbar" ;
import { Error } from "./pages/error";
import { Footer } from "./components/Footer/Footer";
import {Logout } from "./pages/logout";
//subscribe thapatechnical channel for more awesome content. 

const App = () => {
  return (<>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />


        <Route path="*" element={<Error />} />
      </Routes>
      <Footer></Footer>
    </Router></>
  );
};

export default App;