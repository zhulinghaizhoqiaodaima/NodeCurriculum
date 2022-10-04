import { createWriteStream } from "fs";

const ws = createWriteStream('./write.txt','utf-8')
ws.write('333333333333')
ws.write('444444444444')
ws.write('555555555555')
ws.write('666666666666')
ws.end()