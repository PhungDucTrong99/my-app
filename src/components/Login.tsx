import { Row, Col, Button, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Login, isLogin } from "../stores/action";
import { listSelector } from "../stores/selector";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listUser = useSelector(listSelector);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginInput = () => {
    dispatch<any>(
      Login({
        username: form.getFieldValue("username"),
        password: form.getFieldValue("password"),
      })
    )
      .then(() => {
        navigate("/home");
      })
      .catch((error: any) => {
        navigate("/login");
      });
  };

  useEffect(() => {
    const userList = Object.values(listUser);
    const hasActiveUser = userList.some(
      (user: any) => user.status === "Active"
    );
    hasActiveUser ? navigate("/home") : navigate("/login");
  }, [listUser, navigate]);
  const handleLogin = (user: any) => {
    dispatch(isLogin(user.id));
  };

  useEffect(() => {
    localStorage.setItem("currentURL", location.pathname);
    const savedURL = localStorage.getItem("currentURL");
    if (savedURL && savedURL?.includes("question/")) {
      localStorage.setItem("currentURL2", location.pathname);
    }
  }, [location]);

  return (
    <Form
      style={{ justifyContent: "center", display: "grid", marginTop: "100px" }}
      form={form}
      layout="vertical"
    >
      <h5 style={{ textAlign: "center", color: "darkblue" }}>
        Welcome to the Would You Rather App!
      </h5>
      <p>Please select option with on click button with name of each user</p>
      <Row justify="center">
        <Col span={24}>
          <strong style={{ fontSize: "15px" }}>User name</strong>
          <Form.Item name="username">
            <Input
              placeholder="User name"
              style={{ width: "100%", height: "40px", fontSize: "16px" }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <strong style={{ fontSize: "15px" }}>Password</strong>
          <Form.Item name="password">
            <Input
              placeholder="Password"
              style={{ width: "100%", height: "40px", fontSize: "16px" }}
              type="password"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          onClick={handleLoginInput}
          style={{ width: "100%", height: "40px", fontSize: "16px" }}
        >
          Login
        </Button>
        <h3 style={{ textAlign: "center", paddingTop: "20px" }}>Or</h3>
      </Form.Item>
      {Object.keys(listUser).map((key) => {
        const user = listUser[key];
        return (
          <Button
            key={user.id}
            style={{ marginBottom: "10px", borderRadius: "5px", height: 40 }}
            onClick={() => handleLogin(user)}
          >
            {user.username}
          </Button>
        );
      })}
    </Form>
  );
};
export default LoginPage;
