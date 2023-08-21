const router = require("express").Router();
const { route } = require("express/lib/application");
const eventController = require("../controller/events.controller");
require('../config/passeport')
const passport = require('passport');

/**
 * @Path /events
 */

const multer = require("multer");
const fs = require("fs");


//upload image to server
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //get the event id from headers
        const eventId = req.headers.idevent;

        //Directory path
        const dir = `./uploads/Events/Event-${eventId}/`;
        
        //check if directory exist
        fs.exists(dir, (exist) => {
            

            if (!exist) {
                console.log(dir);
                return fs.mkdir(dir, (error) => cb(error, dir));
                
            }
            return cb(null, dir);
        });
    },

    //change filename to remove special caracters
    filename: function (req, file, cb) {
        const newFileName = file.originalname.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '_')
        cb(null, newFileName);
    },

});

const upload = multer({ storage });

// Create Event :
//1st Step : add event 
router.post("/addEvent/", passport.authenticate('jwt', { session: false }), eventController.addEvent);

//2nd step : upload event images
router.route("/uploadImages").post(upload.single('file'), eventController.uploadImages);

router.get("/getAllEvents/", eventController.getAllEvents);

//likeEvent 
router.put('/likeEvent/:idevent/',passport.authenticate('jwt',{session:false}),eventController.likeEvent );

//dislikeEvent
router.put('/unlikeEvent/:idevent/',passport.authenticate('jwt',{session:false}),eventController.unslikeEvent );

//updateEvent
router.put('/updateEvent',passport.authenticate('jwt',{session:false}),eventController.updateEvent );

module.exports = router;
