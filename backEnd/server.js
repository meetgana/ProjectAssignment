var express = require ('express');
var bodyParser = require ('body-parser');
var mongoose = require ('mongoose');
var Users = require ('./models/users.js');
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
var fs = require('fs');

let app = express();
let router = express.Router();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect('mongodb://localhost:27017/users');
let connection = mongoose.connection;
connection.options = {};

/* connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
*/
router.route('/users').get((req, res) => {
    connection.db.collection("users", function (err, collection) {
        collection.find({}).toArray(function (err, users) {
            console.log (users);
            if (err)
                console.log(err);
            else
                res.json(users);
        });
    });
});

router.route('/users/add').post((req, res) => {
    console.log (req.body);
    console.log ("User Add Details");
    
    var user = new Users(req.body);

    user.save().then(user => {
        res.status(200).json({'user': 'Added successfully'});
    })
    .catch(err => {
        res.status(400).send('Failed to create new record');
    });
});


Grid.mongo = mongoose.mongo;
//let gfs = new Grid("mongodb://localhost:27017/users", mongoose.mongo);
let gfs = new Grid(connection, mongoose.mongo);

 var storage = GridFsStorage({
    url: "mongodb://localhost:27017/users",

    filename: function(req, file, cb) {
       cb(null, file.originalname);
    },

    metadata: function(req, file, cb) {
        cb(null, file.description);
     },
});

let upload = multer({
    storage: storage
}).single('file');

// Route for file upload
router.post('/upload', function (req, res) {
    upload(req,res, (err) => {
        console.log(req);
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
       }
        console.log ('Uploading a document ', req.params);
        res.json({error_code:0, error_desc: null, file_uploaded: true});
  });
});

router.route('/file/:filename').get((req, res) => {
    console.log ("Input file ", req.params.filename);

    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }

        console.log("files: ",files[0].filename);
        // create read stream
    /*    const gridFSBucket = new mongoose.mongo.GridFSBucket(connection.db);
        var readStream = gridFSBucket.openDownloadStreamByName(files[0].filename).
                  pipe(fs.createReadStream('writefile'));
        return readStream.pipe(res);
        */
        var readstream = gfs.createReadStream({
            filename: files[0].filename
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType)
        // Return response
        return readstream.pipe(res); 
    });
});

// Route for getting all the files
router.route('/files').get((req, res) => {
    let filesData = [];
    let count = 0;
 //   gfs.collection('uploadFiles'); // set the collection to look up into

    gfs.files.find({}).toArray((err, files) => {
        // Error checking
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }

        // Loop through all the files and fetch the necessary information
        files.forEach((file) => {
            filesData[count++] = {
              //  originalname: file.metadata.originalname,
                filename: file.filename,
                contentType: file.contentType
            }
        });
        res.json(filesData);
    });
});

app.use('/', router);

app.listen (4000, ()=> console.log ('Express server is running'));