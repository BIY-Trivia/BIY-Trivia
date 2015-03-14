$(document).ready(function() {
    var arrType = [" "];
    var arrQuest = [" "];
    var arrAns1 = [" "];
    var arrAns2 = [" "];
    var arrAns3 = [" "];
    var arrRightAns = [" "];
    var arrUsedBefore = [0];
    var questlength = 0;

    var numberTaken = 0;
    var wasUsed = 0;
    var lastUsed = 0;
    var quest = 0;

//Get all the questions from the DB and order them into specific arrays

    var parametros={
        "Usr":""
        };
        $.ajax({
            data: parametros,
            url: "php/quest.php",
            type: "post",
            success:function(response){
                var res = response.trim().split("|");
                questlength = res.length-1;
                for(var x = 0; x < res.length-1; x++)
                {
                    var res1 = res[x].split("^");
                    arrType.push(res1[0]);
                    arrQuest.push(res1[1]);
                    arrAns1.push(res1[2]);
                    arrAns2.push(res1[3]);
                    arrAns3.push(res1[4]);
                    arrRightAns.push(res1[5]);
                }
            }
        });
//----------------------------------------------------------------------
    var jumbotron=$("#jumbotron");

    var time = 0;
    var nowtime = 0;
    var limit = 0;
    var score = 0;
    function timer1(){
        time = time+0.1;
    }
    function score2(){
        $("#score").html(score);
    }
    function restartPgrs(){
        $("#pgrbar1").css("width","0%");
        $("#pgrbar2").css("width","0%");
    }
$("#pgrbar-lbl").hide();
//Starts a global clock and score status updates
    var timer = setInterval(function(){timer1()},100);
    var score1 = setInterval(function(){score2()},100);
//When the splash is clicked
$("#SplashScreen").click(function(){
    $("#SplashScreen").hide();
    $("#nav-bar").fadeIn();
    $("#TriviaGame").fadeIn();
    play();
});
//Print the Topic, Question and Answers into the interface
    function printQuest(){
            quest = numberTaken;
            $("#welcome").html("Topic - "+arrType[quest]);
            $("#question").html(arrQuest[quest]);
            $("#ans-1").val(arrAns1[quest]);
            $("#ans-2").val(arrAns2[quest]);
            $("#ans-3").val(arrAns3[quest]);
            arrUsedBefore.push(numberTaken);
            lastUsed = numberTaken;
        }
    //Controls the amount of questions checked
    function restartUsed(){
        arrUsedBefore.splice(1,questlength);
    }
    //Randomly select a question from the array
    function selectquest(){
            numberTaken = (Math.floor((Math.random() * questlength) + 1));
            if(arrUsedBefore.length-1 == questlength){restartUsed();}
            for(var x = 0; x <= arrUsedBefore.length-1; x++){
                if(numberTaken == arrUsedBefore[x] || numberTaken == lastUsed)
                {
                    wasUsed++;
                }
            }
            if(wasUsed > 0){
                wasUsed = 0;
                tryRandom();
            }
            else{
                wasUsed = 0;
                printQuest();
            }
        }

    function tryRandom(){
                selectquest();
        }

//Code for the Timed version of the game

    function play(){
        function loose(){
             restartPgrs();
             /*jumbotron.animate({backgroundColor:'#EF5350'},"fast");
             $("#welcome").html("Ooooooh! We are sorry you have lost, maybe the next time");
             $("#question").html('Hey there, I think you would like to visit <a href="http://www.build-it-yourself.com">Build-It-Yourself</a>');*/
             $("#nav-bar").hide();
             $("#TriviaGame").hide();
             $("#victorySplash").fadeIn();
             startpgr("0");
        }
        function win(){
             restartPgrs();
             /*jumbotron.animate({backgroundColor:'lightgreen'},"fast");
             $("#welcome").html('Awesome!! You have won the game!');
             $("#question").html('Maybe you would like to visit <a href="http://www.build-it-yourself.com">Build-It-Yourself</a>');*/
             $("#nav-bar").hide();
             $("#TriviaGame").hide();
             $("#victorySplash").fadeIn();
             startpgr("0");
         }
        function scoreac(minplus){
                if(score + minplus< -5)
                    {loose();}
                else if(score + minplus > 10)
                    {win();}
                else{
                    score = score + minplus;
                    selectquest();
                    startpgr("1");}
        }
    //Count down at the beggining of the game begins
        var outcount = 5;
        $("#welcome").html("The game starts in "+outcount);
        jumbotron.animate({backgroundColor:'#4DB6AC'},"fast");
        var ttimer = setInterval(function(){wel1()},1000);
        function wel1(){
            if(outcount != 1)
            {
                outcount--;
                if(outcount == 4){jumbotron.animate({backgroundColor:'#9CCC65'},"fast");}else if(outcount == 3){jumbotron.animate({backgroundColor:'#FFCC80'},"fast");}else if(outcount == 2){jumbotron.animate({backgroundColor:'#9FA8DA'},"fast");}else{jumbotron.animate({backgroundColor:'#90A4AE'},"fast");}
                $("#welcome").html("The game starts in "+outcount);
            }
            else{
                jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                clearInterval(ttimer);
                startpgr("1");
                selectquest();
            }
        }
    //Checking the selected answer
        function checkAnswer(ans){
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
        }
    //Waiting for the user to choose an answer
            $("#ans-1").click(function(){
                checkAnswer($("#ans-1").val());
            });
            $("#ans-2").click(function(){
                checkAnswer($("#ans-2").val());
            });
            $("#ans-3").click(function(){
                checkAnswer($("#ans-3").val());
            });
    //Answer time count down and Progress Bar effect
        function startpgr(bool)
        {
            if(bool == "0"){
                limit = 01051997;
            }
            var pgr = 0;
            var timin = 0;
            nowtime = time;
            var answerTime = 10;
            limit = nowtime+answerTime;
            $("#pgrbar-lbl").fadeIn();
            $("#pgrbar1").css("width",pgr+"%");
            $("#pgrbar2").css("width",pgr+"%");
            var ttimer1 = setInterval(function(){wel()},100);
            function wel(){
                if(limit >= time && limit != 01051997){
                    var pgrPerc = ((answerTime-(limit-time))*100)/answerTime;
                    if(pgrPerc < 60){
                        $("#pgrbar1").css("width",pgrPerc+"%");
                    }
                    else{
                        $("#pgrbar2").css("width",(pgrPerc-56)+"%");
                    }
                }
                else if(limit == 01051997){
                    clearInterval(ttimer1);
                }
                else{
                    clearInterval(ttimer1);
                    restartPgrs();
                    checkAnswer("[]76/'.;.'2.1';.21';4.3'2./4';1.241'/.4';2.");
                }
            }
        }
    }
});