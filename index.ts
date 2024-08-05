import express,{ Express,Request,Response } from "express";
import dotenv from "dotenv"
import * as database from "./config/database"
import clientRoutes from "./routes/client/index.routes";
import adminRoutes from "./routes/admin/index.routes";
import { systemConfig } from "./config/config";
import path from "path"

dotenv.config();
database.connect();

const app:Express = express();
const port:number | string = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static('public'));

// tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end tinyMCE

// app local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//client route
clientRoutes(app);

//admin route
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});