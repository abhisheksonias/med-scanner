import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner'; // Ensure this matches the correct package
import styled from 'styled-components';
import { device } from '../mediaQueries';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import MedicineRegistryABI from './MedicineRegistryABI.json';

const CONTRACT_ADDRESS = "0x56F0DeDb1e9f7f84EaBec307dCBE407c5C959AF1";

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

const ResultText = styled.p`
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

const Scanner = () => {
  const [error, setError] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const verifyMedicine = async (medicineId) => {
    if (!window.ethereum) {
      setVerificationStatus('MetaMask not found');
      return;
    }

    try {
      const provider = new Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, MedicineRegistryABI, signer);

      // Retrieve medicine info
      const [name, metadata, manufacturer] = await contract.getMedicine(medicineId);
      setVerificationStatus(`Real Medicine - Name: ${name}, Manufacturer: ${manufacturer}`);
    } catch (err) {
      console.error("Medicine does not exist on the blockchain:", err);
      setVerificationStatus('Fake Medicine');
    }
  };

  const handleScan = (data) => {
    if (data && data.text) {
      try {
        const url = new URL(data.text); // Assuming data.text is the scanned URL
        const medicineId = url.searchParams.get('id');

        setScannedData(data);
        if (medicineId) {
          verifyMedicine(medicineId);
        } else {
          setVerificationStatus('Invalid QR code');
        }
      } catch (err) {
        setVerificationStatus('Invalid QR code format');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
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
      {scannedData && <ResultText>Scanned Data: {scannedData.text}</ResultText>}
      {verificationStatus && <ResultText>Verification Status: {verificationStatus}</ResultText>}
    </Container>
  );
};

export default Scanner;
