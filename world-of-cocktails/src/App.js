import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { authServiceFactory } from './services/authService';
import { cocktailServiceFactory } from './services/cocktailService';

import { Catalog } from "./components/Catalog/Catalog";
import { Create } from "./components/Create/Create";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { AuthContext } from "./contexts/AuthContext";
import { Logout } from "./components/Logout/Logout";
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [auth, setAuth] = useState({});
  const cocktailService = cocktailServiceFactory(auth.accessToken);
  const authService = authServiceFactory(auth.accessToken);

  const navigate = useNavigate();

  useEffect(() => {
    cocktailService.getAll()
      .then(result => {
        setCocktails(result)
      })
  }, [])

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data);

      setAuth(result);

      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setAuth({});
  }

  const onRegisterSubmit = async (data) => {
    const { repassword, ...registerData } = data;

    if (repassword !== registerData.password) {
      return
    }

    try {
      const result = await authService.register(registerData);

      setAuth(result);

      navigate('/')
    } catch (error) {
      console.log(error.error.message);
    }
  };

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

  const context = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
  }

  return (
    <AuthContext.Provider value={context}>
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
    </AuthContext.Provider>
  );
}

export default App;
