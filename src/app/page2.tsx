"use client"; // Required for interactivity (hooks)

import { useState,useEffect } from "react";


export default function Home() {
  const [input, setInput] = useState("");
  const [quote, setQuote] = useState<{ Quote: string; Author: string } | null>(null);
  const [DailyQuote, setDailyQuote] = useState<{ Quote: string; Author: string } | null>(null);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleDailyQuote();
  }, []);

  const handleDailyQuote = async () => { 
    try{
      const response = await fetch(`/api/quote?daily=true`);
      const DailyQuoteData = await response.json();

      console.log(DailyQuoteData);
      if (!response.ok) {
        alert(DailyQuoteData.message || "Something went wrong");
        setDailyQuote(null);
      } else {
        setDailyQuote(DailyQuoteData);
      }

    }catch (err) {
      console.error("Fetch error:", err)
    }
  }


  const handleSearch = async () => {
    if (!input) return; // Don't search if empty
    setLoading(true);
    try {

      const response = await fetch(`/api/quote?term=${encodeURIComponent(input)}`);
      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        setQuote(null);
      } else {
        setQuote(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <section className="card">
        <h1>Daily Quote</h1>
        {DailyQuote && (
          <div className="quote-display">
            <blockquote>"{DailyQuote.Quote}"</blockquote>
            <cite>— {DailyQuote.Author}</cite>
          </div>
        )}
        <h1>Quote Generator</h1>
        <p>Search through 48,000+ quotes by topic or keyword.</p>

        <div className="input-group">
          <input
            type="text"
            placeholder="e.g. Wisdom, Love, Success"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSearch}>Generate</button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {quote && (
          <div className="quote-display">
            <blockquote>"{quote.Quote}"</blockquote>
            <cite>— {quote.Author}</cite>
          </div>
        )}
      </section>
    </div>
  );
}