const express = require('express');
const elementRouter = require('./routes/element-router.js');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.static('build'));
app.use(express.json());

/* Routes */
app.use('/api/element', elementRouter);

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
