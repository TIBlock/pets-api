var express = require('express');
var bodyParser = require('body-parser');
var uuidv1 = require('uuid/v1');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()) 

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners

app.get('/api/owners', (req, res, nextFn) => {
    console.log(req.params)
    res.send(owners)
});

// GET /api/owners/:id

app.get('/api/owners/:id', (req, res, nextFn) => {
    const ownerByID = owners.find((owner) => {
        if (owner.id.toString() === req.params.id) {
            return res.send(owner);
        }
    });
});

// POST /api/owners

app.post('/api/owners', (req, res, nextFn) => {
    newOwner = { 
        id: uuidv1(), 
        name: req.body.name,
        pets: req.body.pets,
    };
    owners.push(newOwner);
    res.send(`This is an updated list of all the pet owners: ${res.send(owners)}`)
});

// PUT /api/owners/:id

app.put('/api/owners/:id', (req, res, nextFn) => {
    const foundOwner = owners.find((owner) => {
        if (owner.id.toString() === req.params.id) {
            console.log(owner);
            return owner
        }
    });
    foundOwner.name = req.body.name
    res.send(`This is an updated list of all the pet owners: ${res.send(owners)}`)
});

// DELETE /api/owners/:id

app.delete('/api/owners/:id', (req, res, nextFn) => {
    console.log(req.params)
    owners = owners.filter((owner) => {
        if (owner.id.toString() !== req.params.id) {
            return true;
        }
        else {
            return false;
        }
    });
    res.send(owners)
});

// GET /api/owners/:id/pets

// GET /api/owners/:id/pets/:petId

// POST /api/owners/:id/pets

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})