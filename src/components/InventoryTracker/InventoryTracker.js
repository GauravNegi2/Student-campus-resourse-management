// src/components/InventoryTracker/InventoryTracker.js
import React, { useState, useEffect } from 'react';
import './InventoryTracker.css';

const InventoryTracker = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('http://localhost:5000/inventory');
            const data = await response.json();
            setItems(data);
        };

        fetchItems();
    }, []);

    const handleAddItem = async () => {
        if (newItem) {
            const response = await fetch('http://localhost:5000/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newItem, quantity: 1 })
            });
            const data = await response.json();
            setItems([...items, data]);
            setNewItem('');
        }
    };

    return (
        <div className="inventory-tracker">
            <h2>Inventory Tracker</h2>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add new item"
            />
            <button onClick={handleAddItem}>Add Item</button>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryTracker;