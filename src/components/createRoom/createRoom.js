import "./App.css";

function createRoom() {
  return (
    <div className="creatingRoom">
      <div className="left_part">
        <div className="blabla"></div>
        <div className="girl"></div>
      </div>

      <div className="centerUp"></div>
      <div className="centerDown">
        <div className="with"></div>
      </div>
      <div className="right_part">
        <div className="logobla"></div>
        <div className="letsnack">
          <p className="snacktogether">
            Let's snack together while meeting is going on.
            <br />
            <br />
            It's FREE! Try it!
          </p>
        </div>
        <button className="newmeet">NEW MEETING</button>
        <input type="text" className="link_input"></input>
        <p className="join">Join!</p>
      </div>
    </div>
  );
}

export default createRoom;
