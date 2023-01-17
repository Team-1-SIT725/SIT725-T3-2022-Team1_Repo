




const profileUser = (req, res) => {
    let data= 
    {
        user: req.user.name,
        location: req.user.location,
        userID: req.user._id,
        verified:req.user.addressVer,
    }
    res.json(data);
}
module.exports = {
    profileUser,
};