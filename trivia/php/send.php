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
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql4 = "INSERT INTO questions(question, topic, answer1, answer2, answer3, rightanswer) VALUES ('" . $quest . "','" . $topic . "','" . $ans1 . "','" . $ans2 . "','" . $ans3 . "','" . $rightanswer . "')";

$qu2 = mysqli_query($link, $sql4);

if (!$qu2) {
    die("No se envia el forulario: " . mysqli_error());
}

mysqli_close($link);
?>