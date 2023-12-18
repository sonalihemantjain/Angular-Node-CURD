const sql = require("mssql/msnodesqlv8");

var config = {
  server: "192.168.1.2",
  databse: "TestSonali1",
  user: "sa",
  password: "Sqladm!n",
  options: {
    trustedConnection: false,
  },
  driver: "msnodesqlv8",
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
  sql,
  poolPromise,
};
