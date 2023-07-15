import { Button, Form, Input } from "antd";
import { _saveQuestion } from "../stores/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { todoListSelector } from "../stores/selector";
import dayjs from "dayjs";
import LeftMenu from "./LeftMenu";
import FooterPage from "./Footer";
import styles from "./style/MainLayout.module.scss";

const QuestionNew = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listUser = useSelector(todoListSelector);
  const navigate = useNavigate();

  const UserCurrentLogin = () => {
    const usernames = Object.values(listUser)
      .filter((user: any) => user.status === "Active")
      .map((user: any) => user.id);

    return usernames;
  };
  const handelAddQuestion = () => {
    dispatch<any>(
      _saveQuestion({
        author: UserCurrentLogin().toString(),
        createtime: dayjs().format("HH:mm:ss A : DD/MM/YYYY"),
        optionOne: {
          votes: [],
          text: form.getFieldValue("optionOne"),
        },
        optionTwo: {
          votes: [],
          text: form.getFieldValue("optionTwo"),
        },
      })
    )
      .then((questionId: string) => {
        navigate(`/question/${UserCurrentLogin()}/${questionId}`);
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className={styles.container_layout}>
        <div className={styles.leftMenu}>
          <LeftMenu />
        </div>
        <div className={styles.contentPage}>
          <h3 className="text-center">Create New Question</h3>
          <Form
            form={form}
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            className={styles.form_question}
            // style={{ maxWidth: 600, margin: "auto" }}
          >
            <Form.Item label="First option for question" name="optionOne">
              <Input
                className={styles.input_question}
                // style={{ height: 40, width: 600 }}
                placeholder="Option One"
              />
            </Form.Item>

            <Form.Item label="Two option for question" name="optionTwo">
              <Input
                className={styles.input_question}
                // style={{ height: 40, width: 600 }}
                placeholder="Option Two"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                className={styles.button_question}
                type="primary"
                htmlType="submit"
                onClick={handelAddQuestion}
              >
                Create question
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default QuestionNew;
