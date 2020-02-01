var method = routes.prototype;

function routes(app, db_pool, bodyParser, async) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.get('/', function(req, res) {
        res.render('index');
    });
    app.get('/users', function(req, res) {
        cb_all_user_data(req, res);
    })
    var cb_all_user_data = function(req, res, cb) {
        var data = {
            query: "select id,userName,givenName,surName,DATE_FORMAT(DOB, '%d-%m-%Y') as DOB from userObj",
            connection: db_pool['comm']
        }
        query_runner(data, function(err, result) {
            var msg = "Success";
            var data = result;
            if (err) {
                msg = "Error";
                data = err;
            }
            if (cb) {
                cb(data)
                return;
            }
            res.status(200).send({
                'status': msg,
                'data': data
            })
        });
    }
    app.get('/user/:id', function(req, res) {
        var record_id = req.params.id;
        var data = {
            query: "select id,userName,givenName,surName,DATE_FORMAT(DOB, '%d-%m-%Y') as DOB from userObj where id=" + record_id,
            connection: db_pool['comm']
        }
        query_runner(data, function(err, result) {
            var msg = "Success";
            var data = result;
            if (err) {
                msg = "Error";
                data = err;
            }
            res.status(200).send({
                'status': msg,
                'data': data
            })
        });
    })
    var user_validation = function (usr_name, cb){
        var data = {
            query: "select id from userObj where userName='"+ usr_name+"'",
            connection: db_pool['comm']
        }
        query_runner(data, function(err, result) {
            var msg = "Success";
            var data = result;
            if (err) {
                msg = "Error";
                data = [];
            }
            cb(data)
        });

    }
    app.post('/users', function(req, res) {
        var ins_data = JSON.parse(req.body.i_data) || {};
        var usr_name = ins_data['userName'] || "";
        async.waterfall([function(callback) {
            user_validation(usr_name, function(usr_record) {
                        callback(null,usr_record)
            })
        }, function(usr_record, callback) {
              if(usr_record.length > 0){
                      res.status(200).send({'status': 'Error', 'data': data ,'info':'User Name Already Exist.'})
                      callback();
                      return;
              }
              var field_keys = [];
              var field_values = [];
              if ('DOB' in ins_data) {
                  field_keys.push('DOB')
                  field_values.push('STR_TO_DATE("' + ins_data['DOB'] + '", "%d-%m-%Y")')
                  delete ins_data['DOB']
              }
              for (var fk in ins_data) {
                  field_keys.push(fk)
                  field_values.push('"' + ins_data[fk] + '"')
              }
              var data = {
                  query: "INSERT INTO userObj (" + field_keys.join(',') + ") values (" + field_values.join(', ') + ")",
                  connection: db_pool['comm'],
              }
              query_runner(data, function(err, result) {
                  var msg = "Error";
                  var data = {};
                  async.waterfall([function(callback) {
                      if (err) {
                          data = err;
                          callback()
                      } else if (result.affectedRows > 0) {
                          msg = "Success";
                          cb_all_user_data('', '', function(res) {
                              data = res;
                              callback()
                          })
                      }
                  }], function(err) {
                      res.status(200).send({
                          'status': msg,
                          'data': data
                      })
                  })
              });
            }], function(err) {
                        
            });
    })

    app.patch('/user/:id', function(req, res) {
        var record_id = req.params.id;
        var u_data = JSON.parse(req.body.i_data) || {};
        var field_kv = [];
        if ('DOB' in u_data) {
            field_kv.push('DOB=STR_TO_DATE("' + u_data['DOB'] + '", "%d-%m-%Y")');
            delete u_data['DOB']
        }
        for (var fk in u_data) {
            field_kv.push(fk + '="' + u_data[fk] + '"')
        }
        var data = {
            query: "update  userObj set " + field_kv.join(',') + " where id='" + record_id + "'",
            connection: db_pool['comm'],
        }
        query_runner(data, function(err, result) {
            var msg = "Error";
            var data = {};
            if (err) {
                data = err;
            } else if (result.affectedRows > 0) {
                msg = "Success";
            }
            res.status(200).send({
                'status': msg,
                'data': data
            })
        });

    })
    app.delete('/user/:id', function(req, res) {
        var record_id = req.params.id;
        var data = {
            query: "delete from userObj  where id='" + record_id + "'",
            connection: db_pool['comm']
        }
        query_runner(data, function(err, result) {
            var msg = "Error";
            var data = {};
            if (err) {
                data = err;
            } else if (result.affectedRows > 0) {
                msg = "Success";
            }
            res.status(200).send({
                'status': msg,
                'data': data
            })
        });

    })

    var query_runner = function(data, cback) {
        var db_conncetion = data.connection;
        var query = data.query;
        var insert_data = data.insert_data;
        async.waterfall([function(callback) {
            db_conncetion.getConnection(function(err, con) {
                if (err) {
                    try {
                        con.release();
                    } catch (e) {
                        cback(err)
                    }
                } else {
                    callback(null, con)
                }
            })
        }, function(con, callback) {
            db_conncetion.query(String(query), insert_data, function(err, rows) {
                try {
                    con.release();
                } catch (e) {
                    cback(err)
                }
                if (err) {
                    cback(null, err);
                    return;
                }
                cback(null, rows);
                callback();
            });
        }], function(err) {
            if (err)
                console.log(err)
        })

    }
}
method.getroutes = function() {
    return this;
}

module.exports = routes;