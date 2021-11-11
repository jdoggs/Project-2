let express = require('express');
let app = express();
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
app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})