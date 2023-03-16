import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { create, getAll } from "./services/api";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAll().then((data) => setPersons(data));
  }, []);

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
      create(newObj).then((response) => {
        setPersons(persons.concat(response));
      });
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
