const getDashboard = (req, res) => {
  res.json({
    message: 'Welcome to Dashboard',
    user: req.user,
  });
};

const getAdminPage = (req, res) => {
  res.json({
    message: 'Welcome Admin!',
    user: req.user,
  });
};

const getManagerPage = (req, res) => {
  res.json({
    message: 'Welcome Manager!',
    user: req.user,
  });
};

const getProfilePage = (req, res) => {
  res.json({
    message: 'Welcome to your Profile',
    user: req.user,
  });
};

module.exports = { getDashboard, getAdminPage, getManagerPage, getProfilePage };