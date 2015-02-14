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