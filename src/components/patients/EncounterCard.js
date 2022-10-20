import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import styles from './Encounters.module.css';

const EncounterCard = ({ encounter, patientData }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded border border-primary d-inline-flex p-2 mt-md-4">
      <div className={styles.content}>
        <h4>Encounter</h4>
        <li>
          Id:
          {' '}
          {encounter.id}
        </li>
        <li>
          Visit Code:
          {' '}
          {encounter.visitCode}
        </li>
        <li>
          Provider:
          {' '}
          {encounter.provider}
        </li>
        <li>
          Date:
          {' '}
          {encounter.date}
        </li>
        <Button className="btn btn-secondary" onClick={() => navigate(`/patients/${patientData.id}/encounters/${encounter.id}`)}>More Details</Button>
      </div>
    </div>
  );
};

export default EncounterCard;
