import http from 'node:http'

const server = http.createServer((req, res) => {
    res.end("hello world !")
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Adresse server : http://localhost:${PORT}`);
})