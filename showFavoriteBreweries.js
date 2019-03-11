import firebase from "./firebase";
import "firebase/database";

const favorites = firebase.database().ref().child("favorites");

export default function showFavoriteBreweries(){
    favorites.once("value")
        .then(snapshot => snapshot.val())
        .then(renderDOM);
}

function renderDOM(breweries){
    document.getElementById("BreweryList").innerHTML = ""; // empty list between each call
    for (const breweryKey in breweries){
        const brewery = breweries[breweryKey];
        const node = document.createElement("LI");
        const textNode = document.createTextNode(`Name: ${brewery.name}`);
        const button = document.createElement("button");
        button.innerText = "Delete";
        button.onclick = () => deleteBrewery(breweryKey);  
        node.appendChild(button);
        node.appendChild(textNode);
        document.getElementById("BreweryList").appendChild(node);
    }
}

function deleteBrewery(breweryKey){
    favorites.child(breweryKey).remove();
    showFavoriteBreweries();
}
