const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => {
    return note.id === id;
  });

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

const generateID = () => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxID + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "Missing content" });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateID(),
  };

  notes = notes.concat(note);
  res.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});