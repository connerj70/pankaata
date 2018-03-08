module.exports = {
    checkForSession: function(req, res, next) {
        if (!req.session.user) {
            req.session.user = { firstVisit: true, subscribed: false };
        } else {
            req.session.user.firstVisit = false;
        }
        next();
    }
};
