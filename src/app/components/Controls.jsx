import React from "react";

const Controls = ({ isDisabled, start }) => {
  return (
    <div className="controls">
     {/*  <div className="nickname">
        <input
          placeholder="Никнейм"
          type="text"
          className="nick"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div> */}
      <button className="button" disabled={isDisabled} onClick={start}>
        Открыть
      </button>
    </div>
  );
};

export default Controls;
