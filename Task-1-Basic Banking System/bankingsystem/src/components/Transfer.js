import React, { useState } from 'react';

function Transfer() {
  const [senderAccount, setSenderAccount] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSenderAccountChange = (e) => {
    setSenderAccount(e.target.value);
  };

  const handleReceiverAccountChange = (e) => {
    setReceiverAccount(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleTransfer = () => {
    // Perform the transfer logic here
    fetch('http://localhost:8082/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderAccountNumber: senderAccount,
        receiverAccountNumber: receiverAccount,
        amount: amount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle success response
      })
      .catch((error) => {
        console.error('Error transferring money:', error); // Handle error
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Money Transfer</h1>
      <form>
        <div className="form-group">
          <label htmlFor="senderAccount">Sender Account</label>
          <input
            type="text"
            className="form-control"
            id="senderAccount"
            value={senderAccount}
            onChange={handleSenderAccountChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="receiverAccount">Receiver Account</label>
          <input
            type="text"
            className="form-control"
            id="receiverAccount"
            value={receiverAccount}
            onChange={handleReceiverAccountChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <br />
        <button type="button" className="btn btn-primary" onClick={handleTransfer}>
          Transfer
        </button>
      </form>
    </div>
  );
}

export default Transfer;


