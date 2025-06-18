import { useState } from 'react';

export default function SpeakingPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/speaking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data.response);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Practice Speaking</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
      <div className="response">{response}</div>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
        }
        textarea {
          width: 100%;
          height: 100px;
          margin-bottom: 1rem;
          padding: 0.5rem;
          font-size: 16px;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          font-size: 16px;
          background-color: #000;
          color: #fff;
          border: none;
          cursor: pointer;
          border-radius: 6px;
        }
        .response {
          margin-top: 1rem;
          background: #f4f4f4;
          padding: 1rem;
          border-radius: 6px;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
}
