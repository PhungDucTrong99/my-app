import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listSelector } from "../stores/selector";
import FooterPage from "./Footer";
import LeaderBoardBodyTab from "./LeaderBoardComponents";
import LeftMenu from "./LeftMenu";
import styles from "./style/MainLayout.module.scss";

const LeaderboardPage = () => {
  const listUser = useSelector(listSelector);
  const navigate = useNavigate();

  useEffect(() => {
    const userList = Object.values(listUser);
    const hasActiveUser = userList.some(
      (user: any) => user.status === "Active"
    );
    hasActiveUser ? navigate("/leaderboard") : navigate("/login");
  }, [listUser, navigate]);

  return (
    <>
      <div className={styles.container_layout}>
        <div className={styles.leftMenu}>
          <LeftMenu />
        </div>
        <div className={styles.contentPage}>
          <LeaderBoardBodyTab />
        </div>
      </div>
      <FooterPage />
    </>
  );
};
export default LeaderboardPage;
