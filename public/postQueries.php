<?php

header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: access");
 header("Access-Control-Allow-Methods: GET,POST");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
 header('Content-Type: application/json');

 function validarRut($rut)  {
      $rut = preg_replace('/[^k0-9]/i', '', $rut); // Eliminar todos los caracteres excepto k y números
      $dv  = substr($rut, -1); // Obtener el dígito verificador
      $numero = substr($rut, 0, strlen($rut) - 1); // Obtener el número del rut

      $suma = 0;
      $factor = 2;
      for ($i = strlen($numero) - 1; $i >= 0; $i--) {
          $suma += $factor * $numero[$i];
          $factor = ($factor + 1) % 8 ?: 2;
      }

      $dvEsperado = 11 - ($suma % 11);
      if ($dvEsperado == 11) {
          $dvEsperado = '0';
      } elseif ($dvEsperado == 10) {
          $dvEsperado = 'k';
      }

      return strtoupper($dv) === strtoupper($dvEsperado);
}

function formatearRut($rut)
{
    $rut = preg_replace('/[^k0-9]/i', '', $rut); // Eliminar todos los caracteres excepto k y números
    $rut = substr($rut, 0, -1) . '-' . substr($rut, -1); // Agregar guión entre el número y el dígito verificador
    return $rut;
}



 $query = $_POST['query'];

 if ($query==1){

    $usuario = $_POST['usuario'];    
    $pass = $_POST['pass']; 
    
    if(validarRut($usuario)){

      $usuario = formatearRut($usuario);

      include ("connectDB.php"); 

      $sql="SELECT 
      EXISTS(SELECT 1 FROM usuario WHERE rut = :usuario AND contraseña = :pass) AS existe_usuario,
      CASE 
        WHEN EXISTS(SELECT 1 FROM usuario WHERE rut = :usuario AND contraseña = :pass)
        THEN (SELECT nombre FROM usuario WHERE rut = :usuario AND contraseña = :pass)
        ELSE NULL
      END AS nombre_usuario,
      CASE 
        WHEN EXISTS(SELECT 1 FROM usuario WHERE rut = :usuario AND contraseña = :pass)
        THEN :usuario
        ELSE NULL
      END AS rut_usuario";
      $sentencia=$conn->prepare($sql);
      $sentencia->bindParam(':usuario', $usuario);
      $sentencia->bindParam(':pass', $pass);                
      $sentencia->execute();
      $resultado=$sentencia->fetchAll();

      include("disconnectDB.php");

      header("Content-Type: application/json");
      echo json_encode($resultado);

    } else {
      $response = [
        [
          "existe_usuario" => false,"0" => false,"nombre_usuario" => null,"1" => null,"rut_usuario" => null,"2" => null
        ]
      ];
      echo json_encode($response);
    }
 }

 if ($query == 2) {
  $usuario = $_POST['rut'];
  $newPass = $_POST['newPass'];

  if (validarRut($usuario)){

    $usuario = formatearRut($usuario);

    include("connectDB.php");

    $sql = "UPDATE usuario
            SET contraseña = :newPass
            WHERE rut = :rut";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':rut', $usuario);
    $sentencia->bindValue(':newPass', $newPass);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount(); // Obtener el número de filas afectadas por la consulta

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false; // Verificar si se actualizó al menos una fila

    echo json_encode($response);
  } else {
    echo json_encode(false);
  }

  
}

if ($query == 3){
  
  include ("connectDB.php"); 

  $sql="SELECT rut, nombre
  FROM usuario";
  $sentencia=$conn->prepare($sql);
  $sentencia->execute();
  $resultado=$sentencia->fetchAll(); 

  include("disconnectDB.php");

  header("Content-Type: application/json");
  echo json_encode($resultado);

}

if ($query == 4){

  $usuario = $_POST['user'];

  include ("connectDB.php"); 

  $sql="DELETE FROM usuario
  WHERE rut = :usuario";
  $sentencia=$conn->prepare($sql);
  $sentencia->bindParam(':usuario', $usuario);
  $sentencia->execute();

  $rowCount = $sentencia->rowCount(); // Obtener el número de filas afectadas por la consulta

  include("disconnectDB.php");

  $response = ($rowCount > 0) ? true : false; // Verificar si se actualizó al menos una fila

  echo json_encode($response);

}

if ($query == 5){

  $userRut = $_POST['userRut'];
  $userName = $_POST['userName'];

  if(validarRut($userRut)){
    
    $userRut=formatearRut($userRut);

    include ("connectDB.php"); 

    $sql="INSERT INTO usuario (rut, nombre, contraseña)
    VALUES (:userRut, :userName, :userRut)";
    $sentencia=$conn->prepare($sql);
    $sentencia->bindParam(':userRut', $userRut);
    $sentencia->bindParam(':userName', $userName); 
    $sentencia->execute();

    $rowCount = $sentencia->rowCount(); // Obtener el número de filas afectadas por la consulta

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false; // Verificar si se actualizó al menos una fila

    echo json_encode($response);
    
  } else {
    echo json_encode(false);
  }

  

}

?>