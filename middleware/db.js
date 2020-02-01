/*requiring mysql node modules */
var mysql  = require("mysql");
var pool_db ={
	'comm':{
		connectionLimit: 10,
		host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'user_management',
		waitForConnections : false
	}

};
var pools = {};
var create_pools = function () {
    for(var pool_db_key in pool_db){
        pools[pool_db_key] = mysql.createPool(pool_db[pool_db_key]);
    }
}
create_pools();
module.exports = pools ;
