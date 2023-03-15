export const Persons = ({ people }) => {
  return (
    <>
      {people.map((person) => (
        <p key={person.id}>
          {person.name} -- {person.number}
        </p>
      ))}
    </>
  );
};
