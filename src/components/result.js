import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components
const ResultContainer = styled.div`
  background-color: #f9f9f9;
  border: 2px solid #4a148c;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  color: #4a148c;
  text-align: center;
`;

const DataText = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin: 10px 0;
`;

const StatusText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: ${({ isValid }) => (isValid ? 'green' : 'red')};
`;

const Loader = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #4a148c;
`;

const Result = ({ data }) => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyWithBlockchain = async (qrData) => {
      const isValid = await fetchBlockchainData(qrData);
      setVerificationResult(isValid);
      setLoading(false);
    };

    verifyWithBlockchain(data);
  }, [data]);

  const fetchBlockchainData = async (qrData) => {
    // Simulated response logic for demonstration
    return qrData === "VALID_TOKEN"; // Replace this with your actual verification logic
  };

  return (
    <ResultContainer>
      <Heading>Medicine Verification Result</Heading>
      <DataText>Scanned Data: {data}</DataText>
      {loading ? (
        <Loader>Loading verification...</Loader>
      ) : (
        <StatusText isValid={verificationResult}>
          Status: {verificationResult ? "Real Medicine" : "Fake Medicine"}
        </StatusText>
      )}
    </ResultContainer>
  );
};

export default Result;
