// src/components/MaintenanceRequests/MaintenanceRequests.js
import React, { useState, useEffect } from 'react';
import './MaintenanceRequests.css';

const MaintenanceRequests = () => {
    const [issue, setIssue] = useState('');
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch('http://localhost:5000/maintenance-requests');
            const data = await response.json();
            setRequests(data);
        };

        fetchRequests();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (issue) {
            const response = await fetch('http://localhost:5000/maintenance-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ issue })
            });
            const data = await response.json();
            setRequests([...requests, data]);
            setIssue('');
        }
    };

    return (
        <div className="maintenance-requests">
            <h2>Maintenance Requests</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Describe the issue"
                    required
                />
                <button type="submit">Submit Request</button>
            </form>
            <h3>Requests</h3>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        {request.issue} - <strong>{request.status}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MaintenanceRequests;