var TriviaDataService = function() {}

TriviaDataService.prototype.GetQuestions = function(){
    var questions = [];
    $.ajax({
        url: "php/quest.php",
        type: "post",
        success: function(response) {
            var res = response.trim().split("|");
            //questlength = res.length - 1;
            for (var x = 0; x < res.length - 1; x++)
            {
                var res1 = res[x].split("^");
                questions.push(new TriviaQuestion(res1[0],
                        res1[1],
                        [res1[2], res1[3], res1[4]],
                        res1[5]));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            throw "Trivia Game Unavailable"
        }
    });
    return questions;
};