import { Row, Col, Form, Badge, Card, Tag } from "antd";
import { useSelector } from "react-redux";
import { listQuestion, listPolls } from "../stores/selector";
import styles from "./style/MainLayout.module.scss";

const LeaderBoardBodyTab = () => {
  const [form] = Form.useForm();
  const listQuestions = useSelector(listQuestion);
  const listPoll = useSelector(listPolls);

  const ArrayQuestion: any[] = [];
  if (listPoll) {
    Object.values(listPoll)?.forEach((user: any) => {
      const userId = user?.id;
      const userName = user?.username;
      const userQuestionIds = user?.question;

      let totalQuestionCount = 0;
      let correctAnswerCount = 0;

      userQuestionIds?.forEach((questionId: string) => {
        if (listQuestions[questionId]) {
          totalQuestionCount++;
        }
      });
      Object.values(listQuestions)?.forEach((item: any) => {
        if (item.author === userId) {
          correctAnswerCount++;
        }
      });
      const totalScore = totalQuestionCount + correctAnswerCount;
      ArrayQuestion.push({
        id: userName,
        answer: totalQuestionCount,
        question: correctAnswerCount,
        totalScore: totalScore,
      });
      ArrayQuestion.sort((a, b) => b?.totalScore - a?.totalScore);
    });
  }
  const userWithImage = (id: any): React.ReactNode => {
    const foundUser: any = Object.values(listPoll)?.find((user: any) => {
      return user.username === id;
    });
    console.log(foundUser?.image); // <-- Add this console.log statement
    return foundUser?.image;
  };

  return (
    <Form className={styles.form_leader_1} form={form} layout="vertical">
      <Row className={styles.title_leader}>
        <h2>Total Polls</h2>
      </Row>

      {ArrayQuestion.map((item: any, index: any) => (
        <Row
          key={item?.id}
          justify="center"
          className={styles.form_leader}
          // style={{
          //   borderRadius: "5px",
          //   border: " 1px solid gray",
          //   marginBottom: 15,
          // }}
        >
          <Col span={2} style={{ margin: "auto auto", padding: 20 }}>
            <Badge
              count={index + 1}
              className={styles.badge_style}
              style={{ backgroundColor: "#4be4c2" }}
            ></Badge>
          </Col>
          <Col span={6} className={styles.col_leader}>
            <span>{userWithImage(item?.id)}</span>
          </Col>
          <Col span={8} className={styles.col_leader}>
            <h2>{item.id}</h2>
            <Tag color="cyan">Question: {item?.question}</Tag>
            <Tag color="cyan">Answer: {item?.answer}</Tag>
          </Col>
          <Col span={6} className={styles.col_leader}>
            <Card
              className={styles.custom_card}
              size="small"
              title="Total score"
              // style={{ width: 150, textAlign: "center" }}
            >
              <Tag style={{ textAlign: "center" }} color="cyan">
                {item?.totalScore * 10}
              </Tag>
              {/* <p style={{ textAlign: "center" }}>{item.totalScore * 10}</p> */}
            </Card>
            {/* <p>Total Score: {item.totalScore * 10}</p> */}
          </Col>
        </Row>
      ))}
    </Form>
  );
};
export default LeaderBoardBodyTab;
