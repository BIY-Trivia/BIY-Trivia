var TriviaDataServiceHardcoded = function() {};

//questionType, question, answers, rightAnswer
TriviaDataServiceHardcoded.prototype.GetQuestions = function(){
    return [new TriviaQuestion("Animals", "How many legs does a spider have?", ["3", "8", "6"], "8"),
            new TriviaQuestion("Miscellaneous", "What does BIY stand for?", ["Build-It-Yourself", "Bounce in yoga", "Blue Indigo Yellow"], "Build-It-Yourself"),
            new TriviaQuestion("Music", "What does the fox say?", ["Ring-ding-ding-ding-dingeringeding!", "woof woof woof woof", "squeak squeak squeak"], "Ring-ding-ding-ding-dingeringeding!"),
            new TriviaQuestion("Science", "Who discovered Newton's Laws?", ["Leonardo Da Vinci", "Leonhard Euler", "Isaac Newton"], "Isaac Newton"),
            new TriviaQuestion("Movies", "Who was Remy?", ["The rich guy who never loved", "A young man who wanted a brother", "A rat who wanted to cook"], "A rat who wanted to cook"),
            new TriviaQuestion("Miscellaneous", "What is a Ferrari?", ["A bird", "A plane", "A car"], "A car"),
            new TriviaQuestion("Movies", "Who is known as &quot;The First Avenger&quot;", ["Captain America", "The Hulk", "Superman"], "Captain America"),
            new TriviaQuestion("Animals", "Which of the following is a marsupial?", ["Tarantula", "Koala", "Gorilla"], "Koala"),
            new TriviaQuestion("Music", "Which of the following was NOT a Beatle?", ["George Harrison", "John Lennon", "Paul Simon"], "Paul Simon"),
            new TriviaQuestion("Science", "Who first developed a polio vaccine", ["Jonas Salk", "Marie Curie", "Al Gore"], "Jonas Salk")];
};
