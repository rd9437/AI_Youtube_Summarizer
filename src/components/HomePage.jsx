import React from 'react';
import { Video, Brain, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-center text-[#282828] mb-8 leading-tight">
            Summarize YouTube Videos <br />with AI
          </h1>

          <div className="text-center">
            <button
              onClick={() => navigate('/auth')}
              className="inline-flex items-center gap-3 bg-[#FF4500] text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-lg font-medium shadow-lg"
            >
              Try It Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </main>

      <footer className="glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
          <p className="text-[#282828]/70">Made by Rudransh Das</p>
        </div>
      </footer>
    </div>
  );
}
