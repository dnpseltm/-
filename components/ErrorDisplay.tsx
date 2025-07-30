
import React from 'react';

interface ErrorDisplayProps {
    message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative my-4 w-full max-w-md" role="alert">
            <strong className="font-bold">오류!</strong>
            <span className="block sm:inline ml-2">{message}</span>
        </div>
    );
};

export default ErrorDisplay;
