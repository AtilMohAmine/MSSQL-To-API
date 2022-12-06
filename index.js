const express = require('express');
const app = express();
const tableRouter = require('./routes/Table');
const notFound = require('./middleware/not-found');

// middleware
app.use(express.json());

// routes
app.use('/api/v1/', tableRouter);

app.use(notFound);

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
);