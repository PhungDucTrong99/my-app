import ContentPage from "./Content";
import FooterPage from "./Footer";
import LeftMenu from "./LeftMenu";
import styles from "./style/MainLayout.module.scss";

const MainLayout = () => {
  return (
    <>
      <div className={styles.container_layout}>
        <div className={styles.leftMenu}>
          <LeftMenu />
        </div>
        <div className={styles.contentPage}>
          <ContentPage />
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default MainLayout;
