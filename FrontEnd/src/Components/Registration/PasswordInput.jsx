import React, { useState } from 'react'

const PasswordInput = ({ password, setPassword , passwordLabel}) => {
  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);  
  };
  
  return (
    <div className='relative w-full max-w-[220px] sm:max-w-[260px] mt-1'>
      <label className='inputLabel block sm:text-[11px] text-gray-600 mb-[6px]'>{passwordLabel}</label>
      <div className='relative'>
        <input 
          type={showPassword ? "text" : "password"} 
          className="bg-gray-100 border-none outline-none h-7 w-full px-2 text-xs sm:text-sm md:h-8 md:text-sm placeholder:text-[13px]"
          placeholder="Enter password"
          value={password} 
          onChange={handlePasswordChange}  
        />
        <i
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer hover:opacity-75 transition ${showPassword ? 'fas fa-eye text-xs sm:text-sm md:text-sm' : 'fas fa-eye-slash text-xs sm:text-sm md:text-sm'}`}
          onClick={toggleShowPassword}
        ></i>
      </div>
    </div>
  )
}

export default PasswordInput