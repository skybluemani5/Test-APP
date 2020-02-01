app.service('testService', function($http, testpop,$rootScope){
    $rootScope.processloader =[];
    this.ajax_request = function(post_data, method, callback_success, callback_error){
	$rootScope.processloader.push(1)
	var url = post_data['cgi'];
	var data = 'i_data='+JSON.stringify(post_data['inp_data']);
        $http({
            url: url,
            method: method,
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function(response){
	    $rootScope.processloader.pop();
            var rdata = response.data;
            var sts = rdata['info'] != undefined ? rdata['info']:rdata['status'];
	    testpop.show_alert(sts,rdata['status'])
	    callback_success(rdata);
        }, function(error){
	    $rootScope.processloader.pop();
	    var err_dic = {'status': 'Error','data':error};
	    testpop.show_alert(err_dic['status'],err_dic['data'])
            callback_success(err_dic);
	    return;
        });
    }
});
        
