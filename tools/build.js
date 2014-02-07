({
    "baseUrl": "../tools",
    "paths": {
        "react-bootstrap": "../amd"
    },
    "include": ["./almond", "react-bootstrap"],
    "exclude": ["react"],
    "out": "../dist/react-bootstrap.js",
    "wrap": {
        "startFile": "wrap.start",
        "endFile": "wrap.end"
    },
    "optimize": "none",
    "generateSourceMaps": true
})