const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

let mockDatabase = [
       
        { id: 1, name: "SpongeBob SquarePants", age: 20, occupation: "Fry Cook" },
        { id: 2, name: "Patrick Star", age: 18, occupation: "Unemployed" },
        { id: 3, name: "Squidward Tentacles", age: 26, occupation: "Cashier" },
        { id: 4, name: "Mr. Krabs", age: 40, occupation: "Restaurant Owner" },
        { id: 5, name: "Sandy Cheeks", age: 25, occupation: "Scientist" }
    ];
    

    app.get('/api/data', (req, res) => {
        setTimeout(() => res.json(mockDatabase), 500); // Simulate delay
    });

    

    app.post('/api/data', (req, res) => {
        const { name, age } = req.body;
        const newEntry = {
            id: mockDatabase.length + 1,
            name: name,
            age: age
        };
        mockDatabase.push(newEntry);
        setTimeout(() => res.status(201).json(newEntry), 500);
    });
    
    app.put('/api/data/:id', (req, res) => {
        const { id } = req.params;
        const { name, age } = req.body;
        const index = mockDatabase.findIndex(item => item.id == id);
        if (index !== -1) {
            mockDatabase[index] = { id: Number(id), name, age };
            setTimeout(() => res.json(mockDatabase[index]), 500);
        } else {
            res.status(404).json({ message: "Entry not found" });
        }
    });
    
    app.delete('/api/data/:id', (req, res) => {
        const { id } = req.params;
        const index = mockDatabase.findIndex(item => item.id == id);
        if (index !== -1) {
            mockDatabase.splice(index, 1);
            setTimeout(() => res.status(204).send(), 500);
        } else {
            res.status(404).json({ message: "Entry not found" });
        }
    });
    