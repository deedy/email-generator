import React, { useState } from 'react';

const EmailGenerator = () => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [reason, setReason] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedinUrl, companyUrl, reason }),
      });
      const data = await response.json();
      setGeneratedEmail(data.email);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedEmail('Failed to generate email. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="email-generator-container">
      <div className="email-generator-card">
        <h1 className="email-generator-title">Email Generator</h1>
        <div className="email-generator-form">
          <div className="input-group">
            <input 
              type="text" 
              id="linkedin"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="input-field"
            />
            <label htmlFor="linkedin" className="input-label">LinkedIn URL</label>
          </div>
          <div className="input-group">
            <input 
              type="text" 
              id="company"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
              className="input-field"
            />
            <label htmlFor="company" className="input-label">Company Website</label>
          </div>
          <div className="input-group">
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="input-field"
            >
              <option value="">Select reason</option>
              <option value="hiring">Hiring to your company</option>
              <option value="funding">Funding from your company</option>
              <option value="selling">Selling your company product</option>
            </select>
            <label htmlFor="reason" className="input-label">Reason for reaching out</label>
          </div>
          <button 
            onClick={generateEmail}
            className="generate-button"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Email'}
          </button>
        </div>
      </div>
      {generatedEmail && (
        <div className="generated-email-container">
          <h3 className="generated-email-title">Generated Email:</h3>
          <div className="generated-email-content">
            {generatedEmail.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailGenerator;