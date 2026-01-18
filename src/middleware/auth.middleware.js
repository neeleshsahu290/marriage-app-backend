// const { auth } = require("../config/firebase");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) throw new Error();

//     req.user = await auth.verifyIdToken(token);
//     next();
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };