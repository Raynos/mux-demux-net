# mux-demux-net

Generate TCP servers that serve MDM streams.

Because opening net servers and piping is too much work!

## Example Client

``` js
var MuxDemux = require("mux-demux-net")
    , mdm = MuxDemux(8642)

var stream = mdm.createStream("winning")
stream.on("data", console.log.bind(console, "[CLIENT]"))
stream.write("client")
```

## Example server

``` js
var MuxDemux = require("..")

MuxDemux(function (stream) {
    stream.on("data", console.log.bind(console, "[SERVER]"))
    stream.write("server")
}, 8642)
```

## Installation

`npm install mux-demux-net`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/mux-demux-net.png
  [2]: http://travis-ci.org/Raynos/mux-demux-net