const cells = document.getElementsByClassName("cell");
const restartButton = document.getElementById("restart");
let h2 = document.getElementsByName("h2");

let XTurn = true;

for (cell in cells)
{
    cell.onclick = () => {
        console.log("clicked");
        if (XTurn)
        {
            console.log("clicked");
            cell.innerHTML = "X";
        }
        else
        {
            cell.innerHTML = "O";
        }

        checkIfWin();
    };
}

restartButton.onclick = () =>
{
    console.log("clicked");
    for (cell in cells)
    {
        cell.innerHTML = "";
        console.log("cell reset");
    }
}

function swapTurn(currentTurn)
{
    if (currentTurn === "X")
    {
        XTurn = false;
        h2.innerHTML = "O's Turn";
    }
    else
    {
        XTurn = true;
        h2.innerHTML = "X's Turn";
    }
}

function checkIfWin()
{
    let XWon = true;
    //if won:
    let winAlertDiv = getElementById("win-alert");
    let winAlert = winAlertDiv.createElement("alert");
    if (XWon)
    {
        winAlert.innerHTML = "X Won!";
    }
    else
    {
        winAlert.innerHTML = "O Won!";
    }
    //if not win:
    swapTurn();
}