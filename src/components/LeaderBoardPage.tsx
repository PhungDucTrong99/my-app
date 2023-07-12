import FooterPage from "./Footer";
import LeaderBoardBodyTab from "./LeaderBoardComponents";
import LeftMenu from "./LeftMenu";
import styles from "./style/MainLayout.module.scss";

const LeaderboardPage = () => {
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
