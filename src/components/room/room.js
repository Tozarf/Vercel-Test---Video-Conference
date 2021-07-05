import styles from "./room.module.scss";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 90%;
  width: 90%;
  margin: 2%;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  margin: 40px 50px;
  height: 35%;
  width: 40%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return <StyledVideo playsInline autoPlay muted controls ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

function Room(props) {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.roomID;
  var actualURL = window.location.href;
  const [showUrl, setShowUrl] = useState(true);
  const [showName, setShowName] = useState(true);
  const [roomName, setroomName] = useState("ROOM NAME");
  const [userName, setUserName] = useState("");
  console.log(userName);

  function logOut() {
    props.history.push("/back-soon");
    window.location.reload(true);
  }

  const handleModalClose = () => {
    setShowUrl(false);
  };
  const handleModalOpen = () => {
    setShowUrl(true);
  };
  const handleSecondModalClose = () => {
    setShowName(false);
  };

  useEffect(() => {
    //io('http://localhost:8000/');
    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, [roomID]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div
      className={[styles.room, showUrl || showName ? styles.modalBG : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.linkPopUp} hidden={!showUrl}>
        <h3 className={styles.permission}>Permissions</h3>
        <div className={styles.close} onClick={handleModalClose}></div>
        <p className={styles.instructions}>
          <mark>Edit the name of the room. As you wish!</mark>
          <br />
          Share the code with your guests.
          <br />
          And your meeting is ready!
        </p>
        <div className={styles.urlContainer}>
          <h3 className={styles.url}>{actualURL}</h3>
          {document.queryCommandSupported("copy") && (
            <div
              className={styles.copyIcon}
              onClick={() => navigator.clipboard.writeText(actualURL)}
            ></div>
          )}
        </div>
      </div>
      <div className={styles.welcomecontainer} hidden={!showName}>
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
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Name"
            className={styles.inputNickname}
          ></input>
        </p>
        <button
          id="buttonOk"
          onClick={handleSecondModalClose}
          className={styles.okButton}
        >
          OK!
        </button>
      </div>
      <div className={styles.roomcontainer}>
        <div className={styles.roomname}>
          <p contentEditable="true" onChange={() => setroomName(roomName)}>
            {roomName}
          </p>
        </div>
        <div className={styles.logodown}></div>
        <div className={styles.link} onClick={handleModalOpen}></div>
        <div className={styles.arrow} onClick={logOut}></div>
        <div className={styles.userslist}></div>

        <Container>
          <StyledVideo
            muted
            controls
            autoPlay
            playsInline
            ref={userVideo}
            className={styles.host}
          />

          {peers.map((peer, index) => {
            return <Video muted controls playsInline key={index} peer={peer} />;
          })}
        </Container>
      </div>
    </div>
  );
}

export default Room;
