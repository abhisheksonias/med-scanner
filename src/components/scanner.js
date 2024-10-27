import React, { useState, useEffect } from 'react';
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
};

const Scanner = ({ onScan }) => {
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // Default to back camera

  useEffect(() => {
    // Request access to the back camera
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: 'environment' } },
    })
    .then((stream) => {
      // Successfully accessed the back camera
      console.log('Back camera is ready');
    })
    .catch((err) => {
      console.error('Error accessing camera: ', err);
      setFacingMode('user'); // Fallback to front camera if back camera is not available
    });
  }, []);

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
        constraints={{ video: { facingMode } }} // Set the facing mode based on state
      />
      {error && <p>Error: {error.message}</p>}
    </Container>
  );
};

export default Scanner;
