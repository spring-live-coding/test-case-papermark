import http from "node:http";
import next from "next";

const port = Number(process.env.PORT || 58244);
const app = next({ dev: true, hostname: "localhost", port, dir: process.cwd() });
const handle = app.getRequestHandler();
await app.prepare();
const TOKEN = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..5s0S1JAqlTx24Dao.laA25l5OqenprC6F_KcZxJQoNEPLO0Cw0Rm9dZiTwavfE_NODv0q36w3o3exOVFLgOcKRvbHEVb1C4f1itO9ZKGunHkAJMKg7L2mTvwZwxdhnLB8LV301xKx69ljv_IJLSxww2_a17gE1v6ox60OMutCz5guotYgwH-uJosFMBuLeZFjEqaj7ipELB_8e7SIMCTLzl8jqRhWgKY-vOBLXbvK8X55jFf9D-chCWzWQj9W6mF8PJYeqjU6ahqGccs_F_t6FN_y1aaU2c3RJfSj-ZRzVVJGMCTxzm9sb_4DoP5qzTuM-M9-V_-5e7scIiBBeshvRblDKg.AkB-4OVKx1lifE-yBij3QA";
const fixHost = (req) => {
  req.headers.host = `localhost:${port}`;
  const c = req.headers.cookie || "";
  if (!c.includes("next-auth.session-token")) req.headers.cookie = (c ? c + "; " : "") + "next-auth.session-token=" + TOKEN;
};
const server = http.createServer((req, res) => {
  fixHost(req);
  if (req.headers.accept && req.headers.accept.includes("text/html") && !(req.headers.cookie||"").includes("sidebar:state")) res.setHeader("Set-Cookie", "sidebar:state=false; Path=/");
  handle(req, res);
});
const upgrade = app.getUpgradeHandler();
server.on("upgrade", (req, socket, head) => {
  fixHost(req);
  upgrade(req, socket, head);
});
server.listen(port, "127.0.0.1", () => console.log(`ready on ${port}`));
