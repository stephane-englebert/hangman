(() => {
    function aleaNumber(min,max){
        // FINISHED
        let alea = min + Math.floor(Math.round(Math.random() * (max-min)) * 100)/100;
        return alea;
    }
    function initArrayWords(){
        // ENCODE MORE WORDS
        let arrayWords = [];
        if(localStorage.language == "fr"){
            arrayWords = ["coeur","vignette","tasse","lampe","voiture","superbe","dentelle"];
            arrayWords = arrayWords.concat(["chapeau","cheveux","maison","grenouille","serpent"]);
        }
        if(localStorage.language == "en"){
            arrayWords = ["heart","description","blue","christmas","balloon","beautiful","flower"];
            arrayWords = arrayWords.concat(["pudding","football","snack","king","snake"]);
        }
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
        //initWordPanel(wordToGuess);
        showFoundLetters();
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
        target.innerHTML = localStorage.triesNb + "/" + localStorage.maxTries;
    }
    function initWordPanel(wordToGuess){
        // TO-DO
        let target = document.getElementById("wordToGuessContainer");
        target.innerHTML = wordToGuess;
    }
    function initKeyboard(){
        // TO-DO
        let target = document.getElementById("keyboardContainer");
        target.innerHTML = "";
        let keyboardKeys = localStorage.keyboardKeys.split(",");
        keyboardKeys.forEach(key => {
            let keyContainer = document.createElement("div");
            keyContainer.innerHTML = key;
            keyContainer.className = "col-2 col-md-1 kbKeys ";
            keyContainer.id = "key_" + key.toUpperCase();
            keyContainer.style.cursor = "pointer";
            keyContainer.className += "zoomKey";
            target.appendChild(keyContainer);
            document.getElementById("key_"+key.toUpperCase()).addEventListener("click", () => {
                checkKeyProposal(key.toUpperCase());
            })
        })
    }
    function initLocalStorage(){
        localStorage.setItem("wordToGuess","");
        localStorage.setItem("language","fr");
        localStorage.setItem("nbPlayedGames",0);
        localStorage.setItem("bestScore",0);
        localStorage.setItem("gameOver",false);
        localStorage.setItem("gameResult","unknown") // values: unknown, won, lost
        localStorage.setItem("score",0);
        localStorage.setItem("simpleBonus",100);
        localStorage.setItem("triesNb",0);
        localStorage.setItem("maxTries",6);
        localStorage.setItem("choosenLettersTrue","");
        localStorage.setItem("choosenLettersFalse","");
        //localStorage.setItem("keyboardKeys",["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]);
        localStorage.setItem("keyboardKeys",["A","Z","E","R","T","Y","U","I","O","P","Q","S","D","F","G","H","J","K","L","M","W","X","C","V","B","N"]);
        localStorage.setItem("keyboardFr",["A","Z","E","R","T","Y","U","I","O","P","Q","S","D","F","G","H","J","K","L","M","W","X","C","V","B","N"]);
        localStorage.setItem("keyboardEn",["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"]);
    }
    function initNewGame(){
        console.log("AVANT > " + localStorage.choosenLettersFalse);
        let tempLg = localStorage.language;
        let tempNbPlayedGames = localStorage.nbPlayedGames;
        let bestScore = localStorage.bestScore;
        let keyboardKeys = localStorage.keyboardKeys;
        localStorage.clear();
        initLocalStorage();
        localStorage.language = tempLg;
        localStorage.nbPlayedGames = tempNbPlayedGames;
        localStorage.bestScore = bestScore;
        localStorage.keyboardKeys = keyboardKeys;
        localStorage.wordToGuess = initWordToGuess();
        console.log("APRES > " + localStorage.choosenLettersFalse);
        initHangingScene();
        initScore();
        initTries();
        initKeyboard();
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
        document.getElementById("gamePanel").style.display = "none";
        let contentMsgPanel = "";
        let message = "";
        if(localStorage.gameResult == "won"){
            switch(localStorage.language){
                case "fr": message += "Félicitations! <br/>Vous avez trouvé le mot caché!!"; break;
                case "en": message += "Congratulations! <br/>You found the hidden word!";break;
            }
        }else{
            switch(localStorage.language){
                case "fr": message += "Partie perdue.<br/>Essayez à nouveau."; break;
                case "en": message += "Game over.<br/>Try again.";break;
            }
        }
        contentMsgPanel += message;
        document.getElementById("messageContainer").innerHTML = contentMsgPanel;
        document.getElementById("messagePanel").style.display = "block";
        localStorage.nbPlayedGames++;
        document.getElementById("playedGamesNb").innerHTML = localStorage.nbPlayedGames;
        console.log(localStorage);
    }
    function showFoundLetters(){
        let wordToGuess = localStorage.wordToGuess.split("");
        let foundLetters = "";
        wordToGuess.forEach(letter => {
            let letterTrue = localStorage.choosenLettersTrue.includes(letter.toUpperCase());
            if(!letterTrue){
                foundLetters += "<div class='letterToGuess'>-</div>";
            }else{
                foundLetters += "<div class='letterToGuess'>" + letter.toUpperCase() + "</div>";
            }
        })
        initWordPanel(foundLetters);
    }
    function updateScore(){
        // TO-DO
        let score = parseInt(localStorage.score);
        let bonus = parseInt(localStorage.simpleBonus);
        let finalScore = score + bonus;
        localStorage.score = finalScore;
        if(finalScore > localStorage.bestScore){localStorage.bestScore = finalScore;}
        document.getElementById("bestScoreAmount").innerHTML = localStorage.bestScore;
        initScore();
    }
    function updateKeyboardKey(key){
        let choosenLettersTrue = [];
        if(localStorage.choosenLettersTrue.length>0){
            choosenLettersTrue = localStorage.choosenLettersTrue.split(",");
        }
        let choosenLettersFalse = [];
        if(localStorage.choosenLettersFalse.length>0){
            choosenLettersFalse = localStorage.choosenLettersFalse.split(",");
        }
        let keyContainer = document.getElementById("key_" + key);
        if(choosenLettersFalse.includes(key.toUpperCase())){
            keyContainer.style.color = "red";
            keyContainer.style.border = "1px solid red";
            keyContainer.style.borderRadius = "4px";
            keyContainer.style.cursor = "auto";
        }else if(choosenLettersTrue.includes(key.toUpperCase())){
            keyContainer.style.color = "green";
            keyContainer.style.border = "1px solid green";
            keyContainer.style.borderRadius = "4px";
            keyContainer.style.cursor = "auto";
        }
    }
    function checkKeyProposal(key){
        // TO-DO
        //console.clear();
        let isGameOver = (localStorage.gameOver === "true");
        let choosenLettersTrue = [];
        if(localStorage.choosenLettersTrue.length>0){
            choosenLettersTrue = localStorage.choosenLettersTrue.split(",");
        }
        let choosenLettersFalse = [];
        if(localStorage.choosenLettersFalse.length>0){
            choosenLettersFalse = localStorage.choosenLettersFalse.split(",");
        }
        // La partie est-elle toujours en cours?
        if(!isGameOver){
            // lettre déjà proposée?
            let alreadyProposed = false;
            if(localStorage.choosenLettersTrue.includes(key)){alreadyProposed = true;}
            if(localStorage.choosenLettersFalse.includes(key)){alreadyProposed = true;}
            if(!alreadyProposed){
                if(localStorage.wordToGuess.includes(key.toLowerCase())){
                    // La lettre proposée est comprise dans le mot à deviner
                    choosenLettersTrue.push(key);
                    localStorage.choosenLettersTrue = choosenLettersTrue.toString() ;
                    updateScore();
                    showFoundLetters();
                    if(wordGuessed()){
                        // Le mot est trouvé, fin de la partie (victoire)
                        localStorage.gameOver = "true";
                        localStorage.gameResult = "won";
                        messageGameOver();
                    }else{
                        updateKeyboardKey(key);
                    }
                }else{
                    // La lettre proposée n'est pas comprise dans le mot à deviner
                    choosenLettersFalse.push(key);
                    localStorage.choosenLettersFalse = choosenLettersFalse.toString();
                    localStorage.triesNb++;
                    initTries();
                    initHangingScene();
                    showFoundLetters();
                    if(localStorage.triesNb >= localStorage.maxTries){
                        // Plus d'essais disponibles, fin de la partie (défaite)
                        localStorage.gameOver = "true";
                        localStorage.gameResult = "lost";
                        messageGameOver();
                    }else{
                        updateKeyboardKey(key);
                    }
                }
            }
            console.log(choosenLettersTrue);
            console.log(choosenLettersFalse);
        }
    }
    function togglePanels(){
        let panel1 = document.getElementById("gamePanel");
        let panel2 = document.getElementById("messagePanel");
        if(panel1.style.display == "none"){
            panel2.style.display = "none";
            panel1.style.display = "block";
        }else{
            panel1.style.display = "none";
            panel2.style.display = "block";
        }
        initNewGame();
    }
    function updateLanguage(lg){
        switch (lg) {
            case "fr":
                localStorage.keyboardKeys = localStorage.keyboardFr;
                localStorage.language = "fr";
                document.getElementById("playedGamesTitle").innerHTML = "Parties jouées";
                document.getElementById("bestScoreTitle").innerHTML = "Meilleur score";
                document.getElementById("messageContainer").innerHTML = "";
                document.getElementById("play").innerHTML = "Jouer";
                document.getElementById("quit").innerHTML = "Quitter";
                document.getElementById("btn-fr").innerHTML = "Français";
                document.getElementById("btn-fr").className = "focus";
                document.getElementById("btn-en").innerHTML = "Anglais";
                document.getElementById("btn-en").className = "";
                break;
            case "en":
                localStorage.keyboardKeys = localStorage.keyboardEn;
                localStorage.language = "en";
                document.getElementById("playedGamesTitle").innerHTML = "Played games";
                document.getElementById("bestScoreTitle").innerHTML = "Best score";
                document.getElementById("messageContainer").innerHTML = "";
                document.getElementById("play").innerHTML = "Play";
                document.getElementById("quit").innerHTML = "Quit";
                document.getElementById("btn-fr").innerHTML = "French";
                document.getElementById("btn-fr").className = "";
                document.getElementById("btn-en").innerHTML = "English";
                document.getElementById("btn-en").className = "focus";
                break;
        }
        initNewGame();
    }
    window.onload = function () {
        // initialisation
        if(!localStorage.nbPlayedGames>0){initLocalStorage();}
        let wordToGuess = initWordToGuess();
        initHangingScene();
        initScore();
        initTries();
        initKeyboard();
        localStorage.keyboardKeys.split(",").forEach(key => {
            document.getElementById("key_"+key.toUpperCase()).addEventListener("click", () => {
                checkKeyProposal(key.toUpperCase());
            })
        })
        document.getElementById("play").addEventListener("click", () => togglePanels());
        document.getElementById("btn-fr").addEventListener("click", () => updateLanguage("fr"));
        document.getElementById("btn-en").addEventListener("click", () => updateLanguage("en"));
    }
})();