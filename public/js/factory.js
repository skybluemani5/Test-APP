app.factory("testpop",function(){
        var each_tp     = {};
	each_tp.show_alert = function (data,con){	
		$("#pop_data").html(data);
		var tool_dm = $('.tooltipleft');
		tool_dm.attr('class', 'tooltipleft');
		tool_dm.addClass(con);
		tool_dm.fadeIn('slow', function () {
			if(con == "alert"){
				tool_dm.find("#close_pup").delay(100).fadeIn('slow');
			}else{
   		 		tool_dm.delay(500).fadeOut('slow');
			}
		});	
	}
	each_tp.show_cfrm = function (func,ts,txt){
		$('#confirm_text').html(txt || '');
		$("#cfrm_btn").click();
		var ok_dm = $("#okay")[0];
		if(func != undefined && func != ""){
			ok_dm.onclick=function(){func(ts)};
		}else{
			ok_dm.onclick=function(){};
		}
	}
	return each_tp;
})
