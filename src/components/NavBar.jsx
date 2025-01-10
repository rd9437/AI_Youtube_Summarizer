import { Youtube } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar(){
    const navigate = useNavigate();
    
    return(
        <nav className="glass fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center text-[#4B0082] hover:opacity-80 transition-opacity">
          {/* Display the letter "R" with custom styling */}
          <span className="text-2xl font-bold">Youtube Video Summarizer</span> 
        </a>
        </div>
      </nav>
    )
}
