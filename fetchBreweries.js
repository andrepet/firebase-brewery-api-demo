import firebase from "./firebase";
import "firebase/database";


export default function fetchBreweries(){
    fetch("https://api.openbrewerydb.org/breweries")
    .then(response => response.json())
    .then(renderDom);
}

function renderDom(breweries){
    document.getElementById("BreweryList").innerHTML = ""; // empty list between each call
    for(const brewery of breweries){
        const node = document.createElement("LI");
        const textNode = document.createTextNode(`Name: ${brewery.name}`);
        const button = document.createElement("button");
        button.innerText = "Save";
        button.onclick = () => {
            saveBrewery(brewery);
            button.disabled = true;
        };  
        node.appendChild(button);
        node.appendChild(textNode);
        document.getElementById("BreweryList").appendChild(node);
    }
}

function saveBrewery(brewery){
    const favorites = firebase.database().ref().child("favorites");
    favorites.child(brewery.id).set(brewery);
}

