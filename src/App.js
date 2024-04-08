import React from 'react';
//Импорты компонентов
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <div className='wrapper'>
      <Header/>
      <p>Контент сайта</p>
      <Footer/>
    </div>
  );
}

export default App;
