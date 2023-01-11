import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import BeatsGallery from "./beatsGallery/BeatsGallery";
import BeatForm from "./beatForm/BeatForm";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Homepage/>}/>
              <Route path={"/gallery"} element={<BeatsGallery/>}/>
              <Route path={"/new"} element={<BeatForm/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
