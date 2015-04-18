var TriviaGame = function() {

    this.triviaQuestions = [];
    this.nextQuestion = 0;

    this.score = 0;

    this.progressbar = new ProgressBar.Line('#pgrbar-lbl', {color: '#6FD57F'});
    this.time = 0;
    var that = this;
    this.timerIntervalID = setInterval(function() {
        that.timer1();
    }, 100);

};

TriviaGame.prototype.timer1 = function() {
    this.time = this.time + 0.1;
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
        self.Play();
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
    // If the last question used was the last in the array, re-shuffle the questions and start again at the beginning
    if (this.nextQuestion === this.triviaQuestions.length) {
        shuffle(this.triviaQuestions);
        this.nextQuestion = 0;
    }
    ;

    // Print the next question and increment counter
    this.PrintQuestion(this.triviaQuestions[this.nextQuestion]);
    this.nextQuestion++;

};

TriviaGame.prototype.PrintQuestion = function(question) {
    $("#welcome").html("Topic - " + question.type);
    $("#question").html(question.question);
    $("#ans-1").val(question.answers[0]);
    $("#ans-2").val(question.answers[1]);
    $("#ans-3").val(question.answers[2]);
};

TriviaGame.prototype.Play = function() {
    var self = this;

    // Reset state
    self.nextQuestion = 0;
    shuffle(self.triviaQuestions);

    //Begin the game
    self.DoCountdown();

    $('.answer').click(function() {
        self.CheckAnswer($(this).val());
    });

};

TriviaGame.prototype.Lose = function() {
    //this.RestartProgressBar();
    /*jumbotron.animate({backgroundColor:'#EF5350'},"fast");
     $("#welcome").html("Ooooooh! We are sorry you have lost, maybe the next time");
     $("#question").html('Hey there, I think you would like to visit <a href="http://www.build-it-yourself.com">Build-It-Yourself</a>');*/
    $("#nav-bar").hide();
    $("#TriviaGame").hide();
    $("#failureSplash").fadeIn();
    //this.StartProgressBar("0");
};

TriviaGame.prototype.Win = function() {
    //this.RestartProgressBar();
    /*jumbotron.animate({backgroundColor:'lightgreen'},"fast");
     $("#welcome").html('Awesome!! You have won the game!');
     $("#question").html('Maybe you would like to visit <a href="http://www.build-it-yourself.com">Build-It-Yourself</a>');*/
    $("#nav-bar").hide();
    $("#TriviaGame").hide();
    $("#victorySplash").fadeIn();
    //this.StartProgressBar("0");

};

TriviaGame.prototype.DoCountdown = function() {
    var self = this;
    var jumbotron = $("#jumbotron .question-wrapper");
    $('.answers-container').hide();
    
    //Count down at the beggining of the game begins
    var outcount = 5;
    $("#welcome").html("The game starts in " + outcount);
    jumbotron.animate({backgroundColor: '#4DB6AC'}, "fast");
    var ttimer = setInterval(function() {
        if (outcount !== 1)
        {
            outcount--;
            if (outcount === 4) {
                jumbotron.animate({backgroundColor: '#9CCC65'}, "fast");
            } else if (outcount === 3) {
                jumbotron.animate({backgroundColor: '#FFCC80'}, "fast");
            } else if (outcount === 2) {
                jumbotron.animate({backgroundColor: '#9FA8DA'}, "fast");
            } else {
                jumbotron.animate({backgroundColor: '#90A4AE'}, "fast");
            }
            $("#welcome").html("The game starts in " + outcount);
        }
        else {
            jumbotron.animate({backgroundColor: '#E0E0E0'}, "fast");
            $('.answers-container').show();
            clearInterval(ttimer);
            self.StartProgressBar("1");
            self.SelectQuestion();
        }
    }, 1000);
};

TriviaGame.prototype.CheckAnswer = function(ans) {
    var animateBackground = $("#jumbotron .question-wrapper");
    if (ans === this.triviaQuestions[this.nextQuestion - 1].rightAnswer)
    {
        animateBackground.animate({backgroundColor: 'lightgreen'}, "fast");
        animateBackground.animate({backgroundColor: '#E0E0E0'}, "fast");
        this.AdjustScore(1);
    }
    else {
        animateBackground.animate({backgroundColor: '#EF5350'}, "fast");
        animateBackground.animate({backgroundColor: '#E0E0E0'}, "fast");
        this.AdjustScore(-1);
    }
};

TriviaGame.prototype.AdjustScore = function(minplus) {
    var self = this;
    if (self.score + minplus < -5)
    {
        self.Lose();
    }
    else if (self.score + minplus > 10)
    {
        self.Win();
    }
    else {
        self.score = self.score + minplus;
        $("#score").html(this.score);
        self.SelectQuestion();
        self.StartProgressBar("1");
    }
};

TriviaGame.prototype.StartProgressBar = function() {
    var self = this;
    self.progressbar.set(0);
    self.progressbar.animate(1, {duration:10000},
                        function(){
                            self.progressbar.set(0);
                            self.CheckAnswer("[]76/'.;.'2.1';.21';4.3'2./4';1.241'/.4';2.");
                        });
};

TriviaGame.prototype.RestartProgressBar = function() {
    $("#pgrbar1").css("width", "0%");
    $("#pgrbar2").css("width", "0%");
};

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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