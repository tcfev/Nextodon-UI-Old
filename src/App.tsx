import React, { useEffect } from 'react';
import './App.scss';
import Index from './components/index/Index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authenticate from './components/authenticate/Authenticate';
import Generate from './components/generate/Generate';
import Head from './components/head/Head';


function App() {
  /**
   * Prevents right click
   * @param event 
   */
  const handleOnContextMenu = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {},[])

  return (
    <div className="App" onContextMenu={handleOnContextMenu}>
      <Head></Head>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="authenticate" element={<Authenticate />} />
          <Route path="generate" element={<Generate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
