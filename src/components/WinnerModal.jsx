import { Square } from "./Square"

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return

  return (
    <section className="winner">
      <div className="text">
        <h2>
          {winner === false ? 'EMPATE' : 'GANADOR:'}
        </h2>

        {winner !== false && (
          <header className="win">
            <Square>{winner}</Square>
          </header>
        )}

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}