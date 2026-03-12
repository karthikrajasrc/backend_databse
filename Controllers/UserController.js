const user = [{
    Name: "Karthik", 
    Age: 20
},
{
    Name: "Mani", 
    Age: 20
    },
{
    Name: "Kumar", 
    Age: 20
},{
    Name: "Sam", 
    Age: 20
},{
    Name: "Belsi", 
    Age: 20
},{
    Name: "Anu Prabha", 
    Age: 20
    }]

const userController = {
    getUser: (req, res) => {
        res.json(user)
    }
}

module.exports = userController;