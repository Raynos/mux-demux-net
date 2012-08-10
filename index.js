var MuxDemux = require("mux-demux")
    , net = require("net")

module.exports = MuxDemuxServer

function MuxDemuxServer(handler, port) {
    if (typeof handler !== "function") {
        port = handler

        var connection = net.connect(port)
            , mdm = MuxDemux({
                error: false
            })

        connection.pipe(mdm).pipe(connection)

        mdm.on("error", bubbleError)

        mdm.destroy = closeConnection

        return mdm
    }
    
    var server = net.createServer(openMuxDemux)
    return server.listen(port)

    function bubbleError(error) {
        connection.emit("error", error)
    }

    function closeConnection() {
        connection.on("close", bubbleClose)
        connection.destroy()
    }

    function bubbleClose(hadError) {
        mdm.emit("close", hadError)
    }

    function openMuxDemux(stream) {
        var mdm = MuxDemux({
            error: false
        })

        stream.pipe(mdm).pipe(stream)

        mdm.on("connection", handler)

        mdm.on("error", reemit)

        function reemit(error) {
            stream.emit("error", error)
        }
    }
}