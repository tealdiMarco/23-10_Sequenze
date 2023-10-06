<?php

    $host = "127.0.0.1";
    $user = "root";
    $password = null;
    $db = "semipuzzle";

    $conn = new mysqli($host, $user, $password, $db);

    if ($conn == false) {
        die ("Errore nella Connessione al DB: " . $conn->connect_error);
    }
    
    $query = "SELECT * FROM sequenze";

    if($result = $conn->query($query)){
        $data = [];
        if($result->num_rows > 0){
            while($row = $result->fetch_array()){
                $temporanea;
                $temporanea['codSeq'] = $row['codSeq'];
                $temporanea['tema'] = $row['tema'];
                $temporanea['img1'] = $row['img1'];
                $temporanea['img2'] = $row['img2'];
                $temporanea['img3'] = $row['img3'];

                array_push($data,$temporanea);
            }
            echo json_encode($data);
        }
        else{
            echo json_encode($data);
        }
    }
    else{
        echo("ERRORE NELL' ESECUZIONE DELLA QUERY $query : ". $conn->error);
    }

    $conn-> close()


?>