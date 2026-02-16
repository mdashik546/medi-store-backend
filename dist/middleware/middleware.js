import { auth } from "../lib/auth.js";
export var UserRole;
(function (UserRole) {
    UserRole["CUSTOMER"] = "CUSTOMER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["SELLER"] = "SELLER";
})(UserRole || (UserRole = {}));
export const middleware = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await auth.api.getSession({
                headers: req.headers,
            });
            if (!session) {
                return res.status(404).json({
                    message: "You are unauthorized",
                });
            }
            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email verfication requried!. Please verify your email",
                });
            }
            req.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role,
                emailVerified: session.user.emailVerified,
            };
            if (roles.length && !roles.includes(req.user?.role)) {
                return res.status(403).json({
                    succes: false,
                    message: "Forbidden! You don't have permission to access this resources",
                });
            }
            next();
        }
        catch (error) {
            throw error;
        }
    };
};
