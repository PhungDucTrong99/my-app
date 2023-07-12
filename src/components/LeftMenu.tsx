/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogout } from "../stores/action";
import { todoListSelector } from "../stores/selector";

interface IItemMenu {
  key: string;
  label: JSX.Element | string;
  icon?: JSX.Element;
  children?: IItemMenu[];
}

type ItemType = IItemMenu & {
  key: string;
  label: JSX.Element | string;
  icon?: JSX.Element;
  children?: IItemMenu[];
  hidden?: boolean;
};

const LeftMenu: React.FC = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("/");
  const listUser = useSelector(todoListSelector);

  const UserCurrentLogin = () => {
    const usernames = Object.values(listUser)
      .filter((user: any) => user.status === "active")
      .map((user: any) => user.username);

    return usernames;
  };
  const UserIdCurrentLogin = () => {
    const usernames = Object.values(listUser)
      .filter((user: any) => user.status === "active")
      .map((user: any) => user.id);

    return usernames;
  };
  const menuItems: ItemType[] = [
    {
      key: "home",
      label: (
        <Link style={{ textDecoration: "none" }} to="/home">
          Home
        </Link>
      ),
      // icon: <HomeOutlined />,
    },
    {
      key: "leaderboard",
      label: (
        <Link style={{ textDecoration: "none" }} to="/leaderboard">
          Leaderboard
        </Link>
      ),
      // icon: <HomeOutlined />,
    },
    {
      key: "addQuestion",
      label: (
        <Link style={{ textDecoration: "none" }} to="/add">
          New
        </Link>
      ),
      // icon: <HomeOutlined />,
    },
    {
      key: "userInfo",
      label: <p>Hello, {UserCurrentLogin() || ""}</p>,
      children: [
        {
          key: "/logout",
          label: (
            <a
              style={{ textDecoration: "none" }}
              href="/"
              onClick={() => {
                dispatch(isLogout(UserIdCurrentLogin().toString()));
              }}
            >
              Logout
            </a>
          ),
        },
      ],
    },
  ];
  return (
    <>
      <Menu
        selectedKeys={[key]}
        theme="dark"
        mode="inline"
        items={menuItems}
        style={{
          overflowY: "auto",
        }}
      />
    </>
  );
};
export default LeftMenu;
