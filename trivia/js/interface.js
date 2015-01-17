$(document).ready(function() {
    var arrType = [" "];
    var arrQuest = [" "];
    var arrAns1 = [" "];
    var arrAns2 = [" "];
    var arrAns3 = [" "];
    var arrRightAns = [" "];
    var x = 0;
    var questlength = 0;

    var numberTaken = 0;
    var lastSelected = 0;

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
                for(x = 0; x < res.length-1; x++)
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
    function scoreac(minplus){
        score = score + minplus;
    }
$("#pgrbar-lbl").hide();

    var timer = setInterval(function(){timer1()},100);
    var score1 = setInterval(function(){score2()},100);

    $("#easy").click(function(){
        
    });
    $("#timed").click(function(){
        var quest = 0;
        var outcount = 5;
        $("#welcome").html("The game starts in "+outcount);
        var ttimer = setInterval(function(){wel()},1000);
        function wel(){
            if(outcount != 0)
            {
                outcount--;
                $("#welcome").html("The game starts in "+outcount);
            }
            else{
                clearInterval(ttimer);
                startpgr();
                selectquest();
                anss();
            }
        }
            $("#ans-1").click(function(){
                if($("#ans-1").val() == arrRightAns[quest])
                {
                    jumbotron.animate({backgroundColor:'lightgreen'},"fast");
                    jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                    scoreac(1);
                    startpgr();
                    selectquest();
                }
                else{
                    jumbotron.animate({backgroundColor:'#FF3D3D'},"fast");
                    jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                    scoreac(-1);
                    startpgr();
                    selectquest();
                }
            });
            $("#ans-2").click(function(){
                if($("#ans-2").val() == arrRightAns[quest])
                {
                    jumbotron.animate({backgroundColor:'lightgreen'},"fast");
                    jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                    scoreac(1);
                    startpgr();
                    selectquest();
                }
                else{
                    jumbotron.animate({backgroundColor:'#FF3D3D'},"fast");
                    jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                    scoreac(-1);
                    startpgr();
                    selectquest();
                }
            });
            $("#ans-3").click(function(){
                if($("#ans-3").val() == arrRightAns[quest])
                {
                    jumbotron.animate({backgroundColor:'lightgreen'},"fast");
                    jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                    scoreac(1);
                    startpgr();
                    selectquest();
                }
                else{
                    jumbotron.animate({backgroundColor:'#FF3D3D'},"fast");
                    jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                    scoreac(-1);
                    startpgr();
                    selectquest();
                }
            });
        function startpgr()
        {
            var pgr = 0;
            var timin = 0;
            nowtime = time;
            limit = nowtime+10;
            $("#pgrbar-lbl").fadeIn();
            $("#pgrbar1").css("width",pgr+"%");
            $("#pgrbar2").css("width",pgr+"%");
            var ttimer1 = setInterval(function(){wel()},100);
            function wel(){
                if(limit >= time){
                    if(((10-(limit-time))*10) < 60){
                        $("#pgrbar1").css("width",((10-(limit-time))*10)+"%");
                    }
                    else{
                        $("#pgrbar2").css("width",(((10-(limit-time))*10)-56)+"%");
                    }
                }
                else{
                    clearInterval(ttimer1);
                    $("#pgrbar1").css("width","0%");
                    $("#pgrbar2").css("width","0%");
                    jumbotron.animate({backgroundColor:'#FF3D3D'},"fast");
                    jumbotron.animate({backgroundColor:'#E0E0E0'},"fast");
                    scoreac(-1);
                    startpgr();
                    selectquest();
                }
            }
        }

    function selectquest(){
            numberTaken = (Math.floor((Math.random() * questlength) + 1));
            if(numberTaken == 0 || numberTaken == lastSelected)
            {
                tryRandom();
            }
            else{
            quest = numberTaken;
            $("#welcome").html("Topic - "+arrType[quest]);
            $("#question").html(arrQuest[quest]);
            $("#ans-1").val(arrAns1[quest]);
            $("#ans-2").val(arrAns2[quest]);
            $("#ans-3").val(arrAns3[quest]);
            lastSelected = numberTaken;
            }
        }

    function tryRandom(){
            numberTaken = (Math.floor((Math.random() * questlength) + 1));
            if(numberTaken == 0 || numberTaken == lastSelected)
            {
                selectquest();
            }
            else{
            quest = numberTaken;
            $("#welcome").html("Topic - "+arrType[quest]);
            $("#question").html(arrQuest[quest]);
            $("#ans-1").val(arrAns1[quest]);
            $("#ans-2").val(arrAns2[quest]);
            $("#ans-3").val(arrAns3[quest]);
            lastSelected = numberTaken;
            }
        }

    });
});