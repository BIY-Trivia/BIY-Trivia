$(document).ready(function() {
    var rightanss = "";

    $("#ans-1").click(function(){
        $("#ans-1").animate({backgroundColor:'#0080FF'},"slow");
        $("#ans-2").animate({backgroundColor:'black'},"slow");
        $("#ans-3").animate({backgroundColor:'black'},"slow");
        rightanss = $("#ans1").val();
    });
    $("#ans-2").click(function(){
        $("#ans-1").animate({backgroundColor:'black'},"slow");
        $("#ans-2").animate({backgroundColor:'#0080FF'},"slow");
        $("#ans-3").animate({backgroundColor:'black'},"slow");
        rightanss = $("#ans2").val();
    });
    $("#ans-3").click(function(){
        $("#ans-1").animate({backgroundColor:'black'},"slow");
        $("#ans-2").animate({backgroundColor:'black'},"slow");
        $("#ans-3").animate({backgroundColor:'#0080FF'},"slow");
        rightanss = $("#ans3").val();
    });
    $("#submit").click(function(){
        if($("#quest").val() == "" || $("#ans1").val() == "" || $("#ans2").val() == "" || $("#ans3").val() == "" || $("#topic").val() == "" || rightanss == "")
        {
            $("#jumbotron").animate({backgroundColor:'#FF9E3D'},"slow");
            $("#welcome").html("Please fill all the required elements");
        }
        else
        {
            $("#jumbotron").animate({backgroundColor:'#3D9EFF'},"slow");
            $("#welcome").html("Your request is being processed");
            var parametros={
                "topicc":$("#topic").val(),
                "questt":$("#quest").val(),
                "anss1":$("#ans1").val(),
                "anss2":$("#ans2").val(),
                "anss3":$("#ans3").val(),
                "rightanss":rightanss
                };
            $.ajax({
                data: parametros,
                url: "php/send.php",
                type: "post",
                success:function(response){
                    if(response.trim().split("♣")[1] == "0"){
                        $("#jumbotron").animate({backgroundColor:'#EF5350'},"slow");
                        $("#welcome").html("Sorry, there was an error connecting with the server");
                    }
                    else if(response.trim().split("♣")[1] == "1"){
                        $("#jumbotron").animate({backgroundColor:'lightgreen'},"slow");
                        $("#welcome").html("Now your question is saved, thank you");
                    }
                $("#topic").val("");
                $("#quest").val("");
                $("#ans1").val("");
                $("#ans2").val("");
                $("#ans3").val("");
                $("#ans-1").animate({backgroundColor:'white'},"slow");
                $("#ans-2").animate({backgroundColor:'white'},"slow");
                $("#ans-3").animate({backgroundColor:'white'},"slow");
                rightanss = "";
                }
            });
        }
    });
});