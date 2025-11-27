import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Rotas } from "./rotas/Rotas";
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </>
  )
}

export default App
