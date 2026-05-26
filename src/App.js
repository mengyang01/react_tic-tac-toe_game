import { useState } from "react";

function calWinner(arr) {
  const winArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const a of winArr) {
    if (arr[a[0]] === arr[a[1]] && arr[a[1]] === arr[a[2]]) {
      return arr[a[0]];
    }
  }

  return null;
}

/**
 * 棋子组件
 * @param {*} props
 * @returns
 */
function Square(props) {
  const { value, onChangeValue } = props;

  return (
    <button className="square-button" onClick={onChangeValue}>
      {value}
    </button>
  );
}

/**
 * 棋盘组件
 * @returns
 */
function Board({squares,next,onPlay}) {
  // const [squares, setSquares] = useState(new Array(9).fill(null));
  const SquareList = [];
  let winner=calWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const val = next ? "X" : "O";
    const copySquares = squares.slice();
    copySquares[i] = val;
    onPlay(!next,copySquares)
  }

  for (let i = 0; i < 9; i++) {
    SquareList.push(
      <li key={i} className="square">
        <Square value={squares[i]} onChangeValue={() => handleClick(i)} />
      </li>,
    );
  }
  return (
    <>
      <div>
        <button onClick={()=>onPlay(!next)}>
          修改起手棋子
        </button>
      </div>

      <br/>

      {winner ? (
        <div>winner:{winner}</div>
      ) : (
        <div>now player:{next ? "X" : "O"}</div>
      )}

      <br/>

      <ul className="SquareList">{SquareList}</ul>
    </>
  );
}


export default function Game(){
  const [next, setNext] = useState(true);
  const [history,setHistory]=useState([Array(9).fill(null)]);
  const [curMove,setCurMove]=useState(0);
  const squares=history[curMove];

  function handlePlay(nextVal,copySquares=[]){
    setNext(nextVal);
    if(copySquares.length===0)
      return;
    const copyHistory=history.slice(0,curMove+1);
    copyHistory.push(copySquares);
    setHistory(copyHistory);
    setCurMove(copyHistory.length-1);
  }

  function handleJump(i){
    setCurMove(i);
    setNext(i%2===0);
  }

  const moveHistory=history.map((x,i)=>{
    return (
        <button key={i} className="historyItem" onClick={()=>handleJump(i)}>点击回到{i>0?`第${i}步骤`:"游戏开始"}</button>
    )
  })

  return (
    <div className="game">
      <div>
        <Board squares={squares} next={next} onPlay={handlePlay}/>
      </div>
      <div className="history">
        {moveHistory}
      </div>
    </div>
  )
}
