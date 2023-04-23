import { Route, Routes, } from "react-router-dom";

import { Catalog } from "./components/Catalog/Catalog";
import { Create } from "./components/Create/Create";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import { Logout } from "./components/Logout/Logout";
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";
import { CocktailContextProvider } from "./contexts/CocktailContext";

function App() {
  // // window.localStorage.clear();
  // // window.sessionStorage.clear();
  // // window.location.reload();

  return (
    <AuthProvider>
      <CocktailContextProvider>
        <div id="templatemo_container_wrapper">
          <div id="templatemo_container">
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register' element={<Register />} />
              <Route path='/create' element={<Create />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/catalog/:cocktailId' element={<Details />} />
              <Route path='/catalog/:cocktailId/edit' element={<Edit />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CocktailContextProvider>
    </AuthProvider>
  );
}

export default App;
