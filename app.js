const {readData,writeData} = require('./dz_2/services')

const express = require('express')

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/users', async (req, res) => {
    const users = await readData()
    res.json(users)
});

app.post('/users', async (req,res)=>{
    const user = req.body;

    if (typeof user.name !== 'string' || user.name.length < 2) {
        return res.status(400).json('Incorrect Name');
    }

    if (typeof user.age !== 'number' || user.age < 0) {
        return res.status(400).json('Incorrect Age');
    }

    const users = await readData();

    const newUser = {
        id: users.at(-1) ? users.at(-1).id+1 : 1,
        name: user.name,
        age: user.age,
    };

    users.push(newUser)
    await writeData(users)

    res.json(newUser)
})

app.get('/users/:id', async (req, res) => {
    const {id} = req.params;
    const users = await readData()

    const user = users.find(u => u.id === +id);
    if(!user) return res.status(404).json(`User not found`);

    res.json(user);
});

app.put('/users/:id', async (req, res) => {
    const updateUser = req.body;
    const {id} = req.params;

    const users = await readData()

    const newUsers = users.map(user => {
        if (user.id === +id) return {...user, ...updateUser}
        return user
    })

    await writeData(newUsers);
    res.status(201).json(newUsers)

});

app.delete('/users/:id', async (req,res)=>{

    const {id} = req.params;

    const users = await readData()
    const index = users.findIndex(user => user.id === +id);
    console.log(index)

    if(index===-1) return res.status(404).json(`User not found`);
    users.splice(index,1);  // or filter

    await writeData(users)

    res.json(users)

})


app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT} PORT`));
