board = [" "] * 9

def print_board():
    print(f"{board[0]} | {board[1]} | {board[2]}")
    print("--+---+--")
    print(f"{board[3]} | {board[4]} | {board[5]}")
    print("--+---+--")
    print(f"{board[6]} | {board[7]} | {board[8]}")

def check_winner():
    wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    for a, b, c in wins:
        if board[a] == board[b] == board[c] != " ":
            return board[a]

    return None

player = "X"

while True:
    print_board()

    move = int(input(f"Player {player}, choose position (1-9): ")) - 1

    if board[move] != " ":
        print("Spot already taken!")
        continue

    board[move] = player

    winner = check_winner()

    if winner:
        print_board()
        print(f"Player {winner} wins!")
        break

    if " " not in board:
        print_board()
        print("It's a draw!")
        break

    player = "O" if player == "X" else "X"