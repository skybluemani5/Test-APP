app.directive('popTab', function () {

                return {
                        restrict:'A',
                        scope:false,
                        transclude :true,
                        template:'<div class="tooltipleft" id="tooltip">'+
                                        '<div id="code"><span id="pop_data"></span></div>'+
                                        '<span id="close_pup" style="right: 2%; top: 2%; position: fixed;padding:6px 29px;" class="btn btn-ins">Close</span>'+
                                 '</div>'+
				 '<div ng-show="processloader.length"  class="loading preloader">'+
					'<svg class="circular" viewBox="25 25 50 50">'+
						'<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>'+
					'</svg>'+
				'</div>'+
				 '<button  data-toggle="modal"  data-keyboard="false" data-target="#cfm" id="cfrm_btn"  style="display:none;"></button>'+
				  '<div class="modal fade" id="cfm" role="dialog"   data-backdrop="static" >'+
				    '<div class="modal-dialog" id="modal-dialog">'+
				      '<div class="modal-content">'+
					'<div class="modal-body">'+
						'<h4 style="max-height:470px !important;overflow:auto;" id="confirm_text"  class="modal-title"></h4>'+
					'</div>'+
					'<div class="modal-footer"style="background:#F5F5F5;border-radius:0px 0px 5px 5px;">'+
					  '<button type="button" class="btn btn-primary" id="okay" data-dismiss="modal">Ok</button>'+
					  '<button type="button" class="btn btn-default" id="notokay"  data-dismiss="modal">Cancel</button>'+
					'</div>'+
				     '</div>'+
				    '</div>'+                         
          			   '</div>',	

                        link:function($scope,$element, $attrs,$document) {
				var get_close_btn_dm = $($element[0]).find("#close_pup");
                                get_close_btn_dm.on('click', function () {
					$(get_close_btn_dm).closest(".tooltipleft").delay(500).fadeOut('slow');
                                })
                        }
                };

})
