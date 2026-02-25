'use client'

import { useState } from "react";

type Player = 'X' | 'O' | null;

export default function TicTacToe() {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
    const [isXTurn, setIsXTurn] = useState(true)
    const [winner, setWinner] = useState<Player | 'draw' | null>(null)

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const checkWinner = (newBoard: Player[]) => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] == newBoard[c]) {
                return newBoard[a]
            }
        }
        if (newBoard.every(cell => cell !== null)) return 'draw'
        return null
    }

    const handleClick = (index: number) => {
        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = isXTurn ? "X" : "O"
        setBoard(newBoard)
        setIsXTurn(!isXTurn)

        const result = checkWinner(newBoard)
        if (result) setWinner(result)
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setIsXTurn(true)
        setWinner(null)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className=" text-4xl font-bold mb-6">Tic Tac Toe</h1>
            <div className="grid grid-cols-3 gap-3">
                {board.map((cell, index) => (
                    <button key={index}
                        onClick={() => handleClick(index)}
                        className=" w-24 h-24 bg-white text-black text-3xl font-bold flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl shadow-lg">
                            {cell}
                        </button>
                ))}
            </div>
            <div className="mt-6 text-xl">
                {winner === "draw" && "It's a Draw"}
                {winner === "X" && "Winner: X"}
                {winner === "O" && "Winner: O"}
            </div>
            <button onClick={resetGame}
            className="mt-6 px-6 py2 bg-white text-black rounded-lg transition-all duration-300 hover:bg-gray-200">
                Reset Game
            </button>
        </div>
    )

}