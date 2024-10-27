import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import styled from 'styled-components';
import { device } from '../mediaQueries';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa;

  @media ${device.mobileL} {
    padding: 10px;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #4a148c;
  margin-bottom: 20px;

  @media ${device.mobileL} {
    font-size: 1.8rem;
  }
`;

const previewStyle = {
  height: 'auto',
  width: '80%',
  maxWidth: '500px',
  border: '5px solid #4a148c',
  borderRadius: '10px',

  '@media (max-width: 600px)': {
    width: '100%',
  },
};

const Scanner = ({ onScan }) => {
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      onScan(data);
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  return (
    <Container>
      <Heading>Scan Medicine QR Code</Heading>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      {error && <p>Error: {error.message}</p>}
    </Container>
  );
};

export default Scanner;
