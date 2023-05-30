<?php 
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: access");
 header("Access-Control-Allow-Methods: GET,POST");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
 header('Content-Type: application/json'); 

 $query = $_GET['query']; 

    /*TODAS LAS CATEGORÍAS*/
    if ($query == 1){

        include ("connectDB.php"); 

        $sql="SELECT * FROM categoria";
        $sentencia=$conn->prepare($sql);
        $sentencia->execute();
        $resultado=$sentencia->fetchAll(); 

        include("disconnectDB.php");

        header("Content-Type: application/json");
        echo json_encode($resultado);
    }

    /*PRODUCTOS FAVORITOS*/
    if ($query == 2){

        include ("connectDB.php"); 

        $sql="SELECT * FROM producto
        WHERE favorito=true";
        $sentencia=$conn->prepare($sql);
        $sentencia->execute();
        $resultado=$sentencia->fetchAll(); 

        include("disconnectDB.php");

        header("Content-Type: application/json");
        echo json_encode($resultado);
    }  

    /*PRODUCTOS DE CATEGORÍA DADA*/
    if ($query == 3){

        if(isset($_GET['categoria'])){

            $categoria = $_GET['categoria'];

            include ("connectDB.php");

            $sql="SELECT producto.codigo, nombre_proveedor, nombre, descripción, precio, stock_actual FROM producto
            INNER JOIN corresponde ON producto.codigo = corresponde.codigo_producto
            WHERE corresponde.nombre_categoria = :categoria";
            $sentencia=$conn->prepare($sql);
            $sentencia->bindParam(':categoria', $categoria);
            $sentencia->execute();
            $resultado=$sentencia->fetchAll(); 

            include("disconnectDB.php");

            header("Content-Type: application/json");
            echo json_encode($resultado);

        }
        
    }

    /*TODOS LOS PRODUCTOS*/
    if ($query == 4){

        include ("connectDB.php"); 

        $sql="SELECT * FROM producto
        ORDER BY nombre ASC";
        $sentencia=$conn->prepare($sql);
        $sentencia->execute();
        $resultado=$sentencia->fetchAll(); 

        include("disconnectDB.php");

        header("Content-Type: application/json");
        echo json_encode($resultado);
    }

    /*TODOS LOS PROVEEDORES*/
    if ($query == 5){

        include ("connectDB.php"); 

        $sql="SELECT * FROM proveedor";
        $sentencia=$conn->prepare($sql);
        $sentencia->execute();
        $resultado=$sentencia->fetchAll(); 

        include("disconnectDB.php");

        header("Content-Type: application/json");
        echo json_encode($resultado);
    }

    /*ACTUALIZAR <STOCK>*/
    if($query == 6){

        $nuevoStock = $_GET['nuevoStock'];
        $codigo = $_GET['codigo'];

        include ("connectDB.php");

        $sql = "UPDATE producto
            SET stock_actual = :newStock
            WHERE codigo = :codigo";

        $sentencia = $conn->prepare($sql);
        $sentencia->bindValue(':codigo', $codigo);
        $sentencia->bindValue(':newStock', $nuevoStock);
        $sentencia->execute();

        $rowCount = $sentencia->rowCount(); // Obtener el número de filas afectadas por la consulta

        include("disconnectDB.php");

        $response = ($rowCount > 0) ? true : false; // Verificar si se actualizó al menos una fila

        echo json_encode($response);
    
    }    
    
?>