import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ResultSection from './components/ResultSection';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Team from './components/Team';
import Guide from './components/Guide';
import Tips from './components/Tips';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Contact from './components/Contact';
import { AnalysisResult } from './types';
import { analyzeProduct } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async (input: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeProduct(input);
      setResult(data);
      // Small delay for smooth scroll after result appears
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while analyzing the product. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero onAnalyze={handleAnalysis} isLoading={loading} />

        {error && (
          <div className="max-w-xl mx-auto mb-10 px-4">
            <div className="bg-rose-50 border border-rose-200 text-rose-600 px-6 py-4 rounded-2xl flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {result && <ResultSection result={result} />}

        <HowItWorks />
        <Guide />
        <Tips />
        <About />
        <Team />
        <Contact />
        <PrivacyPolicy />
        <Terms />
      </main>

      <Footer />
    </div>
  );
};

export default App;