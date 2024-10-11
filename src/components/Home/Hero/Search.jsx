import React from 'react';

const Search = () => {

  return (
    <>
      <input 
        className='rounded text-black p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
        type="text" 
        placeholder="Search..."
      />
    </>
  );
}

export default Search;
