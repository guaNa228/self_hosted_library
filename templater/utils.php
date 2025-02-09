<?php
date_default_timezone_set('Europe/Moscow');

function get_output($fn)
{
    $args = func_get_args();
    unset($args[0]);
    ob_start();
    call_user_func_array($fn, $args);
    $output = ob_get_contents();
    ob_end_clean();
    return $output;
}
function display($template, $params = array())
{
    extract($params);
    include $template;
}

function render($template, $params = array())
{
    return get_output('display', $template, $params);
}