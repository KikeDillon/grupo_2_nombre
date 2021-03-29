function guestMiddleware (req, res, next){
    if(req.session.usuarioLogueado){
        return res.redirect('/perfil');
    }else{
        next();
    }
}

module.exports = guestMiddleware;