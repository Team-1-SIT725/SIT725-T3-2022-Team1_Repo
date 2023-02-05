const models = require("../models");
const item = models.itemModels.item;
const itemImages = models.itemModels.itemImages;
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const e = require("cors");

/*****************************************************************************
Function: addItem
Author: Phil Williams

Purpose: This function receives an input form the post /api/item/add route.
It saves form entries received from the frontend and saves them to the item
database. 

CRUD - Create
******************************************************************************/
const addItem = async (req, res) => {
    //Store Variables from req

    let itemName = req.body.itemName;
    let itemCategory = req.body.itemCategory;
    let itemDescription = req.body.itemDescription;
    let itemCondition = req.body.itemCondition;
    let itemSize = req.body.itemSize;
    let itemColour = req.body.itemColour;
    let itemValue = req.body.itemValue;
    let itemImagesArray = [];
    let userID = req.user._id;
    let itemAvailability = req.body.itemAvailability;

    //Store file details for all attachments
    for (let i = 0; i < req.files.length; i++) {
        const newImage = new itemImages({
            filePath: req.files[i].path,
            originalFilename: req.files[i].originalname,
            newFilename: req.files[i].filename,
            fileSize: req.files[i].size,
        });
        itemImagesArray.push(newImage);
    }

    //Create new DB item based on the Item Schema
    const newItem = new item({
        itemName: itemName,
        itemCategory: itemCategory,
        itemDescription: itemDescription,
        itemCondition: itemCondition,
        itemSize: itemSize,
        itemColour: itemColour,
        itemValue: itemValue,
        itemImages: itemImagesArray,
        userID: userID,
        itemAvailability: itemAvailability,
    });

    //saves the new item to the database
    newItem
        .save()
        .then((result) => {
            res.json({
                statusCode: 200,
                message: "Item Successfully added",
                data: result,
            });
        })

        .catch((err) => {
            console.log("Error", err);
            res.json({ statusCode: 400, message: err });
        });
};

/*****************************************************************************
Function: viewItem
Author: Phil Williams

Purpose: This function receives an input form the get /api/item/view route.
Based on the item ID provided it looks up the DB and retrieves the items
details using the ID of the user that owns the item it also looks up and 
retrieves the User name and check if the current user owns this item.
This information is returned to the frontend to display the item and restrict
edit controls

CRUD - Read
******************************************************************************/

const viewItem = async (req, res) => {
    try {
        const itemID = req.params.itemID; //take item ID from passed parameters
        const myitem = await item.findOne({ _id: itemID }).lean(); //Lookup item in DB
        if (!myitem) throw new Error("Item does not exist");

        //check if current users owns this item
        let sameUser = false;
        if (myitem.userID == req.user._id) {
            sameUser = true;
        }

        //Look up usename for item owner
        const itemUser = await User.findOne({ _id: myitem.userID }).then(
            (user) => {
                if (user) {
                    return user._doc.name;
                } else {
                    return "User Name Missing";
                }
            }
        );
        //append posting userName and same user bool
        myitem.postingUserName = itemUser;
        myitem.sameUser = sameUser;

        res.json({
            statusCode: 200,
            message: "Success",
            data: myitem,
        });
    } catch (err) {
        console.log("Error", err);
        res.json({ statusCode: 400, message: err });
    }
};

/*****************************************************************************
Function: itemImage
Author: Phil Williams

Purpose: This function receives an input form the get /api/item/itemimage route.
And returns an image based on the filename provided.
******************************************************************************/
const itemImage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../upload/" + req.params.filename));
    } catch {
        console.log("Error MSG");
        //set error handling
    }
};

/*****************************************************************************
Function: deleteItem
Author: Phil Williams

Purpose: This function receives an input form the get /api/item/delete route.
And deletes the corresponding item from the DB and deletes the images from
the upload directory. 

CRUD - Delete
******************************************************************************/

const deleteItem = async (req, res) => {
    const itemID = req.params.itemID;
    try {
        //check item exists and create document to work with
        const myitem = await item.findOne({ _id: itemID }).lean();
        // if (!myitem) throw new Error("Item does not exist");
        if (!myitem)
            return res.json({ statusCode: 400, message: "Item not found" });

        if (myitem.userID == req.user._id) {
            //check current user owns item
            //delete images
            myitem.itemImages.forEach((element) => {
                fs.unlink(`./upload/${element.newFilename}`, (err) => {
                    if (err) console.log(err);
                });
            });

            //delete DB entry
            await item
                .deleteOne({ _id: itemID }, function (err) {
                    if (err) {
                        res.json({ statusCode: 400, message: err });
                    }
                    res.json({
                        statusCode: 200,
                        message: `Item ${myitem.itemName} Deleted`,
                    });
                })
                .clone(); //forces mongoose to rerun DB query.
        }
    } catch (err) {
        return res.json({ statusCode: 400, message: err });
    }
};

/*****************************************************************************
Function: updateAvailability
Author: Phil Williams

Purpose: This function receives an input form the post
/api/item/updateavailability route.The corresponding item is updated with
the provided status.  

CRUD - Update
******************************************************************************/

const updateAvailability = async (req, res) => {
    const status = req.params.status;
    const itemID = req.params.itemID;
    try {
        //Lookup item and set new status
        await item.updateOne(
            { _id: itemID },
            { $set: { itemAvailability: status } }
        );
        res.json({
            statusCode: 200,
            message: `Item status changed to ${status}`,
        });
    } catch (err) {
        return res.json({ statusCode: 400, message: err });
    }
};

/*****************************************************************************
Function: notificationSocket
Author: Phil Williams

Purpose: Controls socket connections for the notifications name space
******************************************************************************/

const notificationSocket = (io) => {
    io.on("connection", onConnected);

    /*****************************************************************************
Function: onConnected
Author: Phil Williams

Purpose: Code runs on new notification socket connection
******************************************************************************/

    function onConnected(socket) {
        console.log(`new connection ${socket.id}`);
        //this is a conditional(ternary) operator read here for a good explanation https://www.geeksforgeeks.org/conditional-or-ternary-operator-in-c-c/
        //Like an if statement. If the user is logged in returns name from the userDB otherwise returns ""
        socket.user = socket.request.user ? socket.request.user.name : ""; //add username to socket if logged in
        socket.userID = socket.request.user ? socket.request.user.id : ""; //add userID to socket if logged in
        socket.join(socket.userID); //creates a room based on the users ID

        /*****************************************************************************
        Function: whoami
        Author: Phil Williams

        Purpose: Sends the current users name 
        ******************************************************************************/

        socket.on("whoami", (e) => {
            e(socket.user);
        });

        /*****************************************************************************
        Function: lookingAt
        Author: Phil Williams

        Purpose: Receives socket emit when someone looks at an item then send a message 
        to the item owner that someone is looking at that item.
        ******************************************************************************/

        socket.on("lookingAt", (toUserID, itemName, fromUser) => {
            //checks that user is not looking at their own item
            if (toUserID != socket.request.user.id) {
                socket
                    .to(toUserID)
                    .emit(
                        "receive-notification",
                        `${fromUser} is looking at ${itemName}`
                    );
            }
        });
    }
};

module.exports = {
    addItem,
    viewItem,
    itemImage,
    deleteItem,
    updateAvailability,
    notificationSocket,
};
