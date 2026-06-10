import jwt from "jsonwebtoken";
function verifyToken(token, secret) {
    if (!token || !secret) {
        return null;
    }
    try {
        return jwt.verify(token, secret);
    }
    catch {
        return null;
    }
}
export const requireAdmin = (req, res, next) => {
    const adminToken = req.cookies?.adminToken;
    const decoded = verifyToken(adminToken, process.env.ADMIN_JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ message: "Admin authorization required" });
        return;
    }
    next();
};
export const requireAuthenticated = (req, res, next) => {
    const adminToken = req.cookies?.adminToken;
    const donorToken = req.cookies?.donorToken;
    const isAdmin = Boolean(verifyToken(adminToken, process.env.ADMIN_JWT_SECRET));
    const isDonor = Boolean(verifyToken(donorToken, process.env.DONOR_JWT_SECRET));
    if (!isAdmin && !isDonor) {
        res.status(401).json({ message: "Authentication required" });
        return;
    }
    next();
};
