//Shared Components

const Button = ({
  type = "button",
  className = "",
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;


//rfc
// import React from 'react'

// export default function button() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// function Button() {
//     return (
//         <button type="submit" className="signup-btn">Sign Up</button>,
//         <button type="submit" className="login-btn">Login</button>
//     );
// }

// export default Button;