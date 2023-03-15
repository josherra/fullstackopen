import { Part } from "./Part";

export const Content = ({ content }) => {
  return (
    <>
      {content.map((course) => (
        <Part key={course.id} part={course} />
      ))}
    </>
  );
};
