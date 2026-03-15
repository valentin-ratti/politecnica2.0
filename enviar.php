<?php

session_start();

/* ---------------- CONFIGURACION ---------------- */

$destino = "det_manuelbelgrano_de4@bue.edu.ar";
$asunto = "Nuevo mensaje desde la web";

$tiempo_limite = 60; // segundos entre envios
$tiempo_minimo = 5;  // segundos minimos de llenado

$secret = "6LcBEoMsAAAAAJiKdbA28UW5hCJz-VMAc9LVb1s2";

/* ---------------- LIMITE ENTRE ENVIOS ---------------- */

if(isset($_SESSION['ultimo_envio'])){

    $tiempo_transcurrido = time() - $_SESSION['ultimo_envio'];

    if($tiempo_transcurrido < $tiempo_limite){
        die("Por favor espera un minuto antes de enviar otro mensaje.");
    }
}

/* ---------------- TIEMPO MINIMO FORM ---------------- */

if(isset($_POST['form_time'])){

    $tiempo_form = intval($_POST['form_time']);
    $tiempo_actual = time();

    if(($tiempo_actual - $tiempo_form) < $tiempo_minimo){
        die("Envio demasiado rapido. Posible bot.");
    }
}

/* ---------------- HONEYPOT ANTI BOT ---------------- */

if(!empty($_POST['website'])){
    die("Bot detectado.");
}

/* ---------------- VALIDAR DATOS ---------------- */

$nombre = trim($_POST['nombre'] ?? '');
$email = trim($_POST['email'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');

if(empty($nombre) || empty($email) || empty($mensaje)){
    die("Error: todos los campos son obligatorios.");
}

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    die("Email no valido.");
}

/* ---------------- VERIFICAR RECAPTCHA ---------------- */

$response = $_POST['g-recaptcha-response'] ?? '';

if(empty($response)){
    die("Error: captcha no completado.");
}

$url = "https://www.google.com/recaptcha/api/siteverify";

$data = [
    'secret' => $secret,
    'response' => $response
];

$options = [
    CURLOPT_URL => $url,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($data),
    CURLOPT_RETURNTRANSFER => true
];

$ch = curl_init();
curl_setopt_array($ch, $options);
$verify = curl_exec($ch);
curl_close($ch);

$captcha = json_decode($verify);

if(!$captcha || !$captcha->success){
    die("Error: captcha no verificado.");
}

/* ---------------- PREPARAR MENSAJE ---------------- */

$nombre = strip_tags($nombre);
$email = strip_tags($email);
$mensaje = strip_tags($mensaje);

$contenido = "Nuevo mensaje desde la web\n\n";
$contenido .= "Nombre: $nombre\n";
$contenido .= "Email: $email\n\n";
$contenido .= "Mensaje:\n$mensaje\n";

$headers = "From: noreply@politecnicamanuelbelgrano.edu.ar\r\n";
$headers .= "Reply-To: $email\r\n";

/* ---------------- ENVIAR EMAIL ---------------- */

$enviado = mail($destino, $asunto, $contenido, $headers);

if($enviado){

    $_SESSION['ultimo_envio'] = time();

    header("Location: index.html?mensaje=enviado");
    exit;

}else{

    die("Error al enviar el mensaje. Intente nuevamente.");

}

?>