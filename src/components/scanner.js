import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import styled from 'styled-components';
import { device } from '../mediaQueries';
import Result from './result';

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

const Result = styled.p`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #4a148c;
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
  const [scannedData, setScannedData] = useState(null); // State for scanned data
  const [facingMode, setFacingMode] = useState('environment');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: 'environment' } },
    })
    .then((stream) => {
      console.log('Back camera is ready');
    })
    .catch((err) => {
      console.error('Error accessing camera: ', err);
      setFacingMode('user');
    });
  }, []);

  const handleScan = (data) => {
    console.log('Scanned data:', data); // Log scanned data
    if (data) {
      setScannedData(data);
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
        constraints={{ video: { facingMode } }}
      />
      {error && <p>Error: {error.message}</p>}
      {scannedData && <Result>Scanned Data: {scannedData}</Result>} {/* Display scanned data */}
    </Container>
  );
};

export default Scanner;
