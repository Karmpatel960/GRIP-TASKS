import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    fetch('https://sbackend-7bl4.onrender.com/transfer', {
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
        if (data.message === 'Money transfer successful' && data.transactionData) {
          // Show toast message for successful transaction
          toast.success('Transaction successful');
          console.log('Transaction Data:', data.transactionData); // Handle success response
        } else {
          // Handle unexpected response structure or error message
          console.error('Unexpected response:', data);
          toast.error('An error occurred during the transaction');
        }
      })
      .catch((error) => {
        console.error('Error transferring money:', error); // Handle error
        toast.error('An error occurred during the transaction');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Money Transfer</h1>
      <form>
        <div className="form-group">
          <label htmlFor="senderAccount">Sender Account No.</label>
          <input
            type="text"
            className="form-control"
            id="senderAccount"
            value={senderAccount}
            onChange={handleSenderAccountChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="receiverAccount">Receiver Account No.</label>
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

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default Transfer;
