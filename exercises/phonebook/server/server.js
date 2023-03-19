const express = require("express");
const app = express();
const PORT = 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date()
      .getTime()
      .toLocaleString()}</p></div>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.sendStatus(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.statusCode(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const exists = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Missing name or number" });
  } else if (exists) {
    return res
      .status(400)
      .json({ error: "Person already exists in the database" });
  }

  const person = {
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(body);
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}.`);
});
