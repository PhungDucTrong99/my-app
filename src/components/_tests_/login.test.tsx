import "@testing-library/jest-dom/extend-expect";

import { isLogin } from "../../stores/action";
import reducer from "../../stores/reducer";

describe("isLogin action", () => {
  it('should update user status to "Active" for valid ID', () => {
    const initialState: any = {
      isLoading: {
        status: false,
      },
      user: {
        MasterYi: {
          id: "MasterYi",
          username: "Leo",
          status: "inActive",
        },
      },
      listQuestion: {},
    };

    const action = isLogin("MasterYi");

    const state = reducer(initialState, action);

    expect(state.user["MasterYi"].status).toBe("Active");
    expect(state.user["MasterYi"].status).toMatchSnapshot();
  });

  it("user status should not be updated for invalid ID", () => {
    const initialState: any = {
      isLoading: {
        status: false,
      },
      user: {
        MasterYi: {
          id: "MasterYi",
          username: "Marock",
          status: "inActive",
        },
      },
      listQuestion: {},
    };

    const action = isLogin("111");

    const state = reducer(initialState, action);

    expect(state.user["MasterYi"].status).toBe("inActive");
    expect(state.user["MasterYi"].status).toMatchSnapshot();
  });
});
