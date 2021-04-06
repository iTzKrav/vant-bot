const http = require("http");
const { execSync } = require("child_process");

const isThisGlitch = (
    process.env.PROJECT_DOMAIN !== undefined &&
    process.env.PROJECT_INVITE_TOKEN !== undefined &&
    process.env.API_SERVER_EXTERNAL !== undefined &&
    process.env.PROJECT_REMIX_CHAIN !== undefined);

if (isThisGlitch) {
    http.createServer((req, res) => {
        const now = new Date().toLocaleString("es-MX");
        res.end(`OK (200) - ${now}`);
    }).listen(process.env.PORT);

    setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
}

start(isThisGlitch);

function start(glitch = false) {
    if (glitch) {
        console.info("[INFO] Entorno de falla detectado, intentando compilar ...");
        execSync("npm run compile");
        console.info("[INFO] Iniciando el bot...");
        if (process.env.CONFIG_CACHE_YOUTUBE_DOWNLOADS === "yes") console.warn("[WARN] No se recomienda el uso de caché en el entorno Glitch, consumirá drásticamente el almacenamiento del proyecto.");
    }
    require("./dist/main.js");
}
