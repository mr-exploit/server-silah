import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// route
import UserRoute from "./routes/UserRoute.js";
import DataSekolahRoute from "./routes/DataSekolahRoute.js";
import KerusakanValidasiRoute from "./routes/KerusakanValidasiRoute.js";
import PerbaikanValidasiRoute from "./routes/PerbaikanValidasiRoute.js";
import KerusakanRoute from "./routes/KerusakanRoute.js";
import PerbaikanRoute from "./routes/PerbaikanRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

// global
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// 
(async() => {
    await db.sync();
})();


app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(DataSekolahRoute);
app.use(AuthRoute);
app.use(KerusakanRoute);
app.use(KerusakanValidasiRoute);
app.use(PerbaikanRoute);
app.use(PerbaikanValidasiRoute);
// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server Up and Running...');
});