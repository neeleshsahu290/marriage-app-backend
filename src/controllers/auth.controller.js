const authService = require("../services/user.service");

exports.login = async (req, res) => {
  const user = await authService.syncUser(req.user);
  res.json({ success: true, name :"neeel" });
};

exports.me = async (req, res) => {
//  re s.json(req.user);
};