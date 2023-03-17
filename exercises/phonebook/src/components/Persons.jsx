export const Persons = ({ people, deletePerson }) => {
  return (
    <>
      {people.map((person) => (
        <p key={person.id}>
          {person.name} -- {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </p>
      ))}
    </>
  );
};
