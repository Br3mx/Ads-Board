import Home from "./components/pages/Home/Home.js";
import AddAd from "./components/pages/AddAd/AddAd.js";
import EditAdd from "./components/pages/EditAdd/EditAdd.js";
import Login from "./components/pages/Login/Login.js";
import Logout from "./components/pages/Logout/Logout.js";
import NotFound from "./components/pages/NotFound/NotFound.js";
import Register from "./components/pages/Register/Register.js";
import SearchPchrase from "./components/pages/SearchPhrase/SearchPhrase.js";
import SingleAd from "./components/pages/SingleAd/SingleAd.js";
import User from "./components/pages/User/User.js";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header.js";
import NavBar from "./components/views/NavBar/NavBar.js";
import Footer from "./components/views/Footer/Footer.js";
const App = () => {
  return (
    <main>
      <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<SingleAd />} />
          <Route path="/ad/add" element={<AddAd />} />
          <Route path="/ad/edit/:id" element={<EditAdd />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<User />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ad/search/:searchPhrase" element={<SearchPchrase />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
};

export default App;
