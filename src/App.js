import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [player, setPlayer] = useState(true);
  const [timesPlayed, setTimePlayed] = useState(1);
  const [playerX, setPlayerX] = useState([]);
  const [playerO, setPlayerO] = useState([]);
  const [theWinnerIs, setWinner] = useState("No Winner Yet");
  const [board, setBoard] = useState([
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
    { id: 9, value: 9 },
  ]);

  const winnerOptions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const handlerClick = (index) => {
    if (isNaN(board[index].value)) {
      return;
    }

    const playerIcon = player ? "X" : "O"; //we select the palyer
    if (player) {
      const newArrayX = [...playerX, board[index].id];
      setPlayerX(newArrayX);
    } else {
      const newArrayO = [...playerO, board[index].id];
      setPlayerO(newArrayO);
    }

    const boardCopy = [...board];
    boardCopy[index].value = playerIcon;
    if (theWinnerIs === "No Winner Yet") {
      setBoard(boardCopy);
    }
    setPlayer(!player); //we are changing player
    // check if the spot was clicked before
  };
  useEffect(() => {
    const playerToCheck = player ? [...playerO] : [...playerX];
    if (playerToCheck.length >= 3) {
      const nowIsPlaying = player ? "O" : "X";
      for (let winnerOption of winnerOptions) {
        let count = 0;
        for (let element of winnerOption) {
          const weHaveIt = playerToCheck.indexOf(element);
          if (weHaveIt > -1) count++;
        }
        if (count === 3) {
          console.log("we have a winner", winnerOption, playerToCheck);
          setWinner(`The winner is ${nowIsPlaying}`);
          setTimePlayed(timesPlayed + 1);
          startAgain();
          break;
        }
      }
    }
  }, [playerO, playerX]);

  function startAgain() {
    setTimeout(() => {
      setBoard([
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 },
        { id: 4, value: 4 },
        { id: 5, value: 5 },
        { id: 6, value: 6 },
        { id: 7, value: 7 },
        { id: 8, value: 8 },
        { id: 9, value: 9 },
      ]);
      const nowTurn = timesPlayed % 2 ? true : false;
      setPlayer(nowTurn);
      setPlayerO([]);
      setPlayerX([]);
    }, 1000);
  }

  return (
    <div className="App">
      <div className="container">
        {board.map((box, index) => {
          return (
            <div
              className={`box ${
                isNaN(box.value) ? (box.value === "X" ? "bx" : "bo") : null
              }`}
              key={box.id}
              onClick={() => handlerClick(index)}
            >
              {box.value}
            </div>
          );
        })}
        <div></div>
        <h2>{theWinnerIs}</h2>
      </div>
    </div>
  );
}

export default App;
