import React, { useEffect, useState } from 'react';
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
    // Simulate a blockchain verification function
    const verifyWithBlockchain = async (qrData) => {
      // Replace this with your actual blockchain API call
      const isValid = await fetchBlockchainData(qrData);
      setVerificationResult(isValid ? "Real Medicine" : "Fake Medicine");
      setLoading(false);
    };

    verifyWithBlockchain(data);
  }, [data]);

  const fetchBlockchainData = async (qrData) => {
    // Simulated response from the blockchain
    // Here you should call your blockchain API to verify the data
    // Example: const response = await fetch(`your_api_endpoint/${qrData}`);
    // const result = await response.json();
    // return result.isValid;

    // For now, we simulate a valid check for demonstration purposes
    return qrData === "VALID_TOKEN"; // Change this logic based on your blockchain response
  };

  return (
    <div>
      <h2>Medicine Verification Result</h2>
      <p>Scanned Data: {data}</p>
      {loading ? <p>Loading verification...</p> : <p>Status: {verificationResult}</p>}
    </div>
  );
};

export default Result;
