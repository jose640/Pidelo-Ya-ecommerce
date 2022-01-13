// Acceso solo para Usuarios.
const userMiddleware = {
    user: (req, res, next) => {
        next()
        /* if (req.session.user == undefined) {
            throw new Error("Accede antes de acceder aqui")
        }

        if (req.session.user.id != req.params.id) {
            throw new Error("Pillin este no es tu usuario")
        } else {
            next();
        }; */
    },
};

module.exports = userMiddleware;