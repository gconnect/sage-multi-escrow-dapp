import React, { useState } from 'react';
import { BatchTransaction, BatchTransfers, batchTransfer } from '../interact'
import { useCelo } from '@celo/react-celo';
import { BigNumber, ethers } from 'ethers';

const InputFieldsList = () => {
  const [inputs, setInputs] = useState([{ amount: '', address: '' }]);


  const {kit, address} = useCelo()
  // Function to handle input change
  const handleInputChange = (index : number, event : React.FormEvent<HTMLElement>) => {
    const { name, value } = event.currentTarget;
    const updatedInputs = [...inputs];
    updatedInputs[index][name] = value;
    setInputs(updatedInputs);
  };

  // Function to handle adding a new input field
  const handleAddInput = () => {
    setInputs([...inputs, { amount: '', address: '' }]);
  };

  // Function to handle removing an input field
  const handleRemoveInput = (index : number) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };


  const addresses = [
    "0x7e710C926493499bDeE1f9320e9C9A69b12519C5",
    "0xFa31f1b8CbC9A0310Dff7F8bedD33BA8Aab44372"
  ]

  const amounts = [
    ethers.utils.parseUnits('1').toString(),
    ethers.utils.parseUnits('0.5').toString()
  ]

  const submitTransaction =async () => {
    if (inputs) {
      //  await batchTransfer(address, kit, addresses, amounts)
      await BatchTransaction(kit, address, inputs)
    } else {
      alert("Fields are required")
    }
  }

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index}>
          <input
            className='border-2 p-2 rounded'
            type="text"
            name="address"
            value={input.address}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="Enter address"
          />
          <input
             className='border-2 p-2 rounded'
            type="text"
            name="amount"
            value={ input.amount}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="Enter amount"
          />
          {index > 0 && (
            <button className='bg-red-200 p-2 rounded' type="button" onClick={() => handleRemoveInput(index)}>
              -
            </button>
          )}
        </div>
      ))}
      <button className='bg-orange-500 p-2 rounded' type="button" onClick={handleAddInput}>
        +
      </button>
        <button className='bg-green-500 p-2 rounded' type="button" onClick={submitTransaction}>
        Submit Bulk Transaction
      </button>
    </div>
  );
};

export default InputFieldsList;