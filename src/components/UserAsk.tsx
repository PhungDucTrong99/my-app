/* eslint-disable jsx-a11y/alt-text */
import { Card } from "antd";
// import { useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { listPolls, todoListSelector } from "../stores/selector";
import { Link } from "react-router-dom";

const AskLayout = (props: any) => {
  let { item, userWithImage } = props;
  // const { id } = useParams();
  // const users = useSelector(listPolls);
  // const listUser = useSelector(todoListSelector);

  // const userWithImage: any = Object.values(listUser).find(
  //   (user: any) => user.id === id
  // );

  // console.log("imgurl", userWithImage?.image);
  // console.log("users", users);
  // console.log("item", item.optionOne.text);
  return (
    <>
      <div className="qs-cart-container pt-4">
        <Card>
          <div className="card-header">
            <h4>{userWithImage?.username} asks:</h4>
          </div>
          <div className="card-body">
            <div className="card-body qs-cart-body row">
              <div className="qs-card-avatar">
                {typeof userWithImage?.image === "string" ? (
                  <img src={userWithImage?.image} alt="" />
                ) : (
                  userWithImage?.image
                )}
                {/* <img src={userWithImage?.image} alt="" /> */}
              </div>
              <div className="card-body-content d-flex flex-column align-items-start justify-content-center">
                <h5 className="card-title">Would you rather</h5>
                <div className="ps-4">
                  <label className="card-text ms-2">
                    {item?.optionOne?.text}
                  </label>
                </div>
                <div className="ps-4">
                  <label className="card-text ms-2">
                    {item?.optionTwo?.text}
                  </label>
                </div>

                <Link
                  style={{ width: 150, height: 40 }}
                  className="btn btn-primary mt-3 ms-4"
                  to={`/question/${item.author}/${item?.id}`}
                >
                  View Result
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
export default AskLayout;
