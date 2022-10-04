    const cells = Array.from(document.getElementsByClassName('cell'));
    const playerDisplay = document.querySelector('.display-player');
    const restartButton = document.getElementById('restart');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    let turnCount = 0;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //if the cell is unoccupied, returns true
    const isValidAction = (cell) => {
        if (cell.innerHTML === 'X' || cell.innerHTML === 'O'){
            return false;
        }

        return true;
    };

    //updates board array with currentPlayer
    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    //changes the name and class of the current player in the h2
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerHTML = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    //on click function for each cell. 
    const userAction = (cell, index) => {
        if(isValidAction(cell) && isGameActive) {
            turnCount++;
            cell.innerHTML = currentPlayer;
            cell.classList.add(`player${currentPlayer}`);
            updateBoard(index);

            if (turnCount >= 5)
            {
                checkIfWon();
            }

            changePlayer();
        }
    }
    
    //resets the board and display so we can begin the game again
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        turnCount = 0;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('playerX');
            cell.classList.remove('playerO');
        });
    }

    //handles checking the board against the winning conditions after turn 5, which is the earliest
    //a player can win
    function checkIfWon() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    //displays the winner and announcement alert
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won!';

                if (announcer.classList.contains('alert-secondary'))
                {
                    announcer.classList.remove('alert.secondary');
                    announcer.classList.add('alert-success');
                }
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';

                if (announcer.classList.contains('alert-secondary'))
                {
                    announcer.classList.remove('alert.secondary');
                    announcer.classList.add('alert-success');
                }
                break;
            case TIE:
                announcer.innerText = 'Tie';
                
                if (announcer.classList.contains('alert-success'))
                {
                    announcer.classList.remove('alert-success');
                    announcer.classList.add('alert-secondary');
                }
        }

        announcer.classList.remove('hide');
    };

    //adds an on click event to each cell
    cells.forEach( (cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    });

    //adds an on click event to the restart button
    restartButton.addEventListener('click', resetBoard);