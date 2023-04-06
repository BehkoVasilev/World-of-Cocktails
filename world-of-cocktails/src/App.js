import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { cocktailServiceFactory } from './services/cocktailService';

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
// import { useService } from "./hooks/useService";

function App() {
  const [cocktails, setCocktails] = useState([]);
  const cocktailService = cocktailServiceFactory();//token

  const navigate = useNavigate();

  useEffect(() => {
    cocktailService.getAll()
      .then(result => {
        setCocktails(result)
      })
  }, [cocktailService])

  const onCreateCocktailSubmit = async (data) => {

    const newCocktail = await cocktailService.create(data);

    setCocktails(state => [...state, newCocktail]);

    navigate('/catalog');
  }

  const onEditCocktailSubmit = async (data) => {
    const editCocktail = await cocktailService.updateOne(data._id, data);

    setCocktails(state => state.map(x => x._id === data._id ? editCocktail : x));

    navigate(`/catalog/${data._id}`)
  }

  return (
    <AuthProvider>
      <div id="templatemo_container_wrapper">
        <div id="templatemo_container">
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<Create onCreateCocktailSubmit={onCreateCocktailSubmit} />} />
            <Route path='/catalog' element={<Catalog allCocktails={cocktails} />} />
            <Route path='/catalog/:cocktailId' element={<Details />} />
            <Route path='/catalog/:cocktailId/edit' element={<Edit onEditCocktailSubmit={onEditCocktailSubmit} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
