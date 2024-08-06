import express,{ Express,Request,Response } from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import cookieParser from "cookie-parser";
import flash from "express-flash"
import session from "express-session"
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

// flash
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
// end flash

// parse application/x-www-form-urlencoded
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride("_method"));

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