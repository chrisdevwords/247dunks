<!DOCTYPE html>
<html>
<head>
    <!-- build:css /public/dist/css/site.css -->
    <link href="/public/bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <link href="/public/bower_components/bootstrap/dist/css/bootstrap-theme.css" rel="stylesheet">
    <link href="/public/build/css/main.css" rel="stylesheet">
    <!-- endbuild -->
    <!-- build:js /public/dist/js/head.js -->
    <script type="text/javascript" src="/public/bower_components/modernizr/modernizr.js"></script>
    <!-- endbuild -->
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
    <!-- build:js /public/dist/js/bundle.js -->
    <script type="text/javascript" src="/public/bower_components/popcornjs/popcorn.js"></script>
    <script type="text/javascript" src="/public/build/js/build.js"></script>
    <script type="text/javascript" src="/public/bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <!-- endbuild -->

</body>
</html>