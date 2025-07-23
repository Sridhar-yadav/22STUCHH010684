import React, { useEffect, useState } from "react";

const StatsPage = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/stats");
                if (!response.ok) {
                    throw new Error("Failed to fetch stats");
                }
                const data = await response.json();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>URL Statistics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Short URL</th>
                        <th>Original URL</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((item) => (
                        <tr key={item.shortUrl}>
                            <td>
                                <a href={item.shortUrl} target="_blank" rel="noopener noreferrer">
                                    {item.shortUrl}
                                </a>
                            </td>
                            <td>{item.originalUrl}</td>
                            <td>{item.clicks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatsPage;