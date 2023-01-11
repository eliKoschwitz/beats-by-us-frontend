import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import BeatsGallery from "./beatsGallery/BeatsGallery";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Homepage/>}/>
              <Route path={"/gallery"} element={<BeatsGallery/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
