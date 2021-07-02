import styles from "./App.module.scss";

function landing() {
  return (
    <div className={styles.Landing_page}>
      <div className={styles.App}>
        <div className={styles.left_side}>
          <div className={styles.logo}></div>
          <div className={styles.startmeeting}></div>
        </div>

        <div className={styles.center_up}></div>
        <div className={styles.center_down}>
          <div className={styles.slider}></div>
        </div>
        <div className={styles.right_side}></div>
      </div>
    </div>
  );
}
export default landing;
