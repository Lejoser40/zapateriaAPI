export function isAuthenticated(req, res, next) {
    if (req.session.isLoggedIn == true) {
      // Si el usuario está autenticado, permite que la solicitud continúe
      return next();
    } else {
        // Si no está autenticado, redirige al login o envía un error
        res.status(401).json({ error: 'No autorizado' });
    }
}