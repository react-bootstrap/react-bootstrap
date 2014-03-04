({
    "baseUrl": "../react-bootstrap-bower",
    "paths": {
        "react-bootstrap": "../tools/bower/index",
        "react": "../tools/vendor/react-0.9.0"
    },
    "include": ["../tools/vendor/almond", "react-bootstrap"],
    "exclude": ["react"],
    "out": "../react-bootstrap-bower/react-bootstrap.js",
    "wrap": {
        "startFile": "wrap.start",
        "endFile": "wrap.end"
    },
    "optimize": "none",
    "generateSourceMaps": true
})