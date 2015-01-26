<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    {% include "./social.html" %}
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href='//fonts.googleapis.com/css?family=Paytone+One|Black+Ops+One' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/public/dist/css/site.css"/>
    <script src="/public/dist/js/head.js"></script>
</head>
<body>
    <div class="site-wrapper" id="main">
        
    </div>
    {% if serverVars %}
    <script>
        window.__SERVER_VARS__ = {};
        window.__SERVER_VARS__.imgur = {%autoescape false%}{{imgur|json_encode}}{%endautoescape%};
    </script>
    {% endif %}
    <script src="/public/dist/js/bundle.js"></script>

</body>
</html>