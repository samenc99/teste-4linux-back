import app from "./controller/app";

import schedullingRouter from "./router/schedullingRouter";

app.use('/scheduling', schedullingRouter)