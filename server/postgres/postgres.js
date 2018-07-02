var pg = require('pg');
var uuid = require('uuid');

function postgres() {

    var connectionString = process.env.POSTGRES_DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

    connectionString = "postgres://jotfcbia:cPZdQSzWaXKJrq92pqd5-mE6JQrSy-Ik@jumbo.db.elephantsql.com:5432/jotfcbia";

    var client = new pg.Client(connectionString);
    client.connect();

    this.getUsers = function (query, cb) {

        console.log('\n\n query = ' + JSON.stringify(query) + '\n\n');

        sqlstr = "SELECT * FROM PUBLIC.USER";

        if(query.sort) {
          sqlstr += ' ORDER BY ' + query.sort + ' ' + query.order;
        }

        console.log('\n\n sqlstr = ' + sqlstr + '\n\n');

        var query = client.query(sqlstr,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (cb) {
                        cb(result);
                    }
                }
            }
        );
    };

    this.addUser = function (data, cb) {

        console.log('\n\n data = ' + JSON.stringify(data) + '\n\n');

        let id = uuid.v1();
        console.log('\n\n id = ' + id);

        sqlstr = "INSERT INTO PUBLIC.USER (ID, FNAME, LNAME, AGE, NOTES) " +
        " VALUES ('" + id + "','" + data.fname + "','" + data.lname + "'," + data.age + ",'"
            + data.notes +  "' )";

        console.log('addUser:' + sqlstr);

        var query = client.query(sqlstr,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (cb) {
                        cb(result);
                    }
                }
            }
        );
    };

    this.updateUser = function (data, cb) {

        sqlstr = " UPDATE PUBLIC.USER " +
                  "SET FNAME = '" + data.fname + "'," +
                  "    LNAME = '" + data.lname + "'," +
                  "    AGE = " + data.age + "," +
                  "    NOTES = '" + data.notes + "'" +
                  " WHERE ID = '" + data.id + "'";

        console.log('updateUser:' + sqlstr);

        var query = client.query(sqlstr,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (cb) {
                        cb(result);
                    }
                }
            }
        );
    };

  this.deleteUser = function (data, cb) {

    sqlstr = " DELETE FROM PUBLIC.USER " +
             " WHERE ID = '" + data.id + "'";

    console.log('deleteUser:' + sqlstr);

    var query = client.query(sqlstr,
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (cb) {
            cb(result);
          }
        }
      }
    );
  };
}

module.exports = postgres;









