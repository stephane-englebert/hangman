(() => {
    function aleaNumber(min,max){
        // FINISHED
        let alea = min + Math.floor(Math.round(Math.random() * (max-min)) * 100)/100;
        return alea;
    }
    function initArrayWords(){
        // ENCODE MORE WORDS
        let arrayWords = ["heart","description","blue","christmas","balloon","beautiful","flower"];
        arrayWords = arrayWords.concat(["pudding","football","snack","king","snake"]);
        return arrayWords;
    }
    function initWordToGuess(){
        // FINISHED
        let arrayWords = initArrayWords();
        let finished = false;
        let wordToGuess = "";
        while(!finished){
            let aleaNb = aleaNumber(0,arrayWords.length-1);
            wordToGuess = arrayWords[aleaNb];
            if(wordToGuess!==localStorage.wordToGuess){
                finished = true;
                localStorage.wordToGuess = wordToGuess;
            }
        }
        initWordPanel(wordToGuess);
        return wordToGuess;
    }
    function initHangingScene(){
        // TO-DO
        let target = document.getElementById("hangedMan");
        target.innerHTML = localStorage.triesNb;
    }
    function initScore(){
        // TO-DO
        let target = document.getElementById("score");
        target.innerHTML = localStorage.score;
    }
    function initTries(){
        // TO-DO
        let target = document.getElementById("tries");
        target.innerHTML = localStorage.triesNb;
    }
    function initWordPanel(wordToGuess){
        // TO-DO
        let target = document.getElementById("wordToGuessContainer");
        target.innerHTML = wordToGuess;
    }
    function initKeyboard(){
        // TO-DO
        let target = document.getElementById("keyboardContainer");
        let choosenLettersTrue = localStorage.choosenLettersTrue;
        let choosenLettersFalse = localStorage.choosenLettersFalse;
        let keyboardKeys = localStorage.keyboardKeys.split(",");
        keyboardKeys.forEach(key => {
            let keyContainer = document.createElement("div");
            keyContainer.innerHTML = key;
            keyContainer.className = "col-2 col-md-1 kbKeys ";
            keyContainer.id = "key_" + key;
            keyContainer.style.cursor = "pointer";
            if(choosenLettersFalse.includes(key)){
                keyContainer.style.color = "red";
                keyContainer.style.border = "1px solid red";
                keyContainer.style.borderRadius = "4px";
                keyContainer.style.cursor = "auto";
            }else if(choosenLettersTrue.includes(key)){
                keyContainer.style.color = "green";
                keyContainer.style.border = "1px solid green";
                keyContainer.style.borderRadius = "4px";
                keyContainer.style.cursor = "auto";
            }else{
                keyContainer.className += "zoomKey";
            }
            target.appendChild(keyContainer);
        })
    }
    function initLocalStorage(){
        localStorage.setItem("wordToGuess","");
        localStorage.setItem("gameOver",false);
        localStorage.setItem("gameResult","unknown") // values: unknown, won, lost
        localStorage.setItem("score",0);
        localStorage.setItem("triesNb",0);
        localStorage.setItem("maxTries",6);
        localStorage.setItem("choosenLettersTrue",[]);
        localStorage.setItem("choosenLettersFalse",[]);
        localStorage.setItem("keyboardKeys",["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]);
    }
    // The function 'wordGuessed' checks if every letters have been found by user and returns a boolean
    function wordGuessed(){
        let wordGuessed = true;
        let wordToGuess = localStorage.wordToGuess.split("");
        wordToGuess.forEach(letter => {
            let letterTrue = localStorage.choosenLettersTrue.includes(letter.toUpperCase());
            if(!letterTrue){wordGuessed = false;}
        })
        return wordGuessed;
    }
    function messageGameOver(){
        // TO-DO

    }
    function checkKeyProposal(key){
        // TO-DO
        let isGameOver = (localStorage.gameOver === "true");
        let choosenLettersTrue = localStorage.choosenLettersTrue.split(",");
        let choosenLettersFalse = localStorage.choosenLettersFalse.split(",");
        // La partie est-elle toujours en cours?
        if(!isGameOver){
            // lettre déjà proposée?
            let alreadyProposed = false;
            if(localStorage.choosenLettersTrue.includes(key)){alreadyProposed = true;}
            if(localStorage.choosenLettersFalse.includes(key)){alreadyProposed = true;}
            console.clear();
            if(!alreadyProposed){
                // Si pas encore proposée, est-elle comprise dans le mot à deviner?
                if(localStorage.wordToGuess.includes(key.toLowerCase())){
                    console.log("Lettre '"+key+"' contenue dans le mot!");
                    choosenLettersTrue.push(key);
                    localStorage.choosenLettersTrue = choosenLettersTrue.toString() ;
                    // Vérifier si le mot n'a pas été trouvé (fin partie)
                    console.log("Word guessed? > " + wordGuessed());
                    if(wordGuessed()){
                        // Si mot trouvé, fin de la partie
                    }else{
                        // Si mot pas trouvé, on continue
                    }
                }else{
                    console.log("Lettre '"+key+"' non présente dans le mot!");
                    choosenLettersFalse.push(key);
                    localStorage.choosenLettersFalse = choosenLettersFalse.toString();
                    localStorage.triesNb++;
                    // Vérifier si cet essai supplémentaire ne marque pas la fin de la partie...
                    if(localStorage.triesNb<localStorage.maxTries){
                        console.log("Tries "+localStorage.triesNb+"/"+localStorage.maxTries+" > Game continuing...");
                    }else{
                        localStorage.gameOver = "true";
                        localStorage.gameResult = "lost";
                        messageGameOver();
                    }
                }
                console.log("choosenLettersTrue ("+typeof localStorage.choosenLettersTrue+")");
                console.table(localStorage.choosenLettersTrue);
                console.log("choosenLettersFalse");
                console.log(localStorage.choosenLettersFalse);
                console.log("Nb of tries > " + localStorage.triesNb);
            }
        }
    }
    window.onload = function () {
        // initialisation
        initLocalStorage();
        let wordToGuess = initWordToGuess();
        initHangingScene();
        initScore();
        initTries();
        initKeyboard();
        localStorage.keyboardKeys.split(",").forEach(key => {
            document.getElementById("key_"+key).addEventListener("click", () => {
                checkKeyProposal(key);
            })
        })
    }
})();