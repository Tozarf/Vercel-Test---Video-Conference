import styles from './room.module.scss';
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};


function Room(props) {
  const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    useEffect(() => {
        //io('http://localhost:8000/');
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    var URLactual = window.location.href;

    return (
      <div className={styles.room}>
        <div className={styles.linkPopUp}>
        <h3 className={styles.permission}>Permissions</h3>
        <p className={styles.instructions}>
          Edit the name of the room related to the topic of the meeting.<br/> As you
          wish! Share the code with your guests.<br/>And the meeting is ready!
        </p>
        <div className={styles.urlContainer}>
          <h3 className={styles.url}>{URLactual}</h3>
          <div className={styles.copyIcon}></div>
        </div>
      </div>
      <div className={styles.room}></div>
        {/*<div className={styles.welcomecontainer}>
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
    </div>*/}
  
        <div className={styles.roomcontainer}>
          <div className={styles.roomname}>
            <p>ROOM NAME</p>
          </div>
          <div className={styles.logodown}></div>
          <div className={styles.mic}></div>
          <div className={styles.arrow}></div>
          <div className={styles.userslist}></div>
          <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
          </Container>
        </div>
      </div>
    );
  }
  
  export default Room;