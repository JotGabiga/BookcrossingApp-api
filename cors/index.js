const cors = require('cors');

const corsOptions = {
    origin: 'https://bookcrossing-328121.web.app',
    optionSuccessStatus: 200,
    methods: "GET, PUT, PATCH, DELETE, POST"
}
module.exports = cors(corsOptions);
