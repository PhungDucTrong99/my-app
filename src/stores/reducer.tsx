// import {Image1, Image2, Image3 } from "../img";
import { AnyAction } from "redux";
import React from "react";
import { Image1, Image2, Image3 } from "../img/until";

interface User {
  id: string;
  username: string;
  image: JSX.Element;
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
    Cat: {
      id: "000",
      username: "Cat",
      image: <Image1 />,
      password: "070699",
      role: "admin",
      status: "inActive",
      totalPools: 4,
      answers: ["become a superhero"],
      question: ["6ni6ok3ym7mf1p33lnez"],
    },
    Fox: {
      id: "111",
      username: "Fox",
      image: <Image2 />,
      password: "070699",
      role: "admin",
      status: "inActive",
      totalPools: 1,
      answers: ["become a superhero"],
      question: ["6ni6ok3ym7mf1p33lnez"],
    },
    Gorilla: {
      id: "222",
      username: "Gorilla",
      role: "admin",
      image: <Image3 />,
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
      author: "111",
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

const reducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case "user/isLogin":
      const updatedUser = Object.values(state.user).find(
        (user) => user.id === action.payload
      );

      if (updatedUser) {
        updatedUser.status = "Active";
      }

      return {
        ...state,
        user: { ...state.user },
      };

    case "user/Login":
      const loginUser = Object.values(state.user).find(
        (user) =>
          user.password === action.payload.password &&
          user.username === action.payload.username
      );

      if (loginUser) {
        loginUser.status = "Active";
      }

      return {
        ...state,
        user: { ...state.user },
      };

    case "user/isLogout":
      const updatedUserLogout = Object.values(state.user).find(
        (user) => user.id === action.payload
      );

      if (updatedUserLogout) {
        updatedUserLogout.status = "inActive";
      }

      return {
        ...state,
        user: { ...state.user },
      };

    case "user/addQuestion":
      const id = action.payload.id;

      return {
        ...state,
        listQuestion: {
          ...state.listQuestion,
          [id]: action.payload,
        },
      };

    case "user/handleAnswer":
      const updatedUserAnswer = Object.values(state.user).find(
        (user) => user.id === action.payload.id
      );

      const updatedQuestionAnswer = Object.values(state.listQuestion).find(
        (question) => question.id === action.payload.question
      );

      if (updatedUserAnswer && updatedUserAnswer.question) {
        updatedUserAnswer.question.push(action.payload.question);
        updatedUserAnswer.answers.push(action.payload.questionSelect);
      }

      if (action.payload.option === "optionOne") {
        updatedQuestionAnswer?.optionOne.votes.push(action.payload.id);
      } else {
        updatedQuestionAnswer?.optionTwo.votes.push(action.payload.id);
      }

      return {
        ...state,
        user: { ...state.user },
        listQuestion: { ...state.listQuestion },
      };

    default:
      return state;
  }
};

export default reducer;
