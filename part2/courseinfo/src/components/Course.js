import { Content } from "./Content";
import { Header } from "./Header";
import { Statistics } from "./Statistics";

export const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content content={course.parts} />
      <Statistics course={course} />
      <hr />
    </>
  );
};
