#!/usr/bin/env node
'use strict';

const port = (() => {
    const args = process.argv;

    if (args.length !== 3) {
        console.error("usage: node index.js port");
        process.exit(1);
    }

    const num = parseInt(args[2], 10);
    if (isNaN(num)) {
        console.error("error: argument must be an integer.");
        process.exit(1);
    }

    return num;
})();

const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

// Global error handlers
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});

// Configure CORS to allow requests from frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true
}));

app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.warn(" JWT_SECRET is not set");
} else {
    console.log(" JWT_SECRET loaded.");
}

// ADD YOUR WORK HERE
try {
    const authRoutes = require('./src/routes/authRoutes');
    const userRoutes = require('./src/routes/userRoutes');
    const transactionsRoutes = require('./src/routes/transactionsRoutes');
    const eventsRoutes = require('./src/routes/eventsRoutes');
    const promotionsRoutes = require('./src/routes/promotionsRoutes');
    const managerRoutes = require('./src/routes/managerRoutes');

    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/transactions', transactionsRoutes);
    app.use('/events', eventsRoutes);
    app.use('/promotions', promotionsRoutes);
    app.use('/manager', managerRoutes);

    // Health check endpoint
    app.get('/health', (req, res) => {
        res.json({ status: 'ok' });
    });

} catch (err) {
    console.error('Failed to load routes:', err);
    process.exit(1);
}

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    console.error(`cannot start server: ${err.message}`);
    process.exit(1);
});
