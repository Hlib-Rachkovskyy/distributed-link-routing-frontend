import { useState } from 'react';
import { Link2, Copy, Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/v1/urls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a minute and try again.');
        }
        throw new Error('Failed to shorten URL. Please check the URL and try again.');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[128px] mix-blend-screen pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <main className="w-full max-w-2xl z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl mb-4">
            <Link2 className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50">
            Shorten Your Links
          </h1>
          <p className="text-lg text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Create fast, secure, and permanent short links in seconds. 
            Powered by our high-performance distributed routing engine.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-full space-y-4 relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/30 to-cyan-500/30 rounded-2xl blur-xl transition-all duration-500 group-hover:opacity-100 opacity-0" />
            <div className="relative flex flex-col md:flex-row gap-3 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
              <input
                type="url"
                required
                placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder:text-neutral-500 min-w-0"
              />
              <button
                type="submit"
                disabled={loading || !url}
                className={cn(
                  "relative overflow-hidden group flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-300",
                  "bg-white text-black hover:bg-neutral-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Shorten</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="w-full mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Result State */}
        {shortUrl && (
          <div className="w-full mt-8 p-6 rounded-2xl bg-white/5 border border-brand-500/30 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(168,85,247,0.3)] animate-in zoom-in-95 fade-in duration-500">
            <h3 className="text-sm font-medium text-brand-300 mb-3 uppercase tracking-wider">Your Shortened Link</h3>
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 text-white hover:text-brand-300 transition-colors font-mono truncate text-lg"
              >
                {shortUrl}
              </a>
              <button
                onClick={copyToClipboard}
                className={cn(
                  "p-3 rounded-lg transition-all duration-300 shrink-0",
                  copied 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
                aria-label="Copy to clipboard"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 text-neutral-500 text-sm">
        <p>Built for speed and scale. • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
