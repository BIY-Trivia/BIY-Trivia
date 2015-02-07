<?PHP

include 'db.php';

$quest = $_POST["questt"];
$topic = $_POST["topicc"];
$ans1 = $_POST["anss1"];
$ans2 = $_POST["anss2"];
$ans3 = $_POST["anss3"];
$rightanswer = $_POST["rightanss"];
$link = mysql_connect($mysql_servername, $mysql_username, $mysql_password);
if (!$link) {
    die("No se puede conectar: " . mysql_error());
}

$db = mysql_select_db("clhtecno_trivia", $link);
if (!$db) {
    die("No se puede conectar a db: " . mysql_error());
}

$sql4 = mysql_query("INSERT INTO questions(question, topic, answer1, answer2, answer3, rightanswer) VALUES ('" . $quest . "','" . $topic . "','" . $ans1 . "','" . $ans2 . "','" . $ans3 . "','" . $rightanswer . "')");

$qu2 = mysql_query($sql4, $link);

if (!$qu2) {
    die("No se envia el forulario: " . mysql_error());
}

mysql_close($link);
?>