import React, { useEffect, useState } from 'react';
import { History, LogOut, Youtube, Send, X } from 'lucide-react';
import { Spinner } from './ui/Spinner.jsx';
import { useAccessToken, useSignOut } from '@nhost/react';

export function VideoSummaryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentSummary, setCurrentSummary] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ ytSummary, setYtSummary] = useState('');
  const [url, setUrl] = useState('');
  const { signOut } = useSignOut();
  const accessToken = useAccessToken();

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://wjrjdxentwfwpiqnwlph.hasura.ap-south-1.nhost.run/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-role': 'user',
          'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "query": "mutation MyCustomActionMutation($arg1: SampleInput!){ actionName(arg1: $arg1) {message} }",
          "variables": { "arg1":{"ytube": url}}
        })
      });

      const result = await response.json();

      if(result?.data?.actionName?.message==='AI model failed to run'){
        alert('There was an error in processing, Please try again!');
        return;
      }

      else if(result?.data?.actionName?.message){
        console.log(result?.data?.actionName?.message);
        setYtSummary(result?.data?.actionName?.message);
      }

      else{
        alert('An Unknow error occured.')
        throw new Error('Unknown error occured');
      }
    } 
    catch(err){
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const newSummary = {
      id: Date.now().toString(),
      url,
      title: 'Summary',
      summary: ytSummary,
      timestamp: Date.now(),
    };
    setSummaries(prev => [newSummary, ...prev]);
    setCurrentSummary(newSummary);
    setUrl('');
    setIsLoading(false);
    console.log(ytSummary);
  }, [ytSummary]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="glass fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[#4B0082] hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold">Youtube Video Summarizer</span>
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-white/30 rounded-full transition-colors"
            >
            </button>
            <button
              onClick={signOut}
              className="p-2 hover:bg-white/30 rounded-full transition-colors"
            >
              <LogOut size={20} className="text-[#282828]" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleVideoSubmit} className="glass rounded-xl p-6 mb-8">
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter YouTube video URL"
                className="w-full px-4 py-3 pr-12 rounded-lg bg-white/50 border border-white/20 focus:ring-2 focus:ring-[#4B0082] outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#7C3AED] text-white p-2 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-70"
              >
                {isLoading ? <Spinner size="sm" /> : <Send size={20} />}
              </button>
            </div>
          </form>

          {isLoading ? (
            <div className="glass rounded-xl p-8 text-center">
              <Spinner size="lg" className="mx-auto mb-4" />
              <p className="text-[#282828]/70">Summarizing video content...</p>
            </div>
          ) : currentSummary && (
            <div className="glass rounded-xl p-8">
              <h2 className="text-xl font-semibold text-[#7C3AED] mb-4">{currentSummary.title}</h2>
              <a
                href={currentSummary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7C3AED] hover:underline text-sm mb-4 block"
              >
                {currentSummary.url}
              </a>
              <p className="text-[#000000]/70 whitespace-pre-wrap">{currentSummary.summary}</p>
            </div>
          )}
        </div>
      </main>

      {/* Sidebar */}
      <footer className="glass fixed bottom-0 left-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
          <p className="text-[#282828]/70">Made by Rudransh Das</p>
        </div>
      </footer>
    </div>
  );
}
