import app from "./controller/app";

import schedullingRouter from "./router/schedullingRouter";
import populate from "./controller/Populate";

app.use('/scheduling', schedullingRouter)

app.post('/populate', populate)