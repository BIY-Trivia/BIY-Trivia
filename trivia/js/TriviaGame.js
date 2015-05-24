var TriviaGame = function(dataService) {
    this.triviaQuestions = dataService.GetQuestions();
    this.nextQuestion = 0;
    this.score = 0;
    this.progressbar = new ProgressBar.Line('#pgrbar-lbl', 
        {color: '#6FD57F',
        strokeWidth: 30,
        from: { color: '#6FD57F' },
        to: { color: '#FF0000' },
        step: function(state, circle, attachment) {
            circle.path.setAttribute('stroke', state.color);
        }});
    };

TriviaGame.prototype.UpdateScoreboard = function() {
    $("#score").html(this.score);
}

TriviaGame.prototype.Initialize = function() {
    var self = this;

    $('.answer').click(function() {
        self.CheckAnswer($(this).val());
    });

    //When the splash is clicked
    $("#SplashScreen").click(function() {
        $("#SplashScreen").hide();
        $("#nav-bar").fadeIn();
        $("#TriviaGame").fadeIn();
        self.Play();
    });

};

TriviaGame.prototype.Play = function() {
    var self = this;

    // Reset state
    self.nextQuestion = 0;
    self.score = 0;
    self.UpdateScoreboard();
    shuffle(self.triviaQuestions);
    $('.biy-splash').hide();
    $('#TriviaGame').show();

    //Begin the game
    self.DoCountdown(function(){
        $('.answers-container').show();
        self.StartProgressBar("1");
        self.SelectQuestion();
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
};

TriviaGame.prototype.SelectQuestion = function() {
    // If the last question used was the last in the array, re-shuffle the questions and start again at the beginning
    if (this.nextQuestion === this.triviaQuestions.length) {
        shuffle(this.triviaQuestions);
        this.nextQuestion = 0;
    }

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

TriviaGame.prototype.Lose = function() {
    this.progressbar.stop();
    $("#nav-bar").hide();
    $("#TriviaGame").hide();
    $("#failureSplash").fadeIn();
};

TriviaGame.prototype.Win = function() {
    this.progressbar.stop();
    $("#nav-bar").hide();
    $("#TriviaGame").hide();
    $("#victorySplash").fadeIn();

};

TriviaGame.prototype.DoCountdown = function(callback) {
    var self = this;
    $('.answers-container').hide();
    
    //Count down at the beggining of the game begins
    var outcount = 5;
    $('#welcome').html("The Game Starts In... " + outcount);
    $('#question').html("Get Ready!");
    var ttimer = setInterval(function() {
        if (outcount !== 1)
        {
            outcount--;
            $('#welcome').html("The Game Starts In... " + outcount);
        }
        else {
            clearInterval(ttimer);
            callback();
        }
    }, 1000);
};

TriviaGame.prototype.CheckAnswer = function(ans) {
    if (ans === this.triviaQuestions[this.nextQuestion - 1].rightAnswer)
    {
        this.AdjustScore(1);
    }
    else {
        this.AdjustScore(-1);
    }
};

TriviaGame.prototype.AdjustScore = function(minplus) {
    var self = this;
    if (self.score + minplus <= -5)
    {
        self.Lose();
    }
    else if (self.score + minplus >= 5)
    {
        self.Win();
    }
    else {
        self.score = self.score + minplus;
        self.UpdateScoreboard();
        self.SelectQuestion();
        self.StartProgressBar("1");
    }
};

TriviaGame.prototype.StartProgressBar = function() {
    var self = this;
    self.progressbar.set(0);
    self.progressbar.animate(1, {duration:10000},
                        function(){
                            // TO-DO: fix this so it stops running when game ends
                            self.progressbar.set(0);
                            self.CheckAnswer("[]76/'.;.'2.1';.21';4.3'2./4';1.241'/.4';2.");
                        });
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