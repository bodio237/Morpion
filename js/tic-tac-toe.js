'use strict';
let MESSAGES = {
    'message1': 'Bienvenue sur notre jeu.',
    'message2': ' vous avez gagné !'
};


function welcome() {
    console.log(MESSAGES.message1);
    alert(MESSAGES.message1);
}
welcome();
let MARKS = ['✔', '✗'];// declaration de constante
let element = document.getElementById("cell0");// declaration de element
//boucle qui permet de parcourir toutes les cases du jeu
for(let i=0; i<9; i++)
{
    const cell= document.getElementById("cell"+i);// affectation(cell j'affecte cell+i) premier element du tableau 
    cell.addEventListener("click", fill);//quand tu cliques sur une case, ça déclenche une action (la fonction fill, qui doit probablement mettre un X ou un O dans la case).
}
element.addEventListener('click', fill);
let PLAYER1 = MARKS[0];
let PLAYER2 = MARKS[1];
function fill(event)
{
 console.log(event.target);
 let cell = event.target;
 if(cell.innerHTML == "" || cell.innerHTML == PLAYER2){
        cell.innerHTML = PLAYER1;
        cell.style.color = "green";

    }
    else{
        cell.innerHTML = PLAYER2;
        cell.style.color = "red";
    }
    
}
function verifyPlayer(playerMark){

     // Vérification des lignes
     for (let i = 0; i <= 6; i += 3) {
        if (
            document.getElementById("cell" + i).innerHTML === playerMark &&
            document.getElementById("cell" + (i + 1)).innerHTML === playerMark &&
            document.getElementById("cell" + (i + 2)).innerHTML === playerMark
        ) {
            return true;
        }
    }
    // Vérification des colonnes
    for (let i = 0; i < 3; i++) {
        if (
            document.getElementById("cell" + i).innerHTML === playerMark &&
            document.getElementById("cell" + (i + 3)).innerHTML === playerMark &&
            document.getElementById("cell" + (i + 6)).innerHTML === playerMark
        ) {
            return true;
        }
    }

    // Vérification des diagonales
    // de gauche à droite
    if (
        document.getElementById("cell0").innerHTML === playerMark &&
        document.getElementById("cell4").innerHTML === playerMark &&
        document.getElementById("cell8").innerHTML === playerMark
    ) {
        return true;
    }
    //de droite à gauche
    if (
        document.getElementById("cell2").innerHTML === playerMark &&
        document.getElementById("cell4").innerHTML === playerMark &&
        document.getElementById("cell6").innerHTML === playerMark
    ) {
        return true;
    }
    return false;

}
// Ajout du gestionnaire d’évènement
document.getElementById("play").addEventListener("click", verify); //sélectionne le bouton HTML avec l’attribut id="play" et indique que quand on clique sur ce bouton, la fonction verify() doit être appelée.

function verify() {
    let name1 = document.getElementById("name1").value;
    let name2 = document.getElementById("name2").value;

    if (verifyPlayer(PLAYER1)){ //On vérifie si le joueur 1 (PLAYER1) a gagné en appelant la fonction verifyPlayer  
        alert("Bravo " + name1 + " vous avez gagné !!"); // alert("Bravo " + name1 + " vous avez gagné !!")
        addScore(name1); // on ajoute le score
        resetBoard();//on réinitialise le plateau pour relancer une nouvelle partie.
    } else if (verifyPlayer(PLAYER2)) // on vérifie si c’est le joueur 2 qui a gagné
     {
        alert("Bravo " + name2 + " vous avez gagné !!");
        addScore(name2); //  on ajoute le score
        resetBoard();
    }
    else if (isBoardFull()) { // Si le plateau est plein et qu'il n'y a pas de gagnant
        alert("Match nul ! Aucun joueur n'a gagné.");
        resetBoard(); // Réinitialise le plateau

    }else //Si aucun des deux n’a gagné, on affiche un message disant que la partie continue.

    {
        alert("Pas encore de gagnant.");
    }
}
function isBoardFull() {
    for (let i = 0; i < 9; i++) {
        if (document.getElementById("cell" + i).innerHTML === "") {
            return false; // Si une case est vide, retourne false
        }
    }
    return true; // Si toutes les cases sont remplies, retourne true
}

// Réinitialisation du plateau
function resetBoard() { // fonction qui va vider toutes les cases du jeu
    for (let i = 0; i < 9; i++) {
        document.getElementById("cell" + i).innerHTML = "";
    }
}
//Gestion des scores
function addScore(name) {
    let table = document.getElementById("scores"); //on cherche dans le HTML un élément dont l’id est "scores" on stocke cet élément (le tableau) dans une variable nommée table, pour pouvoir le réutiliser juste après
    let newRow = table.insertRow(); // ajoute une ligne à la fin du tableau

    let nameCell = newRow.insertCell(0); // première cellule : nom
    let dateCell = newRow.insertCell(1); // deuxième cellule : date et heure

    nameCell.innerHTML = name;// On écris le nom du joueur dans la première case de la nouvelle ligne du tableau.
    dateCell.innerHTML = new Date().toLocaleString(); // date/heure actuelle formatée
}
//Gestion du timer
// Stocke la date/heure de début de partie
let startTime = new Date();

//Appelle la fonction updateTimer chaque seconde
setInterval(updateTimer, 1000);

function updateTimer() { 
     // Récupère la date actuelle
     let currentTime = new Date();

     // Calcule la différence en millisecondes
     let diff = currentTime - startTime;
 
     // Convertit en secondes
     let seconds = Math.floor(diff / 1000);
 
     // Convertit en minutes et secondes
     let mins = Math.floor(seconds / 60);
     let secs = seconds % 60;
 
     // Formate l'affichage (ex: 03:07)
     let formattedTime = 
         (mins < 10 ? "0" + mins : mins) + ":" + //Si les minutes sont plus petites que 10, on ajoute un zéro devant, sinon on garde la valeur telle quelle 
         (secs < 10 ? "0" + secs : secs);
 
     // Affiche dans le HTML  d'id "timer"
     document.getElementById("timer").textContent = formattedTime; //Ça va chercher l’élément HTML qui a pour id="timer"  Ça remplace le contenu texte de cet élément par la valeur de la variable formatted (qui contient l’heure au format "mm:ss")
 }