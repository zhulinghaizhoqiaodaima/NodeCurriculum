import { createReadStream, createWriteStream } from "fs";

const readStream = createReadStream('./test.txt')
const writeStream = createWriteStream('./write.txt')

readStream.pipe(writeStream)