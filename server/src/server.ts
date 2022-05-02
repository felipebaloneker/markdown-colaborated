import { serverHttp } from "./http";
import "./websocket"
const Port = 4000

serverHttp.listen(Port, ()=> console.log(`Server is running on port ${Port}`))