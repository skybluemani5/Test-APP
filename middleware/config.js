var method=config.prototype;

function config(app,express){
	app.set('view engine', 'ejs');
	app.set('views', (__dirname + './../public/views'));
	app.use("/src", express.static(__dirname + "./../public"));
	app.set('port', process.env.PORT || 3000);
}
method.get_config=function(){
	return this;
}

module.exports = config;
