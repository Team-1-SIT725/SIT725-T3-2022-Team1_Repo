// redirects authenticated users

const protectRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Please log in to continue");
    res.redirect("/login.html");
};

module.exports = {
    protectRoute,
   
};
