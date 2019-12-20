const express = require('express'); //import express
const Joi = require('joi'); //import Joi
const app = express();  //create express application on the app variable
app.use(express.json());    //used the json file

//give data to server
 const customers = [
     {title: 'George', id: 1},
     {title: 'Josh', id: 2},
     {title: 'Selena', id: 3},
     {title: 'Ann', id: 4},
     {title: 'Bruce', id: 5}
 ]

//read request handlers
//display the message when the url consist of '/'
app.get('/', (req,res) => {
    res.send('Welcome to knztnt REST API');
});

// display the list of customers when URL consists of api/customers
app.get('/api/customers', (req,res) => {
    res.send(customers);
});

// display the information of specific customer when id is mentioned
app.get('/api/customers/:id', (req,res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    //if there is no valid customer id, then display an error
    if (!customer) res.status(404).send('<h2>Cannot find!</h2>');
    res.send(customer);
});

// create new customer information
app.post('/api/customers', (req, res)=>{
    const { error } = validateCustomer(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }
    // increment the customer id
    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});

// validate information
function validateCustomer(customer) {
    const schema = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
}

// port environmental variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ' + port));

