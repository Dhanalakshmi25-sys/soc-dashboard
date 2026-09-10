import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Joke {
  id: number;
  type: string;
  setup: string;
  delivery: string;
}

const JokeGenerator: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setJoke(response.data);
    } catch (err) {
      setError('Failed to fetch joke. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-800 border border-cyan-500/30 rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">Joke Generator</h1>
          <p className="text-slate-400 mb-8">Get random jokes from the Official Joke API</p>

          {/* Joke Display */}
          <div className="bg-slate-900 border border-cyan-500/20 rounded-lg p-6 mb-8 min-h-32">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin">
                  <div className="h-12 w-12 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
                </div>
              </div>
            ) : error ? (
              <p className="text-red-400 text-center">{error}</p>
            ) : joke ? (
              <div>
                <p className="text-slate-300 text-lg mb-4">{joke.setup}</p>
                <p className="text-cyan-400 text-lg font-semibold">{joke.delivery}</p>
              </div>
            ) : (
              <p className="text-slate-400 text-center">Loading joke...</p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={fetchJoke}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            {loading ? 'Loading...' : 'Get Another Joke'}
          </button>

          {/* Joke Info */}
          {joke && (
            <div className="mt-6 text-slate-400 text-sm text-center">
              <p>Type: <span className="text-cyan-400">{joke.type}</span> | ID: <span className="text-cyan-400">{joke.id}</span></p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by <a href="https://official-joke-api.appspot.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Official Joke API</a></p>
        </div>
      </div>
    </div>
  );
};

export default JokeGenerator;
