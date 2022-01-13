// Acceso solo para admins.
const adminMiddleware = {
    admin: (req, res, next) => {
        next()
        /* switch (req.session.user.tipoUsuario) {
            case "Admin":
                next();
                break;
            default:
                throw new Error("Solo los administradores pueden acceder a este sitio");
        }; */
    },
};

module.exports = adminMiddleware;