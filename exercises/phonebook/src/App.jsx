import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { create, getAll, removePerson, updatePerson } from "./services/api";

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
      const personToUpdate = persons.find(
        (person) => person.name === newPerson.name
      );
      console.log(`updating person's information: ${personToUpdate.name}`);
      const newPersonInfo = { name: newPerson.name, number: newPerson.number };
      updatePerson(personToUpdate.id, newPersonInfo).then((returnedPerson) =>
        setPersons(
          persons.map((person) =>
            person.id === personToUpdate.id ? returnedPerson : person
          )
        )
      );
    } else {
      const newObj = {
        name: newPerson.name,
        number: newPerson.number,
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

  const deletePerson = (id) => {
    removePerson(id).then((data) => {
      const personToDelete = persons.find((person) => person.id === id);
      console.log(
        `"${personToDelete.name}" has been removed. Their ID was ${id}`
      );
      setPersons(persons.filter((person) => person.id !== id));
    });
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
      <Persons people={peopleToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
