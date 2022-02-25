import React from 'react'

interface IButton {
    onChange?: (data: any) => void,
    size?: "normal" | "small" | "big"
}

const Button: React.FC<IButton> = ({ onChange, size = "normal", children }) => {
  return (
    <button className='rounded-lg px-6 py-2' onChange={onChange}>{children}</button>
  )
}

export default Button;