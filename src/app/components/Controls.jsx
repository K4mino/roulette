import React from "react";

const Controls = ({ isDisabled, start, nickname, setNickname }) => {
  return (
    <div className="controls">
      <div className="nickname">
        <input
          placeholder="Никнейм"
          type="text"
          className="nick"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <button className="button" disabled={isDisabled || !nickname} onClick={start}>
        Открыть
      </button>
    </div>
  );
};

export default Controls;
