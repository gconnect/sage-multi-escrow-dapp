import React, { useState } from 'react';

const InputFieldsList = () => {
  const [inputs, setInputs] = useState([{ amount: '', address: '' }]);

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
            value={input.amount}
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
      <button className='bg-green-500 p-2 rounded' type="button" onClick={handleAddInput}>
        +
      </button>
    </div>
  );
};

export default InputFieldsList;