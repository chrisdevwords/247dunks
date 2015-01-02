<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Twenty-Four-Seven Dunks!</title>
    <meta name="description" content="All dunks, all the time. You're welcome.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    
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