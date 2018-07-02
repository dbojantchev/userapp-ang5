var pg = require('pg');
var connectionString = process.env.POSTGRES_DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

connectionString = "postgres://u727a7be8516d463f9fd47f7be1c4c437:p937c7fea075248fd93963273941e6116@192.155.243.14:5433/dfb6b8c9348f64371b0202005f20f3986"

connectionString = "postgres://jotfcbia:cPZdQSzWaXKJrq92pqd5-mE6JQrSy-Ik@jumbo.db.elephantsql.com:5432/jotfcbia";

var client = new pg.Client(connectionString);
client.connect();

var query = client.query("SELECT * FROM TASK",
    function(err, result) {
        console.log(result.rows[0]);
    });

