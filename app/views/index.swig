<!DOCTYPE html>
<html>
<head>
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