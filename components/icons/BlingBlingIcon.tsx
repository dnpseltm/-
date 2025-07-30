import React from 'react';

const BlingBlingIcon: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 16 16" 
        fill="currentColor" 
        className={className} 
        style={style}
        aria-hidden="true"
    >
        <path d="M8 0L9.3 6.7L16 8L9.3 9.3L8 16L6.7 9.3L0 8L6.7 6.7L8 0Z" />
    </svg>
);

export default BlingBlingIcon;