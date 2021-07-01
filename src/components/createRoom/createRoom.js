import styles from "./createRoom.module.scss";

function createRoom() {
  return (
    <div className={styles.creatingRoom}>
      <div className={styles.left_part}>
        <div className={styles.girl}></div>
        <div className={styles.blabla}></div>
      </div>

      <div className={styles.centerUp}></div>
      <div className={styles.centerDown}>
        <div className={styles.with}></div>
      </div>
      <div className={styles.right_part}>
        <div className={styles.logobla}></div>
        <div className={styles.letsnack}>
          <p className={styles.snacktogether}>
            Let's snack together while meeting is going on.
            <br />
            <br />
            It's FREE! Try it!
          </p>
        </div>
        <button className={styles.newmeet}>NEW MEETING</button>
        <input type="text" className={styles.link_input}></input>
        <p className={styles.join}>Join!</p>
      </div>
    </div>
  );
}

export default createRoom;
