export const PersonForm = ({ newPerson, handleInput, addNewPerson }) => {
  return (
    <form>
      <div>
        <h1>Add a new person</h1>
        name:{" "}
        <input name="name" value={newPerson.name} onChange={handleInput} />
        number:{" "}
        <input name="number" value={newPerson.number} onChange={handleInput} />
      </div>
      <div>
        <button onClick={addNewPerson} type="submit">
          add
        </button>
      </div>
    </form>
  );
};
