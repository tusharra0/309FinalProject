const prisma = require('../utils/prisma');

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await prisma.user.count();

        const totalTransactions = await prisma.transaction.count();

        const pointsIssuedAgg = await prisma.transaction.aggregate({
            _sum: {
                pointsDelta: true
            },
            where: {
                pointsDelta: {
                    gt: 0
                }
            }
        });
        const pointsIssued = pointsIssuedAgg._sum.pointsDelta || 0;

        const pointsRedeemedAgg = await prisma.transaction.aggregate({
            _sum: {
                pointsDelta: true
            },
            where: {
                pointsDelta: {
                    lt: 0
                }
            }
        });
        const pointsRedeemed = Math.abs(pointsRedeemedAgg._sum.pointsDelta || 0);

        res.json({
            totalUsers,
            totalTransactions,
            pointsIssued,
            pointsRedeemed
        });

    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
};

module.exports = {
    getDashboardStats
};
