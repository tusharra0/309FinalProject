#!/usr/bin/env node
'use strict';

/**
 * Comprehensive seed script to populate the database with test data
 * Includes: 15 users, 35+ transactions, 8 events, 8 promotions
 * Usage: npm run seed
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// Helper function to create dates relative to now
const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);
const daysFromNow = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);
const hoursAgo = (hours) => new Date(Date.now() - hours * 60 * 60 * 1000);

async function main() {
    console.log('Starting database seed...\n');

    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.transactionPromotion.deleteMany();
    await prisma.promotionUsage.deleteMany();
    await prisma.eventGuest.deleteMany();
    await prisma.eventOrganizer.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.event.deleteMany();
    await prisma.promotion.deleteMany();
    await prisma.user.deleteMany();
    console.log('Cleared existing data\n');

    // ============================================
    // USERS (15 total: 1 superuser, 2 managers, 3 cashiers, 9 regular)
    // ============================================
    console.log('Creating users...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await Promise.all([
        // Superuser
        prisma.user.create({
            data: {
                utorid: 'superadmin',
                email: 'superadmin@mail.utoronto.ca',
                name: 'Super Admin',
                password: hashedPassword,
                role: 'superuser',
                verified: true,
                activated: true,
                points: 500,
                lastLogin: hoursAgo(2),
                createdAt: daysAgo(180)
            }
        }),

        // Managers
        prisma.user.create({
            data: {
                utorid: 'manager1',
                email: 'manager1@mail.utoronto.ca',
                name: 'Alice Johnson',
                password: hashedPassword,
                role: 'manager',
                verified: true,
                activated: true,
                points: 350,
                lastLogin: hoursAgo(5),
                createdAt: daysAgo(150)
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'manager2',
                email: 'manager2@mail.utoronto.ca',
                name: 'Bob Chen',
                password: hashedPassword,
                role: 'manager',
                verified: true,
                activated: true,
                points: 280,
                lastLogin: daysAgo(1),
                createdAt: daysAgo(120)
            }
        }),

        // Cashiers
        prisma.user.create({
            data: {
                utorid: 'cashier1',
                email: 'cashier1@mail.utoronto.ca',
                name: 'Carol Martinez',
                password: hashedPassword,
                role: 'cashier',
                verified: true,
                activated: true,
                points: 220,
                lastLogin: hoursAgo(1),
                createdAt: daysAgo(90)
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'cashier2',
                email: 'cashier2@mail.utoronto.ca',
                name: 'David Kim',
                password: hashedPassword,
                role: 'cashier',
                verified: true,
                activated: true,
                points: 180,
                lastLogin: hoursAgo(3),
                createdAt: daysAgo(85)
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'cashier3',
                email: 'cashier3@mail.utoronto.ca',
                name: 'Emma Wilson',
                password: hashedPassword,
                role: 'cashier',
                verified: true,
                activated: true,
                points: 150,
                lastLogin: hoursAgo(6),
                createdAt: daysAgo(75)
            }
        }),

        // Regular users (activated)
        prisma.user.create({
            data: {
                utorid: 'student1',
                email: 'student1@mail.utoronto.ca',
                name: 'Frank Anderson',
                password: hashedPassword,
                role: 'regular',
                verified: true,
                activated: true,
                points: 450,
                birthday: new Date('2002-03-15'),
                lastLogin: hoursAgo(4),
                createdAt: daysAgo(60)
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'student2',
                email: 'student2@mail.utoronto.ca',
                name: 'Grace Lee',
                password: hashedPassword,
                role: 'regular',
                verified: true,
                activated: true,
                points: 380,
                birthday: new Date('2001-07-22'),
                lastLogin: hoursAgo(8),
                createdAt: daysAgo(55)
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'student3',
                email: 'student3@mail.utoronto.ca',
                name: 'Henry Patel',
                password: hashedPassword,
                role: 'regular',
                verified: true,
                activated: true,
                points: 320,
                birthday: new Date('2003-11-08'),
                lastLogin: daysAgo(2),
                createdAt: daysAgo(50)
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'student4',
                email: 'student4@mail.utoronto.ca',
                name: 'Iris Thompson',
                password: hashedPassword,
                role: 'regular',
                verified: true,
                activated: true,
                points: 290,
                birthday: new Date('2002-05-30'),
                lastLogin: hoursAgo(12),
                createdAt: daysAgo(45)
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'student5',
                email: 'student5@mail.utoronto.ca',
                name: 'Jack Robinson',
                password: hashedPassword,
                role: 'regular',
                verified: true,
                activated: true,
                points: 260,
                birthday: new Date('2001-09-14'),
                lastLogin: daysAgo(3),
                createdAt: daysAgo(40)
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'student6',
                email: 'student6@mail.utoronto.ca',
                name: 'Kelly Zhang',
                password: hashedPassword,
                role: 'regular',
                verified: true,
                activated: true,
                points: 210,
                birthday: new Date('2003-01-25'),
                lastLogin: hoursAgo(16),
                createdAt: daysAgo(35)
            }
        }),

        // Regular users (verified but not activated - no lastLogin)
        prisma.user.create({
            data: {
                utorid: 'newuser1',
                email: 'newuser1@mail.utoronto.ca',
                name: 'Liam Brown',
                password: hashedPassword,
                role: 'regular',
                verified: true,
                activated: false,
                points: 0,
                createdAt: daysAgo(10)
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'newuser2',
                email: 'newuser2@mail.utoronto.ca',
                name: 'Mia Garcia',
                password: hashedPassword,
                role: 'regular',
                verified: true,
                activated: false,
                points: 0,
                createdAt: daysAgo(5)
            }
        }),

        // Unverified user
        prisma.user.create({
            data: {
                utorid: 'pending1',
                email: 'pending1@mail.utoronto.ca',
                name: 'Noah Davis',
                role: 'regular',
                verified: false,
                activated: false,
                points: 0,
                createdAt: daysAgo(2)
            }
        })
    ]);

    console.log(`Created ${users.length} users\n`);

    // ============================================
    // PROMOTIONS (8 total: mix of automatic and one-time)
    // ============================================
    console.log('Creating promotions...');

    const promotions = await Promise.all([
        // Active automatic promotions
        prisma.promotion.create({
            data: {
                name: 'Holiday Bonus',
                description: 'Get 10% bonus points on all purchases during the holiday season!',
                type: 'automatic',
                minSpending: 5.0,
                rate: 0.10,
                startTime: daysAgo(30),
                endTime: daysFromNow(30),
                oneTime: false,
                createdById: users[1].id, // manager1
                createdAt: daysAgo(30)
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Big Spender Reward',
                description: 'Spend $20 or more and get 50 bonus points!',
                type: 'automatic',
                minSpending: 20.0,
                points: 50,
                startTime: daysAgo(20),
                endTime: daysFromNow(40),
                oneTime: false,
                createdById: users[1].id,
                createdAt: daysAgo(20)
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Weekend Special',
                description: '15% bonus on weekend purchases',
                type: 'automatic',
                minSpending: 10.0,
                rate: 0.15,
                startTime: daysAgo(10),
                endTime: daysFromNow(20),
                oneTime: false,
                createdById: users[2].id, // manager2
                createdAt: daysAgo(10)
            }
        }),

        // Active one-time promotions
        prisma.promotion.create({
            data: {
                name: 'First Purchase Bonus',
                description: 'New members get 100 bonus points on their first purchase!',
                type: 'onetime',
                minSpending: 5.0,
                points: 100,
                startTime: daysAgo(60),
                endTime: daysFromNow(60),
                oneTime: true,
                createdById: users[1].id,
                createdAt: daysAgo(60)
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Welcome Gift',
                description: 'One-time 25 point bonus for new students',
                type: 'onetime',
                minSpending: 1.0,
                points: 25,
                startTime: daysAgo(45),
                endTime: daysFromNow(45),
                oneTime: true,
                createdById: users[2].id,
                createdAt: daysAgo(45)
            }
        }),

        // Expired promotion
        prisma.promotion.create({
            data: {
                name: 'Back to School Sale',
                description: 'September special - 20% bonus points',
                type: 'automatic',
                minSpending: 10.0,
                rate: 0.20,
                startTime: daysAgo(90),
                endTime: daysAgo(30),
                oneTime: false,
                createdById: users[1].id,
                createdAt: daysAgo(90)
            }
        }),

        // Future promotion
        prisma.promotion.create({
            data: {
                name: 'Spring Break Promo',
                description: 'Coming soon - double points on all purchases!',
                type: 'automatic',
                minSpending: 5.0,
                rate: 1.0,
                startTime: daysFromNow(30),
                endTime: daysFromNow(60),
                oneTime: false,
                createdById: users[2].id,
                createdAt: daysAgo(5)
            }
        }),

        // Another future one-time
        prisma.promotion.create({
            data: {
                name: 'Summer Kickoff',
                description: 'One-time 200 point bonus for summer start',
                type: 'onetime',
                minSpending: 15.0,
                points: 200,
                startTime: daysFromNow(45),
                endTime: daysFromNow(75),
                oneTime: true,
                createdById: users[1].id,
                createdAt: daysAgo(3)
            }
        })
    ]);

    console.log(`Created ${promotions.length} promotions\n`);

    // ============================================
    // EVENTS (8 total: mix of past, current, and future)
    // ============================================
    console.log('Creating events...');

    const events = await Promise.all([
        // Past events
        prisma.event.create({
            data: {
                name: 'CS Orientation Week',
                description: 'Welcome new CS students to the department',
                location: 'Bahen Centre, BA1190',
                startTime: daysAgo(60),
                endTime: daysAgo(59),
                capacity: 100,
                pointsTotal: 500,
                pointsRemain: 0,
                pointsAwarded: 500,
                published: true,
                createdById: users[1].id,
                createdAt: daysAgo(70)
            }
        }),
        prisma.event.create({
            data: {
                name: 'Hackathon 2024',
                description: '24-hour coding competition with prizes',
                location: 'Myhal Centre',
                startTime: daysAgo(45),
                endTime: daysAgo(44),
                capacity: 80,
                pointsTotal: 800,
                pointsRemain: 0,
                pointsAwarded: 800,
                published: true,
                createdById: users[2].id,
                createdAt: daysAgo(50)
            }
        }),

        // Current/recent events
        prisma.event.create({
            data: {
                name: 'Study Session: Algorithms',
                description: 'Group study session for CSC373',
                location: 'Gerstein Library, Room 302',
                startTime: daysAgo(2),
                endTime: daysAgo(2),
                capacity: 30,
                pointsTotal: 300,
                pointsRemain: 50,
                pointsAwarded: 250,
                published: true,
                createdById: users[1].id,
                createdAt: daysAgo(10)
            }
        }),
        prisma.event.create({
            data: {
                name: 'Tech Talk: AI in Healthcare',
                description: 'Guest speaker from SickKids Hospital',
                location: 'Bahen Centre, BA1170',
                startTime: hoursAgo(24),
                endTime: hoursAgo(22),
                capacity: 50,
                pointsTotal: 400,
                pointsRemain: 100,
                pointsAwarded: 300,
                published: true,
                createdById: users[2].id,
                createdAt: daysAgo(15)
            }
        }),

        // Upcoming events
        prisma.event.create({
            data: {
                name: 'Career Fair 2025',
                description: 'Meet recruiters from top tech companies',
                location: 'Hart House, Great Hall',
                startTime: daysFromNow(7),
                endTime: daysFromNow(7),
                capacity: 200,
                pointsTotal: 1000,
                pointsRemain: 1000,
                pointsAwarded: 0,
                published: true,
                createdById: users[1].id,
                createdAt: daysAgo(20)
            }
        }),
        prisma.event.create({
            data: {
                name: 'Game Night',
                description: 'Board games and video games social event',
                location: 'CSSU Lounge, BA2250',
                startTime: daysFromNow(3),
                endTime: daysFromNow(3),
                capacity: 40,
                pointsTotal: 200,
                pointsRemain: 200,
                pointsAwarded: 0,
                published: true,
                createdById: users[2].id,
                createdAt: daysAgo(5)
            }
        }),
        prisma.event.create({
            data: {
                name: 'Resume Workshop',
                description: 'Learn how to write an effective tech resume',
                location: 'Online (Zoom)',
                startTime: daysFromNow(14),
                endTime: daysFromNow(14),
                capacity: 60,
                pointsTotal: 300,
                pointsRemain: 300,
                pointsAwarded: 0,
                published: true,
                createdById: users[1].id,
                createdAt: daysAgo(8)
            }
        }),

        // Unpublished/draft event
        prisma.event.create({
            data: {
                name: 'End of Year Party',
                description: 'Celebration for graduating students',
                location: 'TBD',
                startTime: daysFromNow(60),
                endTime: daysFromNow(60),
                capacity: 150,
                pointsTotal: 750,
                pointsRemain: 750,
                pointsAwarded: 0,
                published: false,
                createdById: users[2].id,
                createdAt: daysAgo(2)
            }
        })
    ]);

    console.log(`Created ${events.length} events\n`);

    // Add event organizers and guests
    console.log('Adding event organizers and guests...');

    await Promise.all([
        // Event 1 organizers and guests
        prisma.eventOrganizer.create({ data: { eventId: events[0].id, userId: users[3].id } }),
        prisma.eventGuest.create({ data: { eventId: events[0].id, userId: users[6].id } }),
        prisma.eventGuest.create({ data: { eventId: events[0].id, userId: users[7].id } }),
        prisma.eventGuest.create({ data: { eventId: events[0].id, userId: users[8].id } }),

        // Event 2 organizers and guests
        prisma.eventOrganizer.create({ data: { eventId: events[1].id, userId: users[4].id } }),
        prisma.eventGuest.create({ data: { eventId: events[1].id, userId: users[6].id } }),
        prisma.eventGuest.create({ data: { eventId: events[1].id, userId: users[9].id } }),

        // Event 3 organizers and guests
        prisma.eventOrganizer.create({ data: { eventId: events[2].id, userId: users[5].id } }),
        prisma.eventGuest.create({ data: { eventId: events[2].id, userId: users[7].id } }),
        prisma.eventGuest.create({ data: { eventId: events[2].id, userId: users[10].id } }),

        // Event 4 guests
        prisma.eventGuest.create({ data: { eventId: events[3].id, userId: users[8].id } }),
        prisma.eventGuest.create({ data: { eventId: events[3].id, userId: users[11].id } }),

        // Event 5 (upcoming) guests
        prisma.eventGuest.create({ data: { eventId: events[4].id, userId: users[6].id } }),
        prisma.eventGuest.create({ data: { eventId: events[4].id, userId: users[7].id } }),
        prisma.eventGuest.create({ data: { eventId: events[4].id, userId: users[9].id } })
    ]);

    console.log('Added event organizers and guests\n');

    // ============================================
    // TRANSACTIONS (40+ total, covering all types)
    // ============================================
    console.log('Creating transactions...');

    const transactions = [];

    // PURCHASE transactions (15 total)
    const purchases = await Promise.all([
        // Regular purchases without promotions
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 10,
                spent: 10.50,
                remark: 'Coffee and snack',
                userId: users[6].id,
                createdById: users[3].id,
                createdAt: daysAgo(55)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 8,
                spent: 8.25,
                remark: 'Lunch special',
                userId: users[7].id,
                createdById: users[4].id,
                createdAt: daysAgo(50)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 15,
                spent: 15.75,
                remark: 'Textbook purchase',
                userId: users[8].id,
                createdById: users[3].id,
                createdAt: daysAgo(45)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 12,
                spent: 12.00,
                remark: 'CSSU merchandise',
                userId: users[9].id,
                createdById: users[5].id,
                createdAt: daysAgo(40)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 6,
                spent: 6.50,
                remark: 'Snacks',
                userId: users[10].id,
                createdById: users[4].id,
                createdAt: daysAgo(35)
            }
        }),

        // Purchases with promotions
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 25,
                spent: 25.00,
                remark: 'Large purchase with bonus',
                userId: users[6].id,
                createdById: users[3].id,
                createdAt: daysAgo(25)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 22,
                spent: 20.00,
                remark: 'Qualified for big spender reward',
                userId: users[7].id,
                createdById: users[4].id,
                createdAt: daysAgo(20)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 18,
                spent: 16.00,
                remark: 'Weekend purchase with bonus',
                userId: users[8].id,
                createdById: users[5].id,
                createdAt: daysAgo(15)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 14,
                spent: 12.50,
                remark: 'Holiday bonus applied',
                userId: users[9].id,
                createdById: users[3].id,
                createdAt: daysAgo(12)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 11,
                spent: 10.00,
                remark: 'Coffee run',
                userId: users[10].id,
                createdById: users[4].id,
                createdAt: daysAgo(10)
            }
        }),

        // Recent purchases
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 9,
                spent: 9.25,
                remark: 'Breakfast sandwich',
                userId: users[11].id,
                createdById: users[5].id,
                createdAt: daysAgo(8)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 20,
                spent: 18.50,
                remark: 'Study supplies',
                userId: users[6].id,
                createdById: users[3].id,
                createdAt: daysAgo(5)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 7,
                spent: 7.00,
                remark: 'Energy drinks',
                userId: users[7].id,
                createdById: users[4].id,
                createdAt: daysAgo(3)
            }
        }),

        // Suspicious purchase
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 100,
                spent: 100.00,
                remark: 'Unusually large purchase',
                suspicious: true,
                userId: users[8].id,
                createdById: users[5].id,
                createdAt: daysAgo(2)
            }
        }),

        // Very recent purchase
        prisma.transaction.create({
            data: {
                type: 'purchase',
                pointsDelta: 5,
                spent: 5.50,
                remark: 'Quick snack',
                userId: users[9].id,
                createdById: users[3].id,
                createdAt: hoursAgo(6)
            }
        })
    ]);

    transactions.push(...purchases);

    // Add promotion links to some purchases
    await Promise.all([
        prisma.transactionPromotion.create({
            data: {
                transactionId: purchases[5].id,
                promotionId: promotions[0].id,
                bonusPoints: 3
            }
        }),
        prisma.transactionPromotion.create({
            data: {
                transactionId: purchases[6].id,
                promotionId: promotions[1].id,
                bonusPoints: 50
            }
        }),
        prisma.transactionPromotion.create({
            data: {
                transactionId: purchases[7].id,
                promotionId: promotions[2].id,
                bonusPoints: 2
            }
        }),
        prisma.transactionPromotion.create({
            data: {
                transactionId: purchases[8].id,
                promotionId: promotions[0].id,
                bonusPoints: 1
            }
        })
    ]);

    // TRANSFER transactions (8 total)
    const transfers = await Promise.all([
        prisma.transaction.create({
            data: {
                type: 'transfer',
                pointsDelta: -50,
                remark: 'Thanks for helping with homework!',
                userId: users[6].id,
                senderId: users[6].id,
                recipientId: users[7].id,
                createdById: users[6].id,
                createdAt: daysAgo(30)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                pointsDelta: -30,
                remark: 'Birthday gift',
                userId: users[7].id,
                senderId: users[7].id,
                recipientId: users[8].id,
                createdById: users[7].id,
                createdAt: daysAgo(25)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                pointsDelta: -25,
                remark: 'Splitting lunch cost',
                userId: users[8].id,
                senderId: users[8].id,
                recipientId: users[9].id,
                createdById: users[8].id,
                createdAt: daysAgo(20)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                pointsDelta: -40,
                remark: 'Paying back points',
                userId: users[9].id,
                senderId: users[9].id,
                recipientId: users[6].id,
                createdById: users[9].id,
                createdAt: daysAgo(15)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                pointsDelta: -20,
                remark: 'Group project contribution',
                userId: users[10].id,
                senderId: users[10].id,
                recipientId: users[11].id,
                createdById: users[10].id,
                createdAt: daysAgo(10)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                pointsDelta: -15,
                remark: 'Coffee debt',
                userId: users[11].id,
                senderId: users[11].id,
                recipientId: users[6].id,
                createdById: users[11].id,
                createdAt: daysAgo(7)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                pointsDelta: -35,
                remark: 'Thanks for the notes!',
                userId: users[6].id,
                senderId: users[6].id,
                recipientId: users[10].id,
                createdById: users[6].id,
                createdAt: daysAgo(4)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                pointsDelta: -10,
                remark: 'Sharing points',
                userId: users[7].id,
                senderId: users[7].id,
                recipientId: users[9].id,
                createdById: users[7].id,
                createdAt: hoursAgo(12)
            }
        })
    ]);

    transactions.push(...transfers);

    // ADJUSTMENT transactions (6 total)
    const adjustments = await Promise.all([
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                pointsDelta: 50,
                remark: 'Correction for system error',
                userId: users[6].id,
                createdById: users[1].id,
                createdAt: daysAgo(40)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                pointsDelta: -25,
                remark: 'Duplicate purchase correction',
                userId: users[7].id,
                createdById: users[2].id,
                relatedTransactionId: purchases[1].id,
                createdAt: daysAgo(35)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                pointsDelta: 100,
                remark: 'Bonus for excellent participation',
                userId: users[8].id,
                createdById: users[1].id,
                createdAt: daysAgo(28)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                pointsDelta: -15,
                remark: 'Reversal of incorrect transaction',
                userId: users[9].id,
                createdById: users[2].id,
                createdAt: daysAgo(18)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                pointsDelta: 75,
                remark: 'Compensation for event cancellation',
                userId: users[10].id,
                createdById: users[1].id,
                createdAt: daysAgo(12)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                pointsDelta: 30,
                remark: 'Manual bonus points',
                userId: users[11].id,
                createdById: users[2].id,
                createdAt: daysAgo(6)
            }
        })
    ]);

    transactions.push(...adjustments);

    // REDEMPTION transactions (6 total: 3 pending, 3 processed)
    const redemptions = await Promise.all([
        // Processed redemptions
        prisma.transaction.create({
            data: {
                type: 'redemption',
                pointsDelta: 100,
                remark: 'Redeemed for gift card',
                processed: true,
                processedAt: daysAgo(22),
                userId: users[6].id,
                createdById: users[6].id,
                processedById: users[3].id,
                createdAt: daysAgo(23)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                pointsDelta: 75,
                remark: 'Merchandise redemption',
                processed: true,
                processedAt: daysAgo(14),
                userId: users[7].id,
                createdById: users[7].id,
                processedById: users[4].id,
                createdAt: daysAgo(15)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                pointsDelta: 50,
                remark: 'Event ticket redemption',
                processed: true,
                processedAt: daysAgo(8),
                userId: users[8].id,
                createdById: users[8].id,
                processedById: users[5].id,
                createdAt: daysAgo(9)
            }
        }),

        // Pending redemptions
        prisma.transaction.create({
            data: {
                type: 'redemption',
                pointsDelta: 120,
                remark: 'Pending: Premium merchandise',
                processed: false,
                userId: users[9].id,
                createdById: users[9].id,
                createdAt: daysAgo(5)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                pointsDelta: 60,
                remark: 'Pending: Gift card request',
                processed: false,
                userId: users[10].id,
                createdById: users[10].id,
                createdAt: daysAgo(2)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                pointsDelta: 80,
                remark: 'Pending: Special item',
                processed: false,
                userId: users[11].id,
                createdById: users[11].id,
                createdAt: hoursAgo(18)
            }
        })
    ]);

    transactions.push(...redemptions);

    // EVENT transactions (8 total)
    const eventTransactions = await Promise.all([
        prisma.transaction.create({
            data: {
                type: 'event',
                pointsDelta: 50,
                remark: 'Attended CS Orientation Week',
                userId: users[6].id,
                createdById: users[1].id,
                eventId: events[0].id,
                createdAt: daysAgo(59)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                pointsDelta: 50,
                remark: 'Attended CS Orientation Week',
                userId: users[7].id,
                createdById: users[1].id,
                eventId: events[0].id,
                createdAt: daysAgo(59)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                pointsDelta: 100,
                remark: 'Participated in Hackathon 2024',
                userId: users[6].id,
                createdById: users[2].id,
                eventId: events[1].id,
                createdAt: daysAgo(44)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                pointsDelta: 100,
                remark: 'Participated in Hackathon 2024',
                userId: users[9].id,
                createdById: users[2].id,
                eventId: events[1].id,
                createdAt: daysAgo(44)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                pointsDelta: 30,
                remark: 'Attended Study Session',
                userId: users[7].id,
                createdById: users[1].id,
                eventId: events[2].id,
                createdAt: daysAgo(2)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                pointsDelta: 30,
                remark: 'Attended Study Session',
                userId: users[10].id,
                createdById: users[1].id,
                eventId: events[2].id,
                createdAt: daysAgo(2)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                pointsDelta: 40,
                remark: 'Attended Tech Talk',
                userId: users[8].id,
                createdById: users[2].id,
                eventId: events[3].id,
                createdAt: hoursAgo(22)
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                pointsDelta: 40,
                remark: 'Attended Tech Talk',
                userId: users[11].id,
                createdById: users[2].id,
                eventId: events[3].id,
                createdAt: hoursAgo(22)
            }
        })
    ]);

    transactions.push(...eventTransactions);

    console.log(`Created ${transactions.length} transactions\n`);

    // ============================================
    // SUMMARY
    // ============================================
    console.log('Seed Summary:');
    console.log(`   Users: ${users.length} (1 superuser, 2 managers, 3 cashiers, 9 regular)`);
    console.log(`   Promotions: ${promotions.length} (active, expired, and future)`);
    console.log(`   Events: ${events.length} (past, current, and upcoming)`);
    console.log(`   Transactions: ${transactions.length}`);
    console.log(`     - Purchase: ${purchases.length}`);
    console.log(`     - Transfer: ${transfers.length}`);
    console.log(`     - Adjustment: ${adjustments.length}`);
    console.log(`     - Redemption: ${redemptions.length} (3 processed, 3 pending)`);
    console.log(`     - Event: ${eventTransactions.length}`);
    console.log('\n Database seeded successfully!\n');
    console.log('Test Credentials:');
    console.log('   Superuser: superadmin / password123');
    console.log('   Manager: manager1 / password123');
    console.log('   Cashier: cashier1 / password123');
    console.log('   Student: student1 / password123\n');
}

main()
    .catch((err) => {
        console.error('❌ Error seeding database:', err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
