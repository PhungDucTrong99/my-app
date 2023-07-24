/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Progress, Row } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { _saveQuestionAnswer } from "../stores/action";
import { listQuestion, listSelector } from "../stores/selector";

const UserAskDetail = (props: any) => {
  const listUser = useSelector(listSelector);
  const listQuestions = useSelector(listQuestion);
  const { id, questionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showVote, setShowVote] = useState(false);
  const [selected, setSelected] = useState("");
  const userWithImage: any = Object.values(listUser).find(
    (user: any) => user.id === id
  );
  const handleVotePolls = (
    questionSelect: string,
    id: any,
    questionId: any,
    option: string
  ) => {
    const userWithIdOne: any = Object.values(listUser).find(
      (user: any) => user.status === "Active"
    );
    dispatch<any>(
      _saveQuestionAnswer({
        id: userWithIdOne?.id,
        question: questionId,
        questionSelect: questionSelect,
        option: option,
      })
    )
      .then(() => {
        setShowVote(true);
        setSelected(option);
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  const ArrayQuestion: any[] = [];
  Object.values(listQuestions).forEach((question: any) => {
    const questionIdAll = question.id;
    const questionOptionOne = question.optionOne.votes;
    const questionOptionTwo = question.optionTwo.votes;

    let totalOptionOne = 0;
    let totalOptionTwo = 0;
    if (questionIdAll === questionId) {
      Object.values(questionOptionOne).forEach((item: any) => {
        if (item !== "") totalOptionOne++;
      });
      Object.values(questionOptionTwo).forEach((item: any) => {
        if (item !== "") totalOptionTwo++;
      });
    } else {
      totalOptionOne = 0;
      totalOptionTwo = 0;
    }

    const totalScore = totalOptionOne + totalOptionTwo;
    if (totalScore !== 0) {
      ArrayQuestion.push({
        totalOptionOne: totalOptionOne,
        totalOptionTwo: totalOptionTwo,
        totalScore: totalScore,
      });
    }

    ArrayQuestion.sort((a, b) => b.totalScore - a.totalScore);
  });

  useEffect(() => {
    const userList = Object.values(listUser);
    const hasActiveUser = userList.some(
      (user: any) => user.status === "Active"
    );
    hasActiveUser
      ? navigate(`/question/${id}/${questionId}`)
      : navigate("/login");
  }, [id, listUser, navigate, questionId]);

  useEffect(() => {
    const userWithId: any = Object.values(listUser).find(
      (user: any) => user.status === "Active"
    );
    const questionID: any = Object.values(listQuestions).find(
      (question: any) => question.id === questionId
    );

    console.log("questionID", questionID);
    if (questionID === undefined) {
      navigate("/404");
      localStorage.removeItem("redirectUrl");
    }

    if (userWithId?.question.includes(questionID?.id)) {
      const optionOneText = questionID.optionOne.text;
      const optionTwoText = questionID.optionTwo.text;

      if (userWithId.answers.includes(optionOneText)) {
        setSelected("optionOne");
      } else if (userWithId.answers.includes(optionTwoText)) {
        setSelected("optionTwo");
      }
    } else {
    }

    Object.values(listQuestions).forEach((question: any) => {
      const questionIdAll = question.id;
      const questionOptionOne = question.optionOne.votes;
      const questionOptionTwo = question.optionTwo.votes;

      let totalOptionOne = 0;
      let totalOptionTwo = 0;
      if (questionIdAll === questionId) {
        Object.values(questionOptionOne).forEach((item: any) => {
          if (item !== "") totalOptionOne++;
        });
        Object.values(questionOptionTwo).forEach((item: any) => {
          if (item !== "") totalOptionTwo++;
        });
      } else {
        totalOptionOne = 0;
        totalOptionTwo = 0;
      }

      const totalScore = totalOptionOne + totalOptionTwo;
      if (totalScore !== 0) {
        ArrayQuestion.push({
          totalOptionOne: totalOptionOne,
          totalOptionTwo: totalOptionTwo,
          totalScore: totalScore,
        });
      }

      ArrayQuestion.sort((a, b) => b.totalScore - a.totalScore);
    });
  }, [listQuestions, listUser, questionId]);

  return (
    <>
      <div style={{ justifyContent: "center", display: "grid" }}>
        <div className="qs-cart-container pt-4">
          <Card>
            <div className="card-header">
              <h4>{userWithImage?.username} Asking:</h4>
            </div>
            <div className="card-body">
              <div className="card-body qs-cart-body row">
                <div className="qs-card-avatar">{userWithImage?.image}</div>
                <div className="card-body-content d-flex flex-column align-items-start justify-content-center">
                  <h5 className="card-title">Would you rather</h5>
                  <Row style={{ width: 500 }} justify="center">
                    {Object.values(listQuestions)
                      ?.filter((item: any) => item?.id === questionId)
                      .map((item: any, index: any) => (
                        <React.Fragment key={index}>
                          <Col span={11}>
                            <div>
                              <p>{item?.optionOne?.text}</p>
                              <Button
                                style={{ height: 40, width: 100 }}
                                type="primary"
                                onClick={(e) => {
                                  if (selected === "") {
                                    handleVotePolls(
                                      item?.optionOne?.text,
                                      id,
                                      questionId,
                                      "optionOne"
                                    );
                                  }
                                }}
                                disabled={selected === "optionTwo"}
                              >
                                {selected === "optionOne"
                                  ? "Selected"
                                  : "Voted"}
                              </Button>
                            </div>
                          </Col>
                          <Col span={11}>
                            <div>
                              <React.Fragment>
                                <p>{item?.optionTwo?.text}</p>
                                <Button
                                  style={{ height: 40, width: 100 }}
                                  type="primary"
                                  onClick={(e) => {
                                    if (selected === "") {
                                      handleVotePolls(
                                        item?.optionTwo?.text,
                                        id,
                                        questionId,
                                        "optionTwo"
                                      );
                                    }
                                  }}
                                  disabled={selected === "optionOne"}
                                >
                                  {selected === "optionTwo"
                                    ? "Selected"
                                    : "Voted"}
                                </Button>
                              </React.Fragment>
                            </div>
                          </Col>
                          {showVote === true ? (
                            <>
                              <Row
                                justify={"space-between"}
                                style={{ marginTop: 10 }}
                              >
                                {ArrayQuestion.map(
                                  (item2: any, index: number) => (
                                    <div key={index}>
                                      <Progress
                                        percent={Number(
                                          (
                                            Number(
                                              item2?.totalOptionOne /
                                                item2?.totalScore
                                            ) * 100
                                          ).toFixed(2)
                                        )}
                                        size={[350, 11]}
                                        status="active"
                                      />
                                      <p>
                                        {item2?.totalOptionOne} out of
                                        {item2?.totalScore} votes
                                      </p>
                                    </div>
                                  )
                                )}
                              </Row>
                              <Row>
                                {ArrayQuestion?.map(
                                  (item2: any, index: number) => (
                                    <div key={index}>
                                      <Progress
                                        percent={Number(
                                          (
                                            Number(
                                              item2?.totalOptionTwo /
                                                item2?.totalScore
                                            ) * 100
                                          ).toFixed(2)
                                        )}
                                        size={[350, 11]}
                                        status="active"
                                      />
                                      <p>
                                        {item2.totalOptionTwo} out of
                                        {item2.totalScore} votes
                                      </p>
                                    </div>
                                  )
                                )}
                              </Row>
                            </>
                          ) : (
                            <></>
                          )}
                        </React.Fragment>
                      ))}
                  </Row>
                  <div style={{ justifyContent: "center" }}>
                    <Button
                      style={{
                        margin: "20px 0 0 20px",
                        width: 120,
                        height: 40,
                      }}
                      danger
                      onClick={(e) => {
                        navigate("/home");
                      }}
                    >
                      Back to Home
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserAskDetail;
