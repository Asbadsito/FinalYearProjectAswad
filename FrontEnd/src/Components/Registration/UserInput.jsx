import React from 'react'

const UserInput = ({ username, setUsername }) => {

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);  
  };

  return (
    <div className='w-full max-w-[220px] sm:max-w-[260px] mt-3'>
      <label className='inputLabel block sm:text-[11px] text-gray-600 mb-[6px]'>Username :</label>
      <input 
        className="bg-gray-100 border-none outline-none h-7 w-full px-2 text-xs sm:text-sm md:h-8 md:text-sm placeholder:text-[13px]"
        placeholder="Enter Username"
        value={username}  
        onChange={handleUsernameChange}  
      />
    </div>
  )
}

export default UserInput
