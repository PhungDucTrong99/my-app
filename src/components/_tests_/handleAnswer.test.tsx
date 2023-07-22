import { _saveQuestionAnswer } from "../../stores/action";
import { AnyAction } from "redux";

import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore<
  unknown,
  ThunkDispatch<unknown, unknown, AnyAction>
>(middlewares);

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

export const initialState: State = {
  isLoading: {
    status: false,
  },
  user: {
    Cat: {
      id: "000",
      username: "Cat",
      image: "",
      password: "070699",
      role: "admin",
      status: "inActive",
      totalPools: 4,
      answers: ["become a super hero"],
      question: ["6ni6ok3ym7mf1p33lnez"],
    },
    Fox: {
      id: "111",
      username: "Fox",
      image: "",
      password: "070699",
      role: "admin",
      status: "inActive",
      totalPools: 1,
      answers: ["become a super hero"],
      question: ["6ni6ok3ym7mf1p33lnez"],
    },
    Gorilla: {
      id: "222",
      username: "Gorilla",
      role: "admin",
      image: "",
      password: "070699",
      status: "inActive",
      totalPools: 1,
      answers: ["become a super hero"],
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
        text: "become a super hero",
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
describe("_saveQuestionAnswer", () => {
  it("should send the right action and update the status", async () => {
    const data = {
      id: "000",
      question: "8xf0y6ziyjabvozdd253nd",
      questionSelect: "become a super hero",
      option: "optionOne",
    };

    const initialState = {
      user: {
        Cat: {
          id: "000",
          username: "Cat",
          answers: ["become a super hero", "optionOne"],
          question: ["6ni6ok3ym7mf1p33lnez", "8xf0y6ziyjabvozdd253nd"],
        },
      },
      listQuestion: {
        "8xf0y6ziyjabvozdd253nd": {
          id: "8xf0y6ziyjabvozdd253nd",
          optionOne: {
            votes: ["000"],
            text: "become a super hero",
          },
          optionTwo: {
            votes: [""],
            text: "have horrible long term memory",
          },
        },
        "6ni6ok3ym7mf1p33lnez": {
          id: "6ni6ok3ym7mf1p33lnez",
          optionOne: {
            votes: [""],
            text: "become a super hero",
          },
          optionTwo: {
            votes: [""],
            text: "become a supervillian",
          },
        },
      },
    };

    const expectedActions = [
      {
        type: "user/handleAnswer",
        payload: data,
      },
    ];

    const store: MockStoreEnhanced<unknown, {}> = mockStore(initialState);

    await store.dispatch<any>(_saveQuestionAnswer(data)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);

      const updatedState = store.getState() as typeof initialState;
      expect(updatedState.user["Cat"].question).toContain(
        "8xf0y6ziyjabvozdd253nd"
      );
      expect(updatedState.user["Cat"].answers).toContain("become a super hero");
      expect(
        updatedState.listQuestion["8xf0y6ziyjabvozdd253nd"].optionOne.votes
      ).toContain("000");
      expect(
        updatedState.listQuestion["8xf0y6ziyjabvozdd253nd"].optionOne.votes
      ).toMatchSnapshot();
    });
  });

  it("will return an error if data transmission is incorrect", async () => {
    const incorrectData = {
      id: "000",
      question: "invalidQuestionId",
      questionSelect: "become a super hero",
      option: "optionOne",
    };

    const store: MockStoreEnhanced<unknown, {}> = mockStore(initialState);
    let error: any = null;
    try {
      await store.dispatch<any>(_saveQuestionAnswer(incorrectData));

      expect(true).toBe(false);
    } catch (err: any) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error).toMatchSnapshot();
  });
});
