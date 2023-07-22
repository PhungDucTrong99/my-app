import { _saveQuestion } from "../../stores/action";
import "@testing-library/jest-dom/extend-expect";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("_saveQuestion2", () => {
  it("should add a question to the state and resolve with the question ID", async () => {
    const dispatch = jest.fn();
    const mockUuidv4 = "070699";
    (uuidv4 as jest.Mock).mockReturnValueOnce(mockUuidv4);

    const expectedPayload = {
      author: "Batman",
      createtime: "10:35 AM : 07/22/2023",
      optionOne: {
        votes: [],
        text: "Option 1",
      },
      optionTwo: {
        votes: [],
        text: "Option 2",
      },
      id: mockUuidv4,
    };

    const promise = _saveQuestion(expectedPayload)(dispatch);

    expect(uuidv4).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/addQuestion",
      payload: expectedPayload,
    });
    expect(dispatch).toMatchSnapshot();
    await expect(promise).resolves.toBe(mockUuidv4);
  });

  it("should refuse with an error if incorrect data is passed", async () => {
    const dispatch = jest.fn();
    const promise = _saveQuestion({})(dispatch);

    expect(dispatch).not.toHaveBeenCalled();
    await expect(promise).rejects.toEqual(expect.any(Error));
  });
});
