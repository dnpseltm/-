import React from 'react';
import { GenerationResult } from '../services/geminiService';

interface AdjectiveCardProps {
    result: GenerationResult;
}

const AdjectiveCard: React.FC<AdjectiveCardProps> = ({ result }) => {
    const { adjective, imageUrl } = result;

    return (
        <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out my-8 animate-fade-in-up">
            <div className="relative">
                <img 
                    src={imageUrl} 
                    alt={`An artistic representation of "${adjective}"`} 
                    className="w-full h-auto aspect-[4/3] object-cover rounded-t-2xl" 
                    aria-label={adjective}
                />
            </div>
            <div className="p-6">
                <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-4">오늘의 선생님은 바로...</p>
                <h2 className="text-center text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    {adjective}
                </h2>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-4 rounded-b-2xl">
                <p className="text-center text-sm text-slate-600 dark:text-slate-300">
                    오늘 하루도 정말 고생 많으셨습니다!
                </p>
            </div>
        </div>
    );
};

export default AdjectiveCard;