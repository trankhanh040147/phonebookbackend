import express from 'express'

const app = express()
// json-parser
app.use(express.json())

const generateId = () => {
    // generate random num
    let randomNum
    const maxNum = 10000

    // if the array is full, return -1
    if(persons.length === maxNum){
        return -1
    }

    while (true) {
        randomNum = Math.floor(Math.random() * 10000) + 1
        if(persons.find(person => person.id === randomNum) === undefined){
            return randomNum
        }
    }
}

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
    console.log(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person){
        response.json(person)
    } else {
        response.status(404).send('ID not found')
    }
})

app.get('/info', (request, response) => {
    // There can only be one response.send() statement in an Express app route. Once you send a response to the client using response.send(), 
    // the request-response cycle is complete and no further response can be sent.
    response.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body);
    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end() // 204 No Content
})

// open port and start
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})