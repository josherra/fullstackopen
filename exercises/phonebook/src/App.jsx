import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { Message } from "./components/Message";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { create, getAll, removePerson, updatePerson } from "./services/api";
import { displayMessage } from "./helpers/helper";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

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
      const newPersonInfo = { name: newPerson.name, number: newPerson.number };
      updatePerson(personToUpdate.id, newPersonInfo).then((returnedPerson) =>
        setPersons(
          persons.map((person) =>
            person.id === personToUpdate.id ? returnedPerson : person
          )
        )
      );

      let message = {
        message: `Updated number for '${personToUpdate.name}'`,
        type: "success",
      };

      displayMessage(setMessage, message);
    } else {
      const newObj = {
        name: newPerson.name,
        number: newPerson.number,
      };
      create(newObj).then((response) => {
        setPersons(persons.concat(response));
      });

      let message = {
        message: `Added '${newObj.name}' to the phonebook.`,
        type: "success",
      };

      displayMessage(setMessage, message);
    }

    setNewPerson({ name: "", number: "" });
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const deletePerson = (id) => {
    removePerson(id)
      .then((data) => {
        const personToDelete = persons.find((person) => person.id === id);
        setPersons(persons.filter((person) => person.id !== id));

        let message = {
          message: `Deleted '${personToDelete.name}' from the phonebook.`,
          type: "error",
        };

        displayMessage(setMessage, message);
      })
      .catch((error) => {
        const personToDelete = persons.find((person) => person.id === id);
        let message = {
          message: `'${personToDelete.name}' has already been removed from the database.`,
          type: "error",
        };

        displayMessage(setMessage, message);
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
      <Message message={message} />
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
