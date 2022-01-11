const cors = require('cors');

const corsOptions = {
    origin: "https://bookcrossing-328121.web.app",
    optionSuccessStatus: 200,
}
module.exports = cors(corsOptions);
