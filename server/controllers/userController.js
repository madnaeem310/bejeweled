import User from '../models/User.js';
import Order from '../models/Order.js';

// GET /api/users (admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 });

    // Aggregate order data per user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ user: user._id });
        const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
        return {
          ...user.toJSON(),
          orderCount: orders.length,
          totalSpent,
        };
      })
    );

    res.json(usersWithStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/:id (admin)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/dashboard/stats (admin)
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find({});
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

    const Product = (await import('../models/Product.js')).default;
    const totalProducts = await Product.countDocuments();

    // Monthly sales for chart
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlySales = await Order.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          sales: { $sum: '$total' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Recent orders
    const recentOrders = await Order.find({})
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalSales,
      totalOrders,
      totalUsers,
      totalProducts,
      monthlySales,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
