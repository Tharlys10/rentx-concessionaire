import { app } from "./app";

const port = Number(process.env.APP_PORT);

app.listen(port, () => console.log(`🚀 - server is running! - 📡 port ${port}`));