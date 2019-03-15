var express = require ('express');
var cors = require ('cors');
var bodyParser = require ('body-parser');
var mongoose = require ('mongoose');
var users = require ('./models/users');

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});


router.route('/users/add').post((req, res) => {
    let user = new users(req.body);
    console.log (req.body);

    console.log ("User Add Details");
    console.log (user);

    user.save()
        .then(user => {
            res.status(200).json({'user': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/users').get((req, res) => {
    users.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});

router.route('/users/:id').get((req, res) => {
    users.findById(req.params.id, (err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    })
});


app.use('/', router);

app.listen (4000, ()=> console.log ('Express server is running'));
