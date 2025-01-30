import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';

function generateRandomColor(): string {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function generatePalette(): string[] {
  return Array.from({ length: 5 }, () => generateRandomColor());
}

function App() {
  const [colors, setColors] = useState<string[]>(generatePalette());
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerateNewPalette = () => {
    setColors(generatePalette());
  };

  const handleCopyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  useEffect(() => {
    const handleSpacebar = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        handleGenerateNewPalette();
      }
    };

    window.addEventListener('keydown', handleSpacebar);
    return () => window.removeEventListener('keydown', handleSpacebar);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="py-8 px-4 text-center bg-white shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Color Palette Generator</h1>
        <p className="text-gray-600">Press spacebar or click the refresh button to generate a new palette</p>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center justify-center p-8 transition-all duration-300 hover:flex-[1.2]"
            style={{ backgroundColor: color }}
          >
            <button
              onClick={() => handleCopyColor(color, index)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white/95 text-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all group"
            >
              {copiedIndex === index ? (
                <>
                  <Check size={18} className="text-green-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} className="group-hover:scale-110 transition-transform" />
                  <span>{color.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        ))}
      </main>

      <button
        onClick={handleGenerateNewPalette}
        className="fixed bottom-8 right-8 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
        aria-label="Generate new palette"
      >
        <RefreshCw size={24} className="text-gray-800" />
      </button>
    </div>
  );
}

export default App;