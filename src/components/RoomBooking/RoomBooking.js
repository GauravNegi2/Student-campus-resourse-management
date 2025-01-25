// src/components/RoomBooking/RoomBooking.js
import React, { useState } from 'react';
import './RoomBooking.css';

const RoomBooking = () => {
    const [roomType, setRoomType] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/room-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomType, bookingDate, bookingTime })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(`Room booked: ${roomType} on ${bookingDate} at ${bookingTime}`);
            } else {
                setMessage('Failed to book room');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="room-booking">
            <h2>Room Booking System</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Room Type:</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)} required>
                        <option value="">Select a room</option>
                        <option value="Classroom">Classroom</option>
                        <option value="Lab">Lab</option>
                        <option value="Seminar Hall">Seminar Hall</option>
                    </select>
                </div>
                <div>
                    <label>Booking Date:</label>
                    <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
                </div>
                <div>
                    <label>Booking Time:</label>
                    <input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required />
                </div>
                <button type="submit">Book Room</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RoomBooking;