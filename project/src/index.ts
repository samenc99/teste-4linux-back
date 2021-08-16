import app from "./controller/app";

import schedullingRouter from "./router/schedullingRouter";
import populate from "./controller/Populate";
import serviceConsultantRouter from "./router/serviceConsultantRouter";

app.use('/scheduling', schedullingRouter)
app.use('/serviceConsultant', serviceConsultantRouter)

app.post('/populate', populate)
