import { useSelector } from "react-redux";
import { listPolls, listQuestion, listSelector } from "../stores/selector";
import AskLayout from "./UserAsk";

const BodyTabAnswered = () => {
  const users = useSelector(listPolls);
  const listQuestions = useSelector(listQuestion);
  const listUser = useSelector(listSelector);

  const UserCurrentLogin = () => {
    const usernames = Object.values(listUser)
      .filter((user: any) => user.status === "Active")
      .map((user: any) => user.id);

    return usernames;
  };
  const userQuestionsID = Object.values(users).filter(
    (item: any) => item.id === UserCurrentLogin().toString()
  );
  const userQuestions = Object.values(listQuestions).filter((question: any) =>
    userQuestionsID.some((user: any) => user.question.includes(question.id))
  );
  const userWithImage = (author: any) => {
    console.log("user", author);
    const foundUser = Object.values(users).find((user: any) => {
      return user.id === author;
    });
    console.log(foundUser);
    return foundUser; // Return the entire foundUser object
  };
  return (
    <div className="container">
      {userQuestions.map((question: any) => (
        <AskLayout
          key={question.id}
          item={question}
          userWithImage={userWithImage(question.author)}
        />
      ))}
    </div>
  );
};
export default BodyTabAnswered;
