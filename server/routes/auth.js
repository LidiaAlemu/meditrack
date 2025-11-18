// Simple authentication middleware (we'll add Clerk later)
const requireAuth = (req, res, next) => {
  // For now, we'll use a mock user ID
  // In Phase 5, we'll replace this with real Clerk authentication
  req.userId = "mock_user_id_123";
  next();
};

module.exports = requireAuth;