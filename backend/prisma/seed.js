const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data (in reverse order of dependencies)
    await prisma.transactionPromotion.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.eventGuest.deleteMany();
    await prisma.eventOrganizer.deleteMany();
    await prisma.promotionUsage.deleteMany();
    await prisma.event.deleteMany();
    await prisma.promotion.deleteMany();
    await prisma.user.deleteMany();

    console.log('Cleared existing data');

    // Hash password for all users
    const hashedPassword = await bcrypt.hash('Password123!', 10);

    // Create users (10+ users)
    const users = await Promise.all([
        // Superuser
        prisma.user.create({
            data: {
                utorid: 'admin123',
                name: 'Admin Superuser',
                email: 'admin@mail.utoronto.ca',
                password: hashedPassword,
                role: 'superuser',
                points: 5000,
                verified: true,
                activated: true
            }
        }),
        // Managers
        prisma.user.create({
            data: {
                utorid: 'sarahsm',
                name: 'Sarah Manager',
                email: 'sarah.manager@mail.utoronto.ca',
                password: hashedPassword,
                role: 'manager',
                points: 3000,
                verified: true,
                activated: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'johnsmit',
                name: 'John Smith',
                email: 'john.smith@mail.utoronto.ca',
                password: hashedPassword,
                role: 'manager',
                points: 2500,
                verified: true,
                activated: true
            }
        }),
        // Cashiers
        prisma.user.create({
            data: {
                utorid: 'mikecash',
                name: 'Mike Cashier',
                email: 'mike.cashier@mail.utoronto.ca',
                password: hashedPassword,
                role: 'cashier',
                points: 1500,
                verified: true,
                activated: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'emilyche',
                name: 'Emily Chen',
                email: 'emily.chen@mail.utoronto.ca',
                password: hashedPassword,
                role: 'cashier',
                points: 1800,
                verified: true,
                activated: true
            }
        }),
        // Regular users (will be organizers for events)
        prisma.user.create({
            data: {
                utorid: 'davidorg',
                name: 'David Organizer',
                email: 'david.org@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 2000,
                verified: true,
                activated: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'lisawill',
                name: 'Lisa Williams',
                email: 'lisa.williams@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 2200,
                verified: true,
                activated: true
            }
        }),
        // Regular users
        prisma.user.create({
            data: {
                utorid: 'alexjohn',
                name: 'Alex Johnson',
                email: 'alex.johnson@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 850,
                verified: true,
                activated: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'mariagar',
                name: 'Maria Garcia',
                email: 'maria.garcia@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 1200,
                verified: true,
                activated: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'jamesbro',
                name: 'James Brown',
                email: 'james.brown@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 650,
                verified: true,
                activated: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'emmadavi',
                name: 'Emma Davis',
                email: 'emma.davis@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 980,
                verified: false,
                activated: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'oliverma',
                name: 'Oliver Martinez',
                email: 'oliver.martinez@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 1450,
                verified: true,
                activated: true
            }
        })
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create promotions (5+)
    const now = new Date();
    const futureDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
    const pastDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week ago

    const promotions = await Promise.all([
        prisma.promotion.create({
            data: {
                name: 'Free Coffee',
                description: 'Redeem for a free coffee at any campus cafe',
                type: 'onetime',
                points: 100,
                startTime: now,
                endTime: futureDate,
                createdById: users[0].id // admin
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Pizza Slice',
                description: 'Get a free slice of pizza from campus food court',
                type: 'onetime',
                points: 150,
                startTime: now,
                endTime: futureDate,
                createdById: users[0].id // admin
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Library Study Room',
                description: '2-hour booking for private study room',
                type: 'onetime',
                points: 200,
                startTime: now,
                endTime: futureDate,
                createdById: users[0].id // admin
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Gym Day Pass',
                description: 'Full-day access to campus gym facilities',
                type: 'onetime',
                points: 250,
                startTime: now,
                endTime: futureDate,
                createdById: users[0].id // admin
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Campus Merch',
                description: 'UofT branded t-shirt or hoodie',
                type: 'onetime',
                points: 500,
                startTime: now,
                endTime: futureDate,
                createdById: users[0].id // admin
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Textbook Rental',
                description: 'One semester textbook rental discount',
                type: 'onetime',
                points: 300,
                startTime: pastDate,
                endTime: now, // Expired
                createdById: users[0].id // admin
            }
        })
    ]);

    console.log(`✅ Created ${promotions.length} promotions`);

    // Create events (5+)
    const futureDate1 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week from now
    const futureDate2 = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now
    const futureDate3 = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000); // 3 weeks from now
    const eventPastDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 1 week ago
    const eventPastDateEnd = new Date(eventPastDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const events = await Promise.all([
        prisma.event.create({
            data: {
                name: 'Tech Talk: AI in Healthcare',
                description: 'Learn about the latest advancements in AI technology for healthcare applications',
                location: 'BA 1190',
                startTime: futureDate1,
                endTime: new Date(futureDate1.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
                capacity: 50,
                pointsTotal: 5000, // 50 * 100
                pointsRemain: 4800,
                pointsAwarded: 200,
                published: true,
                createdById: users[0].id, // admin
                organizers: {
                    create: [{ userId: users[5].id }] // davido
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Career Fair 2024',
                description: 'Meet with top employers and explore career opportunities',
                location: 'Athletic Centre',
                startTime: futureDate2,
                endTime: new Date(futureDate2.getTime() + 4 * 60 * 60 * 1000), // 4 hours later
                capacity: 200,
                pointsTotal: 30000, // 200 * 150
                pointsRemain: 30000,
                pointsAwarded: 0,
                published: true,
                createdById: users[0].id, // admin
                organizers: {
                    create: [{ userId: users[5].id }] // davido
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Hackathon Weekend',
                description: '48-hour coding challenge with prizes and mentorship',
                location: 'Bahen Centre',
                startTime: futureDate3,
                endTime: new Date(futureDate3.getTime() + 48 * 60 * 60 * 1000), // 48 hours later
                capacity: 100,
                pointsTotal: 20000, // 100 * 200
                pointsRemain: 20000,
                pointsAwarded: 0,
                published: true,
                createdById: users[0].id, // admin
                organizers: {
                    create: [{ userId: users[6].id }] // lisaw
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Wellness Workshop',
                description: 'Mental health and stress management workshop',
                location: 'Health & Wellness Centre',
                startTime: futureDate1,
                endTime: new Date(futureDate1.getTime() + 90 * 60 * 1000), // 90 minutes later
                capacity: 30,
                pointsTotal: 2250, // 30 * 75
                pointsRemain: 2250,
                pointsAwarded: 0,
                published: true,
                createdById: users[0].id, // admin
                organizers: {
                    create: [{ userId: users[6].id }] // lisaw
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Networking Mixer',
                description: 'Connect with alumni and industry professionals',
                location: 'Faculty Club',
                startTime: futureDate2,
                endTime: new Date(futureDate2.getTime() + 3 * 60 * 60 * 1000), // 3 hours later
                capacity: 75,
                pointsTotal: 9000, // 75 * 120
                pointsRemain: 8880,
                pointsAwarded: 120,
                published: true,
                createdById: users[0].id, // admin
                organizers: {
                    create: [
                        { userId: users[5].id }, // davido
                        { userId: users[6].id }  // lisaw
                    ]
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Past Event - Already Happened',
                description: 'This event already occurred',
                location: 'Sidney Smith',
                startTime: eventPastDate,
                endTime: eventPastDateEnd,
                capacity: 40,
                pointsTotal: 3200, // 40 * 80
                pointsRemain: 3200,
                pointsAwarded: 0,
                published: false,
                createdById: users[0].id, // admin
                organizers: {
                    create: [{ userId: users[5].id }] // davido
                }
            }
        })
    ]);

    console.log(`✅ Created ${events.length} events`);

    // Add some guests to events
    await prisma.eventGuest.createMany({
        data: [
            { eventId: events[0].id, userId: users[7].id }, // alexj -> event 1
            { eventId: events[0].id, userId: users[8].id }, // mariag -> event 1
            { eventId: events[1].id, userId: users[7].id }, // alexj -> event 2
            { eventId: events[1].id, userId: users[9].id }, // jamesb -> event 2
            { eventId: events[2].id, userId: users[8].id }, // mariag -> event 3
            { eventId: events[3].id, userId: users[10].id }, // emmad -> event 4
        ]
    });

    console.log('✅ Added guests to events');

    // Create transactions (30+, at least 2 of each type)
    const transactions = [];

    // Purchase transactions (6)
    for (let i = 0; i < 6; i++) {
        transactions.push(
            prisma.transaction.create({
                data: {
                    type: 'purchase',
                    userId: users[7 + (i % 5)].id, // Rotate through regular users
                    pointsDelta: 50 + (i * 10),
                    remark: `Purchase at Campus Store - Item ${i + 1}`,
                    processed: true,
                    processedAt: new Date(),
                    createdById: users[7 + (i % 5)].id
                }
            })
        );
    }

    // Transfer transactions (8)
    transactions.push(
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[7].id, // alexj
                senderId: users[7].id,
                recipientId: users[8].id, // mariag
                pointsDelta: -100,
                remark: 'Sent points to friend',
                processed: true,
                processedAt: new Date(),
                createdById: users[7].id
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[8].id, // mariag
                senderId: users[7].id, // from alexj
                recipientId: users[8].id,
                pointsDelta: 100,
                remark: 'Received points from friend',
                processed: true,
                processedAt: new Date(),
                createdById: users[7].id
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[9].id, // jamesb
                senderId: users[9].id,
                recipientId: users[10].id, // emmad
                pointsDelta: -50,
                remark: 'Birthday gift',
                processed: true,
                processedAt: new Date(),
                createdById: users[9].id
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[10].id, // emmad
                senderId: users[9].id, // from jamesb
                recipientId: users[10].id,
                pointsDelta: 50,
                remark: 'Birthday gift received',
                processed: true,
                processedAt: new Date(),
                createdById: users[9].id
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[11].id, // oliverm
                senderId: users[11].id,
                recipientId: users[7].id, // to alexj
                pointsDelta: -75,
                remark: 'Payment for lunch',
                processed: true,
                processedAt: new Date(),
                createdById: users[11].id
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[7].id, // alexj
                senderId: users[11].id, // from oliverm
                recipientId: users[7].id,
                pointsDelta: 75,
                remark: 'Payment for lunch received',
                processed: true,
                processedAt: new Date(),
                createdById: users[11].id
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[8].id, // mariag
                senderId: users[8].id,
                recipientId: users[11].id, // to oliverm
                pointsDelta: -80,
                remark: 'Shared textbook cost',
                processed: true,
                processedAt: new Date(),
                createdById: users[8].id
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[11].id, // oliverm
                senderId: users[8].id, // from mariag
                recipientId: users[11].id,
                pointsDelta: 80,
                remark: 'Shared textbook cost received',
                processed: true,
                processedAt: new Date(),
                createdById: users[8].id
            }
        })
    );

    // Redemption transactions (6)
    transactions.push(
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[7].id,
                pointsDelta: -100,
                remark: 'Redeem: Free Coffee',
                processed: true,
                processedAt: new Date(),
                createdById: users[7].id,
                promotions: {
                    create: [{ promotionId: promotions[0].id, bonusPoints: 0 }]
                }
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[8].id,
                pointsDelta: -150,
                remark: 'Redeem: Pizza Slice',
                processed: true,
                processedAt: new Date(),
                createdById: users[8].id,
                promotions: {
                    create: [{ promotionId: promotions[1].id, bonusPoints: 0 }]
                }
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[9].id,
                pointsDelta: -200,
                remark: 'Redeem: Library Study Room',
                processed: false, // Pending
                createdById: users[9].id,
                promotions: {
                    create: [{ promotionId: promotions[2].id, bonusPoints: 0 }]
                }
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[10].id,
                pointsDelta: -250,
                remark: 'Redeem: Gym Day Pass',
                processed: false, // Pending
                createdById: users[10].id,
                promotions: {
                    create: [{ promotionId: promotions[3].id, bonusPoints: 0 }]
                }
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[11].id,
                pointsDelta: -100,
                remark: 'Redeem: Free Coffee',
                processed: true,
                processedAt: new Date(),
                createdById: users[11].id,
                promotions: {
                    create: [{ promotionId: promotions[0].id, bonusPoints: 0 }]
                }
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[7].id,
                pointsDelta: -500,
                remark: 'Redeem: Campus Merch',
                processed: false, // Pending
                suspicious: true, // Flagged as suspicious
                createdById: users[7].id,
                promotions: {
                    create: [{ promotionId: promotions[4].id, bonusPoints: 0 }]
                }
            }
        })
    );

    // Event transactions (6)
    transactions.push(
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[7].id,
                eventId: events[0].id,
                pointsDelta: 100,
                remark: 'Event attendance: Tech Talk',
                processed: true,
                processedAt: new Date(),
                createdById: users[0].id // admin
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[8].id,
                eventId: events[1].id,
                pointsDelta: 150,
                remark: 'Event attendance: Career Fair',
                processed: true,
                processedAt: new Date(),
                createdById: users[0].id // admin
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[9].id,
                eventId: events[3].id,
                pointsDelta: 75,
                remark: 'Event attendance: Wellness Workshop',
                processed: true,
                processedAt: new Date(),
                createdById: users[0].id // admin
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[10].id,
                eventId: events[0].id,
                pointsDelta: 100,
                remark: 'Event attendance: Tech Talk',
                processed: true,
                processedAt: new Date(),
                createdById: users[0].id // admin
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[11].id,
                eventId: events[4].id,
                pointsDelta: 120,
                remark: 'Event attendance: Networking Mixer',
                processed: true,
                processedAt: new Date(),
                createdById: users[0].id // admin
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[8].id,
                eventId: events[2].id,
                pointsDelta: 200,
                remark: 'Event attendance: Hackathon Weekend',
                processed: true,
                processedAt: new Date(),
                createdById: users[0].id // admin
            }
        })
    );

    // Adjustment transactions (4)
    transactions.push(
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                userId: users[7].id,
                pointsDelta: 50,
                remark: 'Manual adjustment - system error correction',
                processed: true,
                processedAt: new Date(),
                createdById: users[1].id // manager
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                userId: users[9].id,
                pointsDelta: -100,
                remark: 'Fraudulent activity penalty',
                processed: true,
                processedAt: new Date(),
                suspicious: true,
                createdById: users[1].id // manager
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                userId: users[10].id,
                pointsDelta: 200,
                remark: 'Account credit - promotional bonus',
                processed: true,
                processedAt: new Date(),
                createdById: users[1].id // manager
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                userId: users[11].id,
                pointsDelta: -50,
                remark: 'Duplicate transaction correction',
                processed: true,
                processedAt: new Date(),
                createdById: users[1].id // manager
            }
        })
    );

    await Promise.all(transactions);
    console.log(`✅ Created ${transactions.length} transactions`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   Users: ${users.length} (1 superuser, 2 managers, 2 cashiers, 7 regulars)`);
    console.log(`   Promotions: ${promotions.length}`);
    console.log(`   Events: ${events.length}`);
    console.log(`   Transactions: ${transactions.length} (6 purchase, 8 transfer, 6 redemption, 6 event, 4 adjustment)`);
    console.log('\n🔑 Login credentials:');
    console.log('   All users have password: Password123!');
    console.log('   UTORids: admin123, sarahsm, mikecash, davidorg, alexjohn, etc.');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
