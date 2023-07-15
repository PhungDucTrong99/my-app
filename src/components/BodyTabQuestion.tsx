import { useSelector } from "react-redux";
import { listPolls, listQuestion, todoListSelector } from "../stores/selector";
import AskLayout from "./UserAsk";

const BodyTabsQuestions = () => {
  const users = useSelector(listPolls);
  const listQuestions = useSelector(listQuestion);
  const listUser = useSelector(todoListSelector);

  const UserCurrentLogin = () => {
    const usernames = Object.values(listUser)
      .filter((user: any) => user.status === "Active")
      .map((user: any) => user.id);

    return usernames;
  };

  const userQuestionsID = Object.values(users).filter(
    (item: any) => item.id === UserCurrentLogin().toString()
  );

  const userQuestionsQuestion = Object.values(listQuestions).filter(
    (question: any) =>
      !userQuestionsID.some((user: any) => user.question.includes(question.id))
  );

  return (
    <div className="container">
      {userQuestionsQuestion.map((question: any) => (
        <AskLayout key={question.id} item={question} />
      ))}
    </div>
  );
};
export default BodyTabsQuestions;
