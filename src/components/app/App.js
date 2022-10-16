import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientsPage from '../patients/PatientsPage';
import CreatePatient from '../patients/CreatePatient';
import Header from '../header/Header';

/**
 * @name App
 * @returns component
 */
const App = () => (

  <BrowserRouter>
    <Header />
    <div className="page-container">
      <div className="content-wrap">
        <Routes>
          <Route exact path="/patients" element={<PatientsPage />} />
          <Route exact path="/patients/create" element={<CreatePatient />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
