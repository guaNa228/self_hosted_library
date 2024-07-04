<?php
function get_books()
{
    $curl = curl_init("http://localhost:3000");

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPGET, true);

    $response = curl_exec($curl);

    $data = "";

    if ($response === false) {
        $error = curl_error($curl);
        echo "cURL Error: $error";
    } else {
        $data = json_decode($response, true);
    }

    curl_close($curl);
    return $data;
}

function get_authors()
{
    $curl = curl_init("http://localhost:3000/authors");

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPGET, true);

    $response = curl_exec($curl);

    $data = "";

    if ($response === false) {
        $error = curl_error($curl);
        echo "cURL Error: $error";
    } else {
        $data = json_decode($response, true);
    }

    curl_close($curl);
    return $data;
}

function get_book($id)
{
    $curl = curl_init("http://localhost:3000/" . $id);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPGET, true);

    $response = curl_exec($curl);

    $data = "";

    if ($response === false) {
        $error = curl_error($curl);
        echo "cURL Error: $error";
    } else {
        $data = json_decode($response, true);
    }

    curl_close($curl);
    return $data;
}

function get_by_isbn($isbn)
{
    $curl = curl_init("http://localhost:3000/isbn/" . $isbn);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPGET, true);

    $response = curl_exec($curl);

    $data = "";

    if ($response === false) {
        $error = curl_error($curl);
        echo "cURL Error: $error";
    } else {
        $data = json_decode($response, true);
    }

    curl_close($curl);
    return $data;
}

function delete_fetching($id)
{
    $deleteUrl = "http://localhost:3000/" . $id;

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $deleteUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    print_r($response);

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    return $httpCode == 200;
}

function update_book($id, $name, $author, $image_url, $rating, $comment)
{
    $postData = [
        'name' => $name,
        'author' => $author,
        'image_url' => $image_url,
        'rating' => $rating,
        'comment' => $comment,
    ];

    $ch = curl_init("http://localhost:3000/" . $id);
    $jsonData = json_encode($postData);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($jsonData),
    ]);

    $response = curl_exec($ch); // Execute the request

    if (curl_errno($ch)) {
        // If there was an error, throw an exception
        throw new Exception(curl_error($ch));
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Check if the status code indicates a successful update
    // Adjust the status code according to your API's specification
    return in_array($httpCode, [200, 204]);
}

function add_book($name, $author, $image_url)
{
    $postData = [
        'name' => $name,
        'author' => $author,
        'image_url' => $image_url,
    ];

    $ch = curl_init("http://localhost:3000/");

    $jsonData = json_encode($postData);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($jsonData)
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        throw new Exception(curl_error($ch));
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    return $httpCode == 201;
}