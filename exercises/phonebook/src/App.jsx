import { useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  const handleInput = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const addNewPerson = (e) => {
    e.preventDefault();

    if (
      persons.some((e) => e.name.toLowerCase() == newPerson.name.toLowerCase())
    ) {
      alert(`${newPerson.name} is already added to this phonebook`);
    } else {
      const newObj = {
        name: newPerson.name,
        number: newPerson.number,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newObj));
    }

    setNewPerson({ name: "", number: "" });
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const peopleToShow =
    filter.length > 0
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <PersonForm
        newPerson={newPerson}
        handleInput={handleInput}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons people={peopleToShow} />
    </div>
  );
};

export default App;
