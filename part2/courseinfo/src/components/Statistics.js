export const Statistics = ({ course }) => {
  const total = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );

  return <strong>total of {total} exercises</strong>;
};
