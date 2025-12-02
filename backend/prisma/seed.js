const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data (in reverse order of dependencies)
    await prisma.transaction.deleteMany();
    await prisma.guest.deleteMany();
    await prisma.organizer.deleteMany();
    await prisma.event.deleteMany();
    await prisma.promotion.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Cleared existing data');

    // Hash password for all users
    const hashedPassword = await bcrypt.hash('Password123!', 10);

    // Create users (10+ users)
    const users = await Promise.all([
        // Superuser
        prisma.user.create({
            data: {
                utorid: 'super001',
                firstName: 'Admin',
                lastName: 'Superuser',
                email: 'admin@mail.utoronto.ca',
                password: hashedPassword,
                role: 'superuser',
                points: 5000,
                verified: true,
                active: true
            }
        }),
        // Managers
        prisma.user.create({
            data: {
                utorid: 'manager001',
                firstName: 'Sarah',
                lastName: 'Manager',
                email: 'sarah.manager@mail.utoronto.ca',
                password: hashedPassword,
                role: 'manager',
                points: 3000,
                verified: true,
                active: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'manager002',
                firstName: 'John',
                lastName: 'Smith',
                email: 'john.smith@mail.utoronto.ca',
                password: hashedPassword,
                role: 'manager',
                points: 2500,
                verified: true,
                active: true
            }
        }),
        // Cashiers
        prisma.user.create({
            data: {
                utorid: 'cashier001',
                firstName: 'Mike',
                lastName: 'Cashier',
                email: 'mike.cashier@mail.utoronto.ca',
                password: hashedPassword,
                role: 'cashier',
                points: 1500,
                verified: true,
                active: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'cashier002',
                firstName: 'Emily',
                lastName: 'Chen',
                email: 'emily.chen@mail.utoronto.ca',
                password: hashedPassword,
                role: 'cashier',
                points: 1800,
                verified: true,
                active: true
            }
        }),
        // Organizers
        prisma.user.create({
            data: {
                utorid: 'organizer001',
                firstName: 'David',
                lastName: 'Organizer',
                email: 'david.org@mail.utoronto.ca',
                password: hashedPassword,
                role: 'organizer',
                points: 2000,
                verified: true,
                active: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'organizer002',
                firstName: 'Lisa',
                lastName: 'Williams',
                email: 'lisa.williams@mail.utoronto.ca',
                password: hashedPassword,
                role: 'organizer',
                points: 2200,
                verified: true,
                active: true
            }
        }),
        // Regular users
        prisma.user.create({
            data: {
                utorid: 'student001',
                firstName: 'Alex',
                lastName: 'Johnson',
                email: 'alex.johnson@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 850,
                verified: true,
                active: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'student002',
                firstName: 'Maria',
                lastName: 'Garcia',
                email: 'maria.garcia@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 1200,
                verified: true,
                active: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'student003',
                firstName: 'James',
                lastName: 'Brown',
                email: 'james.brown@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 650,
                verified: true,
                active: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'student004',
                firstName: 'Emma',
                lastName: 'Davis',
                email: 'emma.davis@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 980,
                verified: false,
                active: true
            }
        }),
        prisma.user.create({
            data: {
                utorid: 'student005',
                firstName: 'Oliver',
                lastName: 'Martinez',
                email: 'oliver.martinez@mail.utoronto.ca',
                password: hashedPassword,
                role: 'regular',
                points: 1450,
                verified: true,
                active: true
            }
        })
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create promotions (5+)
    const promotions = await Promise.all([
        prisma.promotion.create({
            data: {
                name: 'Free Coffee',
                description: 'Redeem for a free coffee at any campus cafe',
                pointCost: 100,
                active: true
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Pizza Slice',
                description: 'Get a free slice of pizza from campus food court',
                pointCost: 150,
                active: true
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Library Study Room',
                description: '2-hour booking for private study room',
                pointCost: 200,
                active: true
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Gym Day Pass',
                description: 'Full-day access to campus gym facilities',
                pointCost: 250,
                active: true
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Campus Merch',
                description: 'UofT branded t-shirt or hoodie',
                pointCost: 500,
                active: true
            }
        }),
        prisma.promotion.create({
            data: {
                name: 'Textbook Rental',
                description: 'One semester textbook rental discount',
                pointCost: 300,
                active: false
            }
        })
    ]);

    console.log(`✅ Created ${promotions.length} promotions`);

    // Create events (5+)
    const futureDate1 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week from now
    const futureDate2 = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now
    const futureDate3 = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000); // 3 weeks from now
    const pastDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 1 week ago

    const events = await Promise.all([
        prisma.event.create({
            data: {
                name: 'Tech Talk: AI in Healthcare',
                description: 'Learn about the latest advancements in AI technology for healthcare applications',
                location: 'BA 1190',
                eventDate: futureDate1,
                maxGuests: 50,
                pointsReward: 100,
                published: true,
                organizers: {
                    create: [{ userId: users[5].id }] // organizer001
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Career Fair 2024',
                description: 'Meet with top employers and explore career opportunities',
                location: 'Athletic Centre',
                eventDate: futureDate2,
                maxGuests: 200,
                pointsReward: 150,
                published: true,
                organizers: {
                    create: [{ userId: users[5].id }] // organizer001
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Hackathon Weekend',
                description: '48-hour coding challenge with prizes and mentorship',
                location: 'Bahen Centre',
                eventDate: futureDate3,
                maxGuests: 100,
                pointsReward: 200,
                published: true,
                organizers: {
                    create: [{ userId: users[6].id }] // organizer002
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Wellness Workshop',
                description: 'Mental health and stress management workshop',
                location: 'Health & Wellness Centre',
                eventDate: futureDate1,
                maxGuests: 30,
                pointsReward: 75,
                published: true,
                organizers: {
                    create: [{ userId: users[6].id }] // organizer002
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Networking Mixer',
                description: 'Connect with alumni and industry professionals',
                location: 'Faculty Club',
                eventDate: futureDate2,
                maxGuests: 75,
                pointsReward: 120,
                published: true,
                organizers: {
                    create: [
                        { userId: users[5].id }, // organizer001
                        { userId: users[6].id }  // organizer002
                    ]
                }
            }
        }),
        prisma.event.create({
            data: {
                name: 'Past Event - Already Happened',
                description: 'This event already occurred',
                location: 'Sidney Smith',
                eventDate: pastDate,
                maxGuests: 40,
                pointsReward: 80,
                published: false,
                organizers: {
                    create: [{ userId: users[5].id }]
                }
            }
        })
    ]);

    console.log(`✅ Created ${events.length} events`);

    // Add some guests to events
    await prisma.guest.createMany({
        data: [
            { eventId: events[0].id, userId: users[7].id }, // student001 -> event 1
            { eventId: events[0].id, userId: users[8].id }, // student002 -> event 1
            { eventId: events[1].id, userId: users[7].id }, // student001 -> event 2
            { eventId: events[1].id, userId: users[9].id }, // student003 -> event 2
            { eventId: events[2].id, userId: users[8].id }, // student002 -> event 3
            { eventId: events[3].id, userId: users[10].id }, // student004 -> event 4
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
                    pointChange: 50 + (i * 10),
                    description: `Purchase at Campus Store - Item ${i + 1}`,
                    processed: true
                }
            })
        );
    }

    // Transfer transactions (8)
    transactions.push(
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[7].id, // student001
                relatedId: users[8].id, // to student002
                pointChange: -100,
                description: 'Sent points to friend',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[8].id, // student002
                relatedId: users[7].id, // from student001
                pointChange: 100,
                description: 'Received points from friend',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[9].id, // student003
                relatedId: users[10].id, // to student004
                pointChange: -50,
                description: 'Birthday gift',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[10].id, // student004
                relatedId: users[9].id, // from student003
                pointChange: 50,
                description: 'Birthday gift received',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[11].id, // student005
                relatedId: users[7].id, // to student001
                pointChange: -75,
                description: 'Payment for lunch',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[7].id, // student001
                relatedId: users[11].id, // from student005
                pointChange: 75,
                description: 'Payment for lunch received',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[8].id, // student002
                relatedId: users[11].id, // to student005
                pointChange: -80,
                description: 'Shared textbook cost',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'transfer',
                userId: users[11].id, // student005
                relatedId: users[8].id, // from student002
                pointChange: 80,
                description: 'Shared textbook cost received',
                processed: true
            }
        })
    );

    // Redemption transactions (6)
    transactions.push(
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[7].id,
                pointChange: -100,
                description: 'Redeem: Free Coffee',
                promotionId: promotions[0].id,
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[8].id,
                pointChange: -150,
                description: 'Redeem: Pizza Slice',
                promotionId: promotions[1].id,
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[9].id,
                pointChange: -200,
                description: 'Redeem: Library Study Room',
                promotionId: promotions[2].id,
                processed: false // Pending
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[10].id,
                pointChange: -250,
                description: 'Redeem: Gym Day Pass',
                promotionId: promotions[3].id,
                processed: false // Pending
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[11].id,
                pointChange: -100,
                description: 'Redeem: Free Coffee',
                promotionId: promotions[0].id,
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'redemption',
                userId: users[7].id,
                pointChange: -500,
                description: 'Redeem: Campus Merch',
                promotionId: promotions[4].id,
                processed: false, // Pending
                suspicious: true // Flagged as suspicious
            }
        })
    );

    // Event transactions (6)
    transactions.push(
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[7].id,
                pointChange: 100,
                description: 'Event attendance: Tech Talk',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[8].id,
                pointChange: 150,
                description: 'Event attendance: Career Fair',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[9].id,
                pointChange: 75,
                description: 'Event attendance: Wellness Workshop',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[10].id,
                pointChange: 100,
                description: 'Event attendance: Tech Talk',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[11].id,
                pointChange: 120,
                description: 'Event attendance: Networking Mixer',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'event',
                userId: users[8].id,
                pointChange: 200,
                description: 'Event attendance: Hackathon Weekend',
                processed: true
            }
        })
    );

    // Adjustment transactions (4)
    transactions.push(
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                userId: users[7].id,
                pointChange: 50,
                description: 'Manual adjustment - system error correction',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                userId: users[9].id,
                pointChange: -100,
                description: 'Fraudulent activity penalty',
                processed: true,
                suspicious: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                userId: users[10].id,
                pointChange: 200,
                description: 'Account credit - promotional bonus',
                processed: true
            }
        }),
        prisma.transaction.create({
            data: {
                type: 'adjustment',
                userId: users[11].id,
                pointChange: -50,
                description: 'Duplicate transaction correction',
                processed: true
            }
        })
    );

    await Promise.all(transactions);
    console.log(`✅ Created ${transactions.length} transactions`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   Users: ${users.length} (1 superuser, 2 managers, 2 cashiers, 2 organizers, 5 regulars)`);
    console.log(`   Promotions: ${promotions.length}`);
    console.log(`   Events: ${events.length}`);
    console.log(`   Transactions: ${transactions.length} (6 purchase, 8 transfer, 6 redemption, 6 event, 4 adjustment)`);
    console.log('\n🔑 Login credentials:');
    console.log('   All users have password: Password123!');
    console.log('   UTORids: super001, manager001, cashier001, organizer001, student001, etc.');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
