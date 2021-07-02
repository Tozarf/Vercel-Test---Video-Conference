import "./App.css";

function room() {
  return (
    <div className="room">
      <div className="roomcontainer">
        <div className="roomname">
          <p>ROOM NAME</p>
        </div>
        <div className="logodown"></div>
        <div className="mic"></div>
        <div className="arrow"></div>
        <div className="userslist"></div>
        <div className="user1">
          <div className="usernamecontainer">
            <p className="username">NAME</p>
          </div>
        </div>
        <div className="user2">
          <div className="usernamecontainer">
            <p className="username">NAME</p>
          </div>
        </div>
        <div className="user3">
          <div className="usernamecontainer">
            <p className="username">NAME</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default room;
