<?PHP

include 'db.php';

$quest = $_POST["questt"];
$topic = $_POST["topicc"];
$ans1 = $_POST["anss1"];
$ans2 = $_POST["anss2"];
$ans3 = $_POST["anss3"];
$rightanswer = $_POST["rightanss"];
$link = mysqli_connect($mysql_servername, $mysql_username, $mysql_password,$mysql_db);
if (mysqli_connect_errno())
  {
  echo "♣0♣";
  }
else
{
	$stmt = mysqli_prepare($link,"INSERT INTO questions(question, topic, answer1, answer2, answer3, rightanswer) VALUES (?,?,?,?,?,?)");
	mysqli_stmt_bind_param($stmt, 'ssssss', $quest, $topic, $ans1, $ans2, $ans3, $rightanswer);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	echo "♣1♣";
}


mysqli_close($link);
?>