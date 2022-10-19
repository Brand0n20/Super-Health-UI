import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientsPage from '../patients/PatientsPage';
import CreatePatient from '../patients/CreatePatient';
import Header from '../header/Header';
import PatientDetails from '../patients/PatientDetails';
import EncounterDetails from '../patients/EncounterDetails';
import CreateEncounter from '../patients/CreateEncounter';

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
          <Route exact path="/patients/:id" element={<PatientDetails />} />
          <Route exact path="/patients/:id/encounters/:encounterId" element={<EncounterDetails />} />
          <Route exact path="/patients/:id/encounters/create" element={<CreateEncounter />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
