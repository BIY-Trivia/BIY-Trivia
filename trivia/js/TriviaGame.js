var TriviaGame = function() {

    this.triviaQuestions = [];
    this.arrUsedBefore = [];

};

TriviaGame.prototype.Initialize = function() {
    // Retrieve question data from the database
    var self = this;
    $.ajax({
        url: "php/quest.php",
        type: "post",
        success: function(response) {
            var res = response.trim().split("|");
            //questlength = res.length - 1;
            for (var x = 0; x < res.length - 1; x++)
            {
                var res1 = res[x].split("^");
                self.triviaQuestions.push(new TriviaQuestion(res1[0],
                                                             res1[1],
                                                             [res1[2], res1[3], res1[4]], 
                                                             res1[5]));
            }
        }
    });

    //When the splash is clicked
    $("#SplashScreen").click(function() {
        $("#SplashScreen").hide();
        $("#nav-bar").fadeIn();
        $("#TriviaGame").fadeIn();
        play();
    });

};

TriviaGame.prototype.StartQuestion = function(index) {

    //Print the Topic, Question and Answers into the interface
    var quest = this.triviaQuestions[index];
    $("#welcome").html("Topic - " + quest.type);
    $("#question").html(quest.question);
    $("#ans-1").val(quest.answers[0]);
    $("#ans-2").val(quest.answers[1]);
    $("#ans-3").val(quest.answers[2]);
    
//    arrUsedBefore.push(numberTaken);
//    lastUsed = numberTaken;

};

TriviaGame.prototype.SelectQuestion = function() {
    //Randomly select a question from the array
    numberTaken = (Math.floor((Math.random() * questlength) + 1));
    if (arrUsedBefore.length - 1 == questlength) {
        restartUsed();
    }
    for (var x = 0; x <= arrUsedBefore.length - 1; x++) {
        if (numberTaken == arrUsedBefore[x] || numberTaken == lastUsed)
        {
            wasUsed++;
        }
    }
    if (wasUsed > 0) {
        wasUsed = 0;
        tryRandom();
    }
    else {
        wasUsed = 0;
        printQuest();
    }

};

TriviaGame.prototype.Play = function() {
    // Reset state
    this.arrUsedBefore = [];
    shuffle(this.triviaQuestions);
    
    //Begin the game
    DoCountdown();
    
    $('.answer').click(function(){
                checkAnswer($(this).val());
            });
    
};

TriviaGame.prototype.Lose = function() {
    restartPgrs();
    /*jumbotron.animate({backgroundColor:'#EF5350'},"fast");
     $("#welcome").html("Ooooooh! We are sorry you have lost, maybe the next time");
     $("#question").html('Hey there, I think you would like to visit <a href="http://www.build-it-yourself.com">Build-It-Yourself</a>');*/
    $("#nav-bar").hide();
    $("#TriviaGame").hide();
    $("#victorySplash").fadeIn();
    startpgr("0");
};

TriviaGame.prototype.Win = function() {
    restartPgrs();
             /*jumbotron.animate({backgroundColor:'lightgreen'},"fast");
             $("#welcome").html('Awesome!! You have won the game!');
             $("#question").html('Maybe you would like to visit <a href="http://www.build-it-yourself.com">Build-It-Yourself</a>');*/
             $("#nav-bar").hide();
             $("#TriviaGame").hide();
             $("#victorySplash").fadeIn();
             startpgr("0");
    
};

TriviaGame.prototype.DoCountdown = function() {
    var jumbotron=$("#jumbotron");
    
    //Count down at the beggining of the game begins
        var outcount = 5;
        $("#welcome").html("The game starts in "+outcount);
        jumbotron.animate({backgroundColor:'#4DB6AC'},"fast");
        var ttimer = setInterval(function(){
            if(outcount !== 1)
            {
                outcount--;
                if(outcount === 4){
                    jumbotron.animate({backgroundColor:'#9CCC65'},"fast");
                }else if(outcount === 3){
                    jumbotron.animate({backgroundColor:'#FFCC80'},"fast");
                }else if(outcount === 2){
                    jumbotron.animate({backgroundColor:'#9FA8DA'},"fast");
                }else{
                    jumbotron.animate({backgroundColor:'#90A4AE'},"fast");
                }
                $("#welcome").html("The game starts in "+outcount);
            }
            else{
                jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                clearInterval(ttimer);
                startpgr("1");
                selectquest();
            }
        },1000);    
};

TriviaGame.prototype.CheckAnswer = function(){
                if(ans == arrRightAns[quest])
                {
                    jumbotron.animate({backgroundColor:'lightgreen'},"fast");
                    jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                    scoreac(1);
                }
            else{
                    jumbotron.animate({backgroundColor:'#EF5350'},"fast");
                    jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                    scoreac(-1);
                }
};

TriviaGame.prototype.startpgr = function(){
            var pgr = 0;
            var timin = 0;
            var startTime = Date.now();
            var answerTime = 10;
            var limit = starttime.getSeconds() + answerTime;
            $("#pgrbar-lbl").fadeIn();
            $("#pgrbar1").css("width",pgr+"%");
            $("#pgrbar2").css("width",pgr+"%");
            var ttimer1 = setInterval(function(){
                var nowSeconds = Date.now().getSeconds();
                if(limit >= nowSeconds){
                    var pgrPerc = ((answerTime-(limit-nowSeconds))*100)/answerTime;
                    if(pgrPerc < 60){
                        $("#pgrbar1").css("width",pgrPerc+"%");
                    }
                    else{
                        $("#pgrbar2").css("width",(pgrPerc-56)+"%");
                    }
                } else {
                    clearInterval(ttimer1);
                    restartPgrs();
                    checkAnswer("[]76/'.;.'2.1';.21';4.3'2./4';1.241'/.4';2.");
                }},100);
  
};

TriviaGame.prototype.restartPgrs = function(){
        $("#pgrbar1").css("width","0%");
        $("#pgrbar2").css("width","0%");    
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}