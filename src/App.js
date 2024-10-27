import React, { useState } from 'react';
import Scanner from './components/scanner';
import Result from './components/result';
import styled from 'styled-components'
import { device } from './mediaQueries';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa;

  @media ${device.mobileL} {
    padding: 20px;
  }
`;

const AppTitle = styled.h1`
  font-size: 3rem;
  color: #4a148c; /* Violet */
  margin-bottom: 30px;
`;

const App = () => {
  const [medicineData, setMedicineData] = useState(null);

  const handleScan = (data) => {
    console.log("Scanned data: ", data);
    setMedicineData(data);
  };

  return (
    <AppContainer>
      <AppTitle>Satyamed: Medicine Verification</AppTitle>
      {medicineData ? (
        <Result data={medicineData} />
      ) : (
        <Scanner onScan={handleScan} />
      )}
    </AppContainer>
  );
};

export default App;
