import './room.module.scss';
import React from 'react';

function room() {
    return (
      <div className={styles.room}>
        <div className={styles.welcomecontainer}>
          <p className={styles.welcomemessage}>
            {" "}
            Welcome!
            <br />
            <span className={styles.enterName}>
              Enter your name o nickname to start!
              <span />
            </span>{" "}
            <br />
            <br />
            <br />
            <br />
            <input type="text" className={styles.inputNickname}></input>
          </p>
          <button id="buttonOk" className={styles.okButton}>
            OK!
          </button>
        </div>
  
        <div className={styles.roomcontainer}>
          <div className={styles.roomname}>
            <p>ROOM NAME</p>
          </div>
          <div className={styles.logodown}></div>
          <div className={styles.mic}></div>
          <div className={styles.arrow}></div>
          <div className={styles.userslist}></div>
          <div className={styles.user1}>
            <div className={styles.usernamecontainer}>
              <p className={styles.username}>NAME</p>
            </div>
          </div>
          <div className={styles.user2}>
            <div className={styles.usernamecontainer}>
              <p className={styles.username}>NAME</p>
            </div>
          </div>
          <div className={styles.user3}>
            <div className={styles.usernamecontainer}>
              <p className={styles.username}>NAME</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default room;