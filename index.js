//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

//Listen for individual clients/users to connect
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);

    //Listen for a message named 'msg' from this client
    socket.on('msg', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.sockets.emit('msg', data);

        //Send a response to all other clients, not including this one
        // socket.broadcast.emit('msg', data);

        //Send a response to just this client
        // socket.emit('msg', data);
    });

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});


// let express = require('express');
// let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());


//DB initial code
let Datastore = require('nedb');
let db = new Datastore('water.db');
db.loadDatabase();

let thirst = [];

// add a route on server, that is listening for a post request
app.post('/noJugs', (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        water: req.body.number
    }
    //insert water data into the database
    db.insert(obj,(err, newDocs)=>{
        if(err) {
            res.json({task: "task failed"});
        } else {
            res.json({task:"success"});
        }

    })

})
// serve the static files in public
app.use('/', express.static('public'));


//add route to get all the water information
app.get('/getJugs', (req,res)=> {

    db.find({}, (err, docs)=> {
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }

    })

});
app.listen(3001, ()=> {
    console.log("listening at localhost:3000");
})