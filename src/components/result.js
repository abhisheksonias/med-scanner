import React from 'react';

const Result = ({ data }) => {
  return (
    <div>
      <h2>Medicine Verification Result</h2>
      <p>Scanned Data: {data}</p>
      {/* Replace this with your blockchain verification logic */}
      <p>Status: {data === "VALID_TOKEN" ? "Real Medicine" : "Fake Medicine"}</p>
    </div>
  );
};

export default Result;
