import { useState } from "react"
import confetti from "canvas-confetti"
import Square from "../Square"
import TURNS from '../../utils/TURNS.js'
import winner_board from "../../utils/WINNER_BOARD"
import './styles.css'

function Board() {
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.x
  })

  const [squares, setSquares] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : new Array(9).fill(null)
  })

  const handleClick = (i) => {
    if(getWinner(squares) || squares[i]) {
      return
    } 

    const newTurn = !turn;
    const nextSquare = [...squares]

    if (turn) {
      nextSquare[i] = TURNS.x
    } else {
      nextSquare[i] = TURNS.o
    }

    setSquares(nextSquare)
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(nextSquare))
    window.localStorage.setItem('turn', JSON.stringify(turn))
  }
  
  const getWinner = (squares) => {
    for (let i of Object.keys(winner_board)) {
      const [a, b, c] = winner_board[i]

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        confetti()
        return squares[a]
      }
    }

    return null
  }

  const resetGame = () => {
    setSquares(new Array(9).fill(null))
    setTurn(TURNS.x)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  } 

  const winner = getWinner(squares)
  let status;

  if (!winner) {
    status = 'Next player: ' + (turn ? 'X' : 'O')
  }

  return (
    <div className="board">
      <h1 className='title'>TIC TAC TOE</h1>

      <div className="statusGame">
        {status}
      </div>

      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
    
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      {
        winner && (
          <div className="modal-container">
            <div className="modal">
              <p>Ganó la <span>{winner}</span></p>
              <button className="resetGameBtn" onClick={resetGame}>Reset game</button>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default Board
