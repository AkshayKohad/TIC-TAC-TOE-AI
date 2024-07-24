// 6 parts

window.onload = function()
{
    // 1. Initial states

    var num; // number of canvas
    var box; // canvas element clicked at that moment
    var ctx;
    var turns=1; // number of turns played by player

    var filled; // array element showcasing canvas is filled or not
    var symbol; // array element showcasing which symbol canvas has
    var winner;
    
    var gameOver=false; // To check whether game is over or not

    var human='X';
    var ai='O';

    var result = {};  //{index,score} object which will hold result of all MINIMAX functions for each move and selects optimal move
    
    filled = new Array();
    symbol = new Array();
    
    winner = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]] // 0 indexing
    // winning conditions if all symbols are same in following canvases
    // [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
 
    for(var i=0;i<9;i++)
    {
        filled[i] = false;
        symbol[i] = '';
    }
    
    //newGame - event + function
    var n = document.getElementById("new");
    n.addEventListener("click",newGame)


    // reload page
    function newGame()
    {
        document.location.reload()
    }

    
    // canvas click + retrieving the box's Number
    //canvas click event

    document.getElementById("tic").addEventListener("click",function(e){
        boxClick(e.target.id);
    });

    // 2. Drawing X's and O's

    // Draw X
    function drawX()
    {
       box.style.backgroundColor = "#fb5181";
       ctx.beginPath();
       ctx.moveTo(15,15);
       ctx.lineTo(85,85);
       ctx.moveTo(85,15);
       ctx.lineTo(15,85);
       ctx.lineWidth = 21;
       ctx.lineCap = "round";
       ctx.strokeStyle = "white";
       ctx.stroke();
       ctx.closePath();

       symbol[num-1] = human;
    }

    //Drawing O
    function drawO(next) {
        box.style.backgroundColor = "#93f273";
        ctx.beginPath();
        ctx.arc(50,50,35,0,2*Math.PI);
        ctx.lineWidth = 20;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
        

        symbol[next] = ai;
    }

    // 3.Winner check Function
    function winnerCheck(symbol,player)
    {
        for(var j=0;j<winner.length;j++)
        {
            if((symbol[winner[j][0]] == player) && (symbol[winner[j][1]] == player) && (symbol[winner[j][2]] == player))
                {
                    return true;
                }
        }

        return false;
    }

    // 4. BOX click function - Human Playing
    function boxClick(numId)
    {
        box = document.getElementById(numId);
        ctx = box.getContext("2d");

        switch(numId)
        {
            case "canvas1":num = 1;
                           break;
            case "canvas2":num = 2;
                           break;
            case "canvas3":num = 3;
                           break;
            case "canvas4":num = 4;
                           break;
            case "canvas5":num = 5;
                           break;
            case "canvas6":num = 6;
                           break;
            case "canvas7":num = 7;
                           break; 
            case "canvas8":num = 8;
                           break;
            case "canvas9":num = 9;
                           break;              
        }
    
        if(filled[num-1] == false)
            {
                if(gameOver == false)
                    {
                        if(turns%2 !==0)
                            {
                               drawX();
                               turns++;
                               filled[num-1]=true;

                               if(winnerCheck(symbol,symbol[num-1]) === true)
                                {
                                    document.getElementById("result").innerText = "Player '" + symbol[num-1] + "' won!";
                                    gameOver = true;

                                }

                                if(turns > 9 && gameOver!==true)
                                    {
                                        document.getElementById("result").innerText = "GAME OVER! IT WAS A DRAW!";
                                        return;
                                    }

                                if(turns%2 == 0)
                                    {
                                        playAI();
                                    }    
                            }
                    }
                    else{
                       alert("Game Over. Please click the New Game button to start again");
                    }
            }
            else{
                alert("This box was already filled. Please click on another one.");
            }
    }

    //5. Find the empty boxes
    function emptyBoxes(newSymbol)
    {
        var j=0;
        var empty = [];
        for(var i=0;i<newSymbol.length;i++)
            {
                if(newSymbol[i] !=='X' && newSymbol[i]!=='O')
                    {
                        empty[j] = i;
                        j++;
                    }
            }

            return empty;
    }

    //6. Making the AI play - playAI() and minimax()

    // playAI()
    function playAI()
    {
        
        //Symbol,ai('O') - return object - id of box,score

        var nextMove = miniMax(symbol,ai);
        //object that stores id of the next move and score of the box for next move

        var nextId = "canvas" + (nextMove.id + 1);

        box = document.getElementById(nextId);
        ctx = box.getContext("2d");

        if(gameOver === false)
            {
                if(turns%2 === 0)
                    {
                        drawO(nextMove.id);
                        turns++;
                        filled[nextMove.id] = true;

                        if(winnerCheck(symbol,symbol[nextMove.id]) === true)
                            {
                                document.getElementById("result").innerText = "Player " + symbol[nextMove.id] + "'won!";
                                gameOver = true;                           
                            }
                     // draw condition
                        if(turns > 9  && gameOver !== true)
                            {
                                document.getElementById("result").innerText = "GAME OVER! IT WAS DRAW!";
                            }    
                    }
            }
            else{
                alert("Game is over please click the New Game button to start again");
            }
    }

    // Minimax function

    function miniMax(newSymbol,player)
    {
        // recurring - function that calls itself to completely solve a problem
        // scores - deep - through multiple levels
        // pretend state of game

        var empty = [];
        empty = emptyBoxes(newSymbol);
        
        if(winnerCheck(newSymbol,human) === true)
            {
                 return { score: -10 }; // human wins
            }
        else if(winnerCheck(newSymbol,ai) === true)
            {
                return { score: 10 }; // ai wins
            }
        else if(empty.length === 0)
            {
                if(winnerCheck(newSymbol,human) === true)
                    {
                         return { score: -10 }; // human wins
                    }
                else if(winnerCheck(newSymbol,ai) === true)
                    {
                        return { score: 10 }; // ai wins
                    }
                    else{
                        return { score : 0 };  // game is draw
                    }    
            }    
        
            
        // possible moves - their indices and score values
        
        var posMoves = [];

        for(var i=0;i<empty.length;i++)
            {
                //current move - index of current move,score

                var curMove = {};

                // generate the new board with the current move
                curMove.id = empty[i];

                newSymbol[empty[i]] = player;

                if(player === ai)
                    {
                        result = miniMax(newSymbol,human); //result has both index and score

                        curMove.score = result.score;

                    }
                else{
                        result = miniMax(newSymbol,ai); 

                        curMove.score = result.score;
                }    

                newSymbol[empty[i]] = '';

                posMoves.push(curMove);
            }

            // calculate the score of intermediate states - best move + score with respect to that player + return statement

            var bestMove;

            // AI - max player(always) -> choose maximum value,
            // human - min player(always) -> choose minimum value

            if(player === ai)
                {
                    var highestScore = -1000;

                    for(var j=0;j<posMoves.length;j++)
                        {
                            if(posMoves[j].score > highestScore)
                                {
                                    highestScore = posMoves[j].score;
                                    bestMove = j;
                                }
                        }
                }
            else{
                var lowestScore = 1000;

                    for(var j=0;j<posMoves.length;j++)
                        {
                            if(posMoves[j].score < lowestScore)
                                {
                                    lowestScore = posMoves[j].score;
                                    bestMove = j;
                                }
                        }
            }
            
            return posMoves[bestMove];

    }
};
