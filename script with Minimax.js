const cellElements = document.querySelectorAll(".board .cell");
const final=document.querySelector(".reset");
const text=document.querySelector(".reset h1");
const btn=document.querySelector(".reset button");
const body=document.querySelector(".board");

const human = "O";
const AI = "X"; 
const Jitkoabastha =  [ 
[0, 1, 2], 
[3, 4, 5], 
[6, 7, 8], 
[0, 3, 6], 
[1, 4, 7], 
[2, 5, 8], 
[0, 4, 8],  
[2, 4, 6]  
];


let changeTurn = true; 

cellElements.forEach((cell) =>
 {
  cell.onclick = () => 
  {
    let palyerBalla = changeTurn ? human : AI; 
    if(palyerBalla==='O')
    {
      cell.classList.add("disable");
      cell.innerHTML = palyerBalla;
    
     }
  // else{
  //   aikopalo(cell,palyerBalla);
  // }
    if (JitYoKasaila(palyerBalla)===10)
     {
      //console.log(palyerBalla+"Winner2");
      final.classList.remove("inactive");
      text.innerHTML=  " You won the game.";
      body.classList.add("inactive");
      }
    
    else if(drawBhoKi())
    {
     // console.log("draw")
     final.classList.remove("inactive");
      text.innerHTML= " The game have tied. ";
      body.classList.add("inactive");
    }
    else
    {
    swapKancha(); 
    }
  };
});

function swapKancha()
{ 
  changeTurn = !changeTurn; 
  if(changeTurn===false)
  {
    aikopalo();
     if (JitYoKasaila()===-10)
      {
      //console.log(palyerBalla+"Winner2");
      final.classList.remove("inactive");
      text.innerHTML= "You lost the game.";
      body.classList.add("inactive");
     }

    else if(drawBhoKi())
    {
     // console.log("draw")
     final.classList.remove("inactive");
      text.innerHTML= " The game have tied. ";
      body.classList.add("inactive");
    }
    else
    {
    changeTurn = !changeTurn; 
    }
  }
}
function aikopalo()
{
  
    let a=bestThau();
    // cell.classList.add("disable");
    //  cell.innerHTML = palyerBalla;
     cellElements[a].innerHTML ="X";
     cellElements[a].classList.add("disable");
    
}

function JitYoKasaila()
 {
  for (let i = 0; i < Jitkoabastha.length; i++) 
  {
    const [a, b, c] = Jitkoabastha[i];

    if (cellElements[a].innerHTML && (cellElements[a].innerHTML=== cellElements[b].innerHTML) && (cellElements[b].innerHTML === cellElements[c].innerHTML))
     {
       if(cellElements[a].innerHTML==='O')
            {return 10;}
       else if (cellElements[a].innerHTML==='X')
            {return -10}

      return 0;
    }
  }
 
}
function drawBhoKi() {
  for (let i = 0; i < cellElements.length; i++) 
  {
    if (cellElements[i].innerHTML === '') 
    {
      return false;
    }
  }
  if(!JitYoKasaila())
    return true;
}
btn.onclick=()=>
{
  location.reload()
}

function minmax(ismax)
{
  let score = JitYoKasaila();
  if (score === 10)
   {
    return score;
  }
  if (score === -10)
   {
    return score;
  }
  if (drawBhoKi()) 
  {
    return 0;
  }
  if (ismax) 
  {
    let best = -Infinity;
    for (let i = 0; i < cellElements.length; i++)
    {
      if (cellElements[i].innerHTML === "")
       {
        cellElements[i].innerHTML = "O";
        let value1 = minmax(false);
        cellElements[i].innerHTML = "";
        if (value1 >= best)
         {
          best = value1;
          }
      }
    }
    return best;
  } else
   {
    let best = Infinity;
    for (let i = 0; i < cellElements.length; i++)
     {
      if (cellElements[i].innerHTML === "")
       {
        cellElements[i].innerHTML = "X";
        let value1 = minmax(true);
        cellElements[i].innerHTML = "";
        if (value1 <= best)
         {
          best = value1;
        }
      }
    }
    return best;
  }
}

 function bestThau()
 {
  let best=Infinity;
  let bestmove=-1;
  for (let i = 0; i < cellElements.length; i++)
  {
    if (cellElements[i].innerHTML === '')
    {
        cellElements[i].innerHTML= "X";
        let value1=minmax(true)
        cellElements[i].innerHTML= "";
        if(value1<=best)
        {
            bestmove=i;
            best=value1;
        }
    }

  }
  return bestmove;
}