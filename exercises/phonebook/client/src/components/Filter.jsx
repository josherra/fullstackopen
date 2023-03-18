export const Filter = ({ handleFilter }) => {
  return (
    <>
      <p>
        search for someone: <input onChange={handleFilter} />
      </p>
    </>
  );
};
