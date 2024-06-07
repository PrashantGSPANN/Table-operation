// adding necessary imports
import React, { useState } from "react";
import Button from '@mui/material/Button';

// Search component
export default function Search({ searchOperation }) {
  const [input, setInput] = useState('');

  // Handle search on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchOperation(input);
    }
  };

  return (
    <div align="center">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => searchOperation(input)}
      >
        Search
      </Button>
    </div>
  );
}
