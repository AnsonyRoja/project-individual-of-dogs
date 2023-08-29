
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';
import Detail from './components/Detail/Detail';
import CrearRaza from './components/Form/CrearRaza';
import Details from './components/Detail/Details';


function App() {

  const [searchMessage, setSearchMessage] = useState('');




  // El código de este bloque se utiliza para establecer el título del documento en el título actual cuando se desmonta el componente. Esto se hace para evitar que cualquier otro componente cambie el título.

  useEffect(() => {
    const currentTitle = document.title;

    return () => {

      document.title = currentTitle;
    };
  }, []);


  return (
    <div className="App">



      <Routes>
        <Route path='/dogss/:id' element={<Details setSearchMessage={setSearchMessage} />} />
        <Route path="/dog/:idRaza" element={<Detail setSearchMessage={setSearchMessage} />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/home' element={<Home searchMessage={searchMessage} setSearchMessage={setSearchMessage} />} />
        <Route path='/crear-raza' element={<CrearRaza />} />
      </Routes>

    </div>
  );
}

export default App;
