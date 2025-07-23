import React, { useState } from 'react';

const ShortenerPage = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShortUrl('');
        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });
            if (!response.ok) {
                throw new Error('Failed to shorten URL');
            }
            const data = await response.json();
            setShortUrl(data.shortUrl);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>URL Shortener</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Enter your URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    style={{ width: '80%', padding: '0.5rem', marginRight: '0.5rem' }}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Shortening...' : 'Shorten'}
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
            {shortUrl && (
                <div style={{ marginTop: '1rem' }}>
                    Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </div>
            )}
        </div>
    );
};

export default ShortenerPage;