var MuxDemux = require("..")
    , mdm = MuxDemux(8642)

var stream = mdm.createStream("winning")
stream.on("data", console.log.bind(console, "[CLIENT]"))
stream.write("client")