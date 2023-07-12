// import { _saveQuestion } from "../../redux/action";
import { _saveQuestion } from "../../stores/action";
import "@testing-library/jest-dom/extend-expect";

describe("_saveQuestion", () => {
  it("dispatches the correct action with the correct payload", async () => {
    const mockDispatch = jest.fn();
    const mockData = {
      author: "Batman",
      createtime: "20:44:00 PM : 11/07/2023",
      optionOne: {
        votes: [],
        text: "Option One",
      },
      optionTwo: {
        votes: [],
        text: "Option Two",
      },
    };

    await _saveQuestion(mockData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "user/addQuestion",
      payload: expect.objectContaining({
        author: "Batman",
        createtime: "20:44:00 PM : 11/07/2023",
        optionOne: {
          votes: [],
          text: "Option One",
        },
        optionTwo: {
          votes: [],
          text: "Option Two",
        },
      }),
    });
  });
});
