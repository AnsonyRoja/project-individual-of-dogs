
const { conn } = require('./src/db.js');
const server = require('./src/app.js');
// const router = require('./routes/index');

const PORT = 3001;



conn.sync({ force: true })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server Listening on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
