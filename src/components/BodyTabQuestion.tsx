import { useSelector } from "react-redux";
import { listPolls, listQuestion, todoListSelector } from "../stores/selector";
import AskLayout from "./UserAsk";

const BodyTabsQuestions = () => {
  const users = useSelector(listPolls);
  const listQuestions = useSelector(listQuestion);
  const listUser = useSelector(todoListSelector);

  // const ArrayQuestion: any[] = [];
  // if (users) {
  //   Object.values(users)?.forEach((user: any) => {
  //     const userId = user?.id;
  //     const userName = user?.username;
  //     const userQuestionIds = user?.question;

  //     let totalQuestionCount = 0;
  //     let correctAnswerCount = 0;

  //     userQuestionIds?.forEach((questionId: string) => {
  //       if (listQuestions[questionId]) {
  //         totalQuestionCount++;
  //       }
  //     });
  //     Object.values(listQuestions)?.forEach((item: any) => {
  //       if (item.author === userId) {
  //         correctAnswerCount++;
  //       }
  //     });
  //     const totalScore = totalQuestionCount + correctAnswerCount;
  //     ArrayQuestion.push({
  //       id: userName,
  //       answer: totalQuestionCount,
  //       question: correctAnswerCount,
  //       totalScore: totalScore,
  //     });
  //     ArrayQuestion.sort((a, b) => b?.totalScore - a?.totalScore);
  //   });
  // }

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

  const userWithImage = (author: any) => {
    // console.log("user", author);
    const foundUser = Object.values(users).find((user: any) => {
      return user.id === author;
    });
    console.log(foundUser);
    return foundUser; // Return the entire foundUser object
  };

  // console.log("users", users);

  return (
    <div className="container">
      {userQuestionsQuestion.map((question: any, index: any) => (
        <AskLayout
          key={question.id}
          item={question}
          userWithImage={userWithImage(question.author)}
        />
      ))}
    </div>
  );
};
export default BodyTabsQuestions;
