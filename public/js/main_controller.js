app.controller('main_con',['$scope','$rootScope','$timeout','testService','testpop',function ($scope,$rootScope,$timeout,testService,testpop){
	$scope.rec_hdr=[{'s':'UserName','k':'userName'},{'s':'GivenName','k':'givenName'},{'s':'SurName','k':'surName'},{'s':'DOB','k':'DOB'}];
	$scope.init_call = function(){
		  $('.datepicker').datepicker({format: "dd-mm-yyyy"});
		 $scope.retrive_all_data();
	}
	$scope.retrive_all_data =  function (){
		var post_dat = { 'cgi': '/users'};
                testService.ajax_request(post_dat, 'GET', function(res_data) {
			var msg = res_data['status'] || "Error";
			if( msg  == 'Success'){
                        	$scope.all_data_record = res_data['data'];
			}
                })
	}
	$scope.row_event = function (cf,row_data,r_idx,c_idx){
		$scope.act_row = row_data['id'];
		$scope.act_row_idx = r_idx;
		switch(cf){
		   case 'edit':
			$scope.rec_act = cf;
			$scope.reset_user_details=angular.copy(row_data);
			break
		   case 'delete':
			$scope.record_delete(row_data,r_idx);
			break
		   default:
			$scope.rec_act = '';
		}
	}
	$scope.record_delete = function (data,r_idx){
		testpop.show_cfrm($scope.delete_user_details,[data,r_idx],'Are you Sure ,you want to Delete <b>'+data['userName']+'</b> Details ?')	
	}
	$scope.delete_user_details = function (data){
		var post_dat = { 'cgi': '/user/'+data[0]['id']};
		testService.ajax_request(post_dat, 'DELETE', function(res_data) {
			var msg = res_data['status'] || "Error";
                        if( msg  == 'Success'){
                               $scope.all_data_record.splice(data[1],1);
                        }
		})

	}
	$scope.update_user_details = function(){
		var usr_data = angular.copy($scope.reset_user_details);
		var usr_name = (usr_data['userName'] || "").trim();
		if(!usr_name){
		   testpop.show_alert('Please Enter UserName','alert');
		   return;
		}
		for(var uk in usr_data){ 
			if(!usr_data[uk])
				usr_data[uk] = "";
		}
		var post_dat = { 'cgi': '/user/'+usr_data['id'],'inp_data': usr_data};
		testService.ajax_request(post_dat, 'PATCH', function(res_data) {
			 var msg = res_data['status'] || "Error";
			 if( msg  == 'Success'){
				$scope.all_data_record.splice($scope.act_row_idx,1);
				$scope.all_data_record.splice($scope.act_row_idx,0,usr_data)
			 }

		})
	}
	$scope.create_user_details = function(){
		var usr_data = angular.copy($scope.reset_user_details);
		var usr_name = (usr_data['userName'] || "").trim();
		if(!usr_name){
		   testpop.show_alert('Please Enter UserName','alert');
		   return;
		}
		for(var uk in usr_data){ 
			if(!usr_data[uk])
				usr_data[uk] = ""
		}
		var post_dat = { 'cgi': '/users','inp_data': usr_data};
		testService.ajax_request(post_dat, 'POST', function(res_data) {
				var msg = res_data['status'] || "Error";
			    if( msg  == 'Success'){
				       $scope.all_data_record = res_data['data'];
				}
		})
	}
	$scope.create_new_user = function (){
        $scope.rec_act = 'add';
        $scope.act_row="";
		$scope.act_row_idx = "";
		$scope.reset_user_details= {};
		$scope.rec_hdr.forEach(function(e_hdr){  $scope.reset_user_details[e_hdr['k']] = '' })
	}
	$scope.init_call()
}])
