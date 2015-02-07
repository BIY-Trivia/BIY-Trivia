<?PHP

include 'db.php';

$link = mysql_connect($mysql_servername, $mysql_username, $mysql_password);
if (!$link) {
    die("No se puede conectar: " . mysql_error());
}

$db = mysql_select_db("clhtecno_trivia", $link);
if (!$db) {
    die("No se puede conectar a db: " . mysql_error());
}

$sql3 = mysql_query("SELECT * FROM questions ORDER BY idQuestion DESC");
$all = "";

$topic = "topic";
$quest = "question";
$ans1 = "answer1";
$ans2 = "answer2";
$ans3 = "answer3";
$rightans = "rightanswer";

while ($rows3 = mysql_fetch_assoc($sql3)) {
    $all .= $rows3[$topic] . '^' . $rows3[$quest] . '^' . $rows3[$ans1] . '^' . $rows3[$ans2] . '^' . $rows3[$ans3] . '^' . $rows3[$rightans] . '|';
}
echo $all;

mysql_close($link);
?>