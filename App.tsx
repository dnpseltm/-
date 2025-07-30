import React, { useState, useCallback } from 'react';
import { generateTeacherAdjective, GenerationResult } from './services/geminiService';
import AdjectiveCard from './components/AdjectiveCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import SparklesIcon from './components/icons/SparklesIcon';

const App: React.FC = () => {
    const [result, setResult] = useState<GenerationResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateClick = useCallback(async () => {
        setIsLoading(true);
        setResult(null);
        setError(null);
        try {
            const generationResult = await generateTeacherAdjective();
            setResult(generationResult);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4">
            <main className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
                <SparklesIcon className="w-16 h-16 text-blue-500 mb-4"/>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300">
                        오늘의 선생님 수식어
                    </span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
                    AI가 지친 선생님의 하루에 활력을 더해줄 특별한 수식어와 그림을 선물합니다.
                </p>

                <div className="w-full flex justify-center mb-8">
                    <button
                        onClick={handleGenerateClick}
                        disabled={isLoading}
                        className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                생성 중...
                            </>
                        ) : '멋진 수식어 받기'}
                    </button>
                </div>

                <div className="w-full h-96 flex items-center justify-center">
                    {isLoading && <LoadingSpinner />}
                    {error && <ErrorDisplay message={error} />}
                    {result && <AdjectiveCard result={result} />}
                    {!isLoading && !error && !result && (
                         <div className="text-center text-slate-500 dark:text-slate-400">
                            <p>버튼을 눌러 시작해보세요!</p>
                         </div>
                    )}
                </div>
            </main>
             <footer className="text-center py-4 mt-auto">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Powered by Google Gemini
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    &copy; 2025 김예정
                </p>
            </footer>
        </div>
    );
};

export default App;