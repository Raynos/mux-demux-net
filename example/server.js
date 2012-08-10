var MuxDemux = require("..")

MuxDemux(function (stream) {
    stream.on("data", console.log.bind(console, "[SERVER]"))
    stream.write("server")
}, 8642)