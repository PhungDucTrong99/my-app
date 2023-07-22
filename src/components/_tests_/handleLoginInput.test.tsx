import "@testing-library/jest-dom";
import "../../watchMedia.tsx";
import { fireEvent, render, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Button, Col, Form, Input, Row } from "antd";
import { Provider } from "react-redux";

const mockStore = configureMockStore([thunk]);

interface User {
  id: string;
  username: string;
  image: any;
  password: string;
  role: string;
  status: string;
  totalPools: number;
  answers: string[];
  question: string[];
}

interface Question {
  id: string;
  author: string;
  createtime: string;
  optionOne: {
    votes: string[];
    text: string;
  };
  optionTwo: {
    votes: string[];
    text: string;
  };
}

export interface State {
  isLoading: {
    status: boolean;
  };
  user: { [key: string]: User };
  listQuestion: { [key: string]: Question };
}

const initialState: State = {
  isLoading: {
    status: false,
  },
  user: {
    "000": {
      id: "000",
      username: "Cat",
      image: "<Image1 />",
      password: "070699",
      role: "admin",
      status: "inActive",
      totalPools: 4,
      answers: ["become a superhero"],
      question: ["6ni6ok3ym7mf1p33lnez"],
    },
    "111": {
      id: "111",
      username: "Fox",
      image: "<Image3 />",
      password: "070699",
      role: "admin",
      status: "inactive",
      totalPools: 1,
      answers: ["become a superhero"],
      question: ["6ni6ok3ym7mf1p33lnez"],
    },
    "222": {
      id: "222",
      username: "Gorilla",
      role: "admin",
      image: " <Image2 />",
      password: "070699",
      status: "inActive",
      totalPools: 1,
      answers: ["become a superhero"],
      question: ["6ni6ok3ym7mf1p33lnez"],
    },
  },
  listQuestion: {
    "8xf0y6ziyjabvozdd253nd": {
      id: "8xf0y6ziyjabvozdd253nd",
      author: "000",
      createtime: "11:03 AM : 13/12/2013",
      optionOne: {
        votes: [""],
        text: "have horrible short term memory",
      },
      optionTwo: {
        votes: [""],
        text: "have horrible long term memory",
      },
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: "6ni6ok3ym7mf1p33lnez",
      author: "111",
      createtime: "11:03 AM : 12/12/2023",
      optionOne: {
        votes: [""],
        text: "become a superhero",
      },
      optionTwo: {
        votes: [""],
        text: "become a supervillian",
      },
    },
    am8ehyc8byjqgar0jgpub9: {
      id: "am8ehyc8byjqgar0jgpub9",
      author: "222",
      createtime: "11:03 AM : 12/12/2022",
      optionOne: {
        votes: [""],
        text: "be telekinetic",
      },
      optionTwo: {
        votes: [""],
        text: "be telepathic",
      },
    },
    loxhs1bqm25b708cmbf3g: {
      id: "loxhs1bqm25b708cmbf3g",
      author: "000",
      createtime: "11:03 AM : 12/12/2011",
      optionOne: {
        votes: [""],
        text: "be a front-end developer",
      },
      optionTwo: {
        votes: [""],
        text: "be a back-end developer",
      },
    },
  },
};
describe("Login action", () => {
  test("should handle change input", () => {
    render(
      <Provider store={mockStore({ initialState })}>
        <Form>
          <Row justify="center">
            <Col span={24} className="box1">
              <strong style={{ fontSize: "15px" }}>User name</strong>
              <Form.Item name="username">
                <Input
                  placeholder="username"
                  value={"Cat"}
                  style={{ width: "100%", height: "40px", fontSize: "16px" }}
                />
              </Form.Item>
            </Col>
            <Col span={24} className="box1">
              <strong style={{ fontSize: "15px" }}>Password</strong>
              <Form.Item name="password">
                <Input
                  placeholder="password"
                  style={{ width: "100%", height: "40px", fontSize: "16px" }}
                  type="password"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              style={{ width: "100%", height: "40px", fontSize: "16px" }}
            >
              Login
            </Button>
            <h3 style={{ textAlign: "center", marginBottom: "-5px" }}>Or</h3>
          </Form.Item>
        </Form>
      </Provider>
    );

    const input: any = screen.queryAllByPlaceholderText("username")[0];
    fireEvent.change(input, { target: { value: "Fox" } });
    expect(input.value).toBe("Fox");
  });
  test("should handle button click", () => {
    render(
      <Provider store={mockStore({ initialState })}>
        <Form
          style={{
            justifyContent: "center",
            display: "grid",
            marginTop: "100px",
          }}
          layout="vertical"
        >
          <h5 style={{ textAlign: "center", color: "darkblue" }}>
            Welcome to the Would You Rather App!
          </h5>
          <p>
            Please select option with on click button with name of each user
          </p>
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
              style={{ width: "100%", height: "40px", fontSize: "16px" }}
            >
              Login
            </Button>
            <h3 style={{ textAlign: "center", paddingTop: "20px" }}>Or</h3>
          </Form.Item>
        </Form>
      </Provider>
    );

    const loginButton = screen.getByText("Login");

    fireEvent.click(loginButton);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
