const app = require('express')();
const PORT = 4000;
const coordinates = require(`./coordinates.json`);

const costPerUnit = 100; //Cost per unit distance between cities

// Function to calculate distance between two coordinates
const distance = (coords1, coords2) => {
    return Math.sqrt(Math.pow(Math.abs(coords1.x - coords2.x), 2) + Math.pow(Math.abs(coords1.y - coords2.y), 2));
}

// Function to validate the input
const validate = (start, end, middlestop) => {
    if (start == null) throw new Error("Error: Insufficient Data, Start City is not given")
    if (end == null) throw new Error("Error: Insufficient Data, End City is not given")
    if (coordinates[start] == null) throw new Error("Error: Start City does not exist")
    if (coordinates[end] == null) throw new Error("Error: End City does not exist")
    if (middlestop != null && coordinates[middlestop] == null) throw new Error("Error: Middle Stop does not exist")
}

app.get('/cost', (req, res) => {
    try {
        let { start, end, middlestop } = req.query;

        validate(start, end, middlestop);

        let dist;

        if (middlestop != null) {
            dist = distance(coordinates[start], coordinates[middlestop]) + distance(coordinates[middlestop], coordinates[end]);
        }
        else dist = distance(coordinates[start], coordinates[end]);

        const totalCost = dist * costPerUnit;
        const totalCostInPaise = totalCost * 100;

        res.status(200).send(`${totalCostInPaise}`);
    }
    catch (e) {
        console.log("Error in calculating cost", e.message);
        res.status = 500;
        res.send(`${e.message}`);
    }
});

app.listen(
    PORT,
    () => console.log('server started')
)