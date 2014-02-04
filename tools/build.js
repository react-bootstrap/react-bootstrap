({
    "baseUrl": "../tools",
    "paths": {
        "react-bootstrap": "../amd",
        "../amd/transpiled/react-es6": "./react-es6",
        "../amd/transpiled/react-es6/lib": "../amd/transpiled/react-es6/lib"
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