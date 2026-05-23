function adminAuth(req, res, next) {
const token = req.headers["x-admin-token"];
if (token === process.env.ADMIN_SECRET) {
next();
} else {
res.status(401).json({ error: "Unauthorized" });
}
}
module.exports = adminAuth;