import http from "node:http";
const origEmit = http.Server.prototype.emit;
http.Server.prototype.emit = function (ev, req, ...rest) {
  if ((ev === "request" || ev === "upgrade") && req && req.headers && typeof req.headers.host === "string" && req.headers.host.includes(".local")) {
    const m = req.headers.host.match(/:(\d+)$/);
    req.headers.host = "localhost" + (m ? ":" + m[1] : "");
  }
  return origEmit.call(this, ev, req, ...rest);
};
