<?PHP

include 'db.php';

$link = mysqli_connect($mysql_servername, $mysql_username, $mysql_password,$mysql_db);
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql1 = "SELECT * FROM questions ORDER BY idQuestion DESC";
$sql2 = mysqli_query($link,$sql1);
$all = "";

$topic = "topic";
$quest = "question";
$ans1 = "answer1";
$ans2 = "answer2";
$ans3 = "answer3";
$rightans = "rightanswer";

while ($rows3 = mysqli_fetch_assoc($sql2)) {
    $all .= $rows3[$topic] . '^' . $rows3[$quest] . '^' . $rows3[$ans1] . '^' . $rows3[$ans2] . '^' . $rows3[$ans3] . '^' . $rows3[$rightans] . '|';
}
echo $all;
mysqli_free_result($sql2);
mysqli_close($link);
?>