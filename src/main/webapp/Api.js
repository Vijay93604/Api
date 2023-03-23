var json = {};

function callApi(){

    var xhr = new XMLHttpRequest();
    var word = document.getElementById("word").value;
    console.log(word);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.responseText);
            json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    }

    xhr.open("POST" ,"http://localhost:8080/Api/ApiCall");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("word="+word);
}

document.getElementById("word").addEventListener("keypress", () => {
    document.getElementById("proL").innerText = "";
    document.getElementById("actWord").innerText = "";
    document.getElementById("vv1").innerText = "";
    document.getElementById("vv2").innerText = "";
    document.getElementById("meaningInNoun").innerText = "";
    document.getElementById("meaningInVerb").innerText = "";
    var n = document.getElementById("n1");
    var v = document.getElementById("v1");
    n.nextSibling.innerText = "";
    v.nextSibling.innerText = "";

    var allLi = document.querySelectorAll(".nounMeaning");
    var allLi2 = document.querySelectorAll(".verbMeaning");

    for(let i = 0 ; i < allLi.length ; i++){
        allLi[i].innerText = "";
        allLi2[i].innerText = "";
    }

    if(event.key === "Enter"){
        var xhr = new XMLHttpRequest();
        var word = document.getElementById("word").value;
        console.log(word);
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200){

                console.log(xhr.responseText);
                try{
                    json = JSON.parse(xhr.responseText);
                }catch(err){
                    alert("Word Not Found");
                    return;
                }
                console.log(json);
                document.getElementById("actWord").innerText = json[0].word;

                if(json[0].phonetic != undefined){
                    document.getElementById("proL").innerText = json[0].phonetic;
                }else{
                    if(json[0].phonetics[2].text != undefined){
                        document.getElementById("proL").innerText = json[0].phonetics[2].text;
                    }else{
                        document.getElementById("proL").innerText = "";
                    }
                }

                addMeanings();
                addSynonyms();

                var u = document.getElementById("url");
                u.innerHTML = "";
                var a = document.createElement("a");
                a.innerText = "";
                a.setAttribute("href",json[0].sourceUrls[0]);
                a.innerText = json[0].sourceUrls[0];
                u.appendChild(a);
                
            

            }
        }
    
        xhr.open("POST" ,"http://localhost:8080/Api/ApiCall");
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send("word="+word);
    }
});

function playSound(){

    for(let i = 0 ; i < json[0].phonetics.length ; i++){
        if(json[0].phonetics[i].audio != undefined && json[0].phonetics[i].audio != ""){
            var wordSound = new Audio(json[0].phonetics[i].audio+"");
            wordSound.play();
            return;
        }
    }
    
}

function addSynonyms(){

    var n = document.getElementById("n1");
    var v = document.getElementById("v1");

    if(json[0].meanings[0].synonyms.length == 0){
        n.nextSibling.innerText = "";
    }else{
        n.nextSibling.innerText = json[0].meanings[0].synonyms[0];
    }

    if(json[0].meanings[1].synonyms.length == 0){
        v.nextSibling.innerText="";
    }else{
        n.nextSibling.innerText = json[0].meanings[1].synonyms[0];
    }

}

function addMeanings(){
    var c = 0;
    var c2 = 0;
    var nounMeaning = document.querySelectorAll(".nounMeaning");
    var verbMeaning = document.querySelectorAll(".verbMeaning");
    console.log(nounMeaning);
    for(let i = 0 ; i < json[0].meanings[0].definitions.length ; i++){
        if(json[0].meanings[0].definitions.length == 1){
            document.getElementById("n1").nextSibling.innerText = "";
        }
        if(json[0].meanings[0].definitions[i] != undefined && json[0].meanings[0].definitions[i] != ""){
            if(c == 2){break}
            console.log(c);
            nounMeaning[c].innerText = json[0].meanings[0].definitions[i].definition;
            c++;
            if(json[0].meanings[0].definitions.length == 1){break};
        }
    }

    for(let i = 0 ; i < json[0].meanings[1].definitions.length ; i++){
        if(json[0].meanings[1].definitions.length == 1){
            // verbMeaning[1].remove();
            document.getElementById("v1").nextSibling.innerText = "";
        }
        if(json[0].meanings[1].definitions[i] != undefined && json[0].meanings[1].definitions[i] != ""){
            if(c2 == 2){break}
            verbMeaning[c2].innerText = json[0].meanings[1].definitions[i].definition;
            c2++;
            if(json[0].meanings[1].definitions.length == 1){break};
        }
    }
}