angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope,$ionicTabsDelegate,$ionicSlideBoxDelegate,$http,$ionicModal,$sce) {
	var title_id=document.getElementById("title_text");
	
	
	var items='';
	$scope.createSlider=false;
	getSlideItem();
	function getSlideItem(){
		
		//http://218.28.198.114:10101/smartFlux/home/home!getHomeConfig.action
		$http.get('http://218.28.198.114:10101/smartFlux/home/home!getHomeConfig.action').success(function(data,status,headers,config){
			$scope.slideitems = [];
			$scope.createSlider=true;
			for(var i=0;i<data.rows.length;i++){
				if(data.rows[i].type==1){
					$scope.slideitems.push(data.rows[i]);
				}
			}
			$ionicSlideBoxDelegate.$getByHandle("slideboximgs").update();
			$ionicSlideBoxDelegate.$getByHandle("slideboximgs").loop(true);
		//请求正确的响应，不代表请求数据正确，只是说请求过程正确。请求数据的正确判断，一般是根据服务端返回的数据里面携带的状态码判断的  
		}).error(function(data,status,headers,config){  
			alert(222);
		//请求错误的响应，表示请求过程错误  
		})
		
	}
	
	//传递的是 index
	$scope.slideto_top=function(index){
		$ionicSlideBoxDelegate.$getByHandle("slideboximgs").slide(index);
	}
	//传递的是 index
	$scope.slideHasChanged=function(index){
		$ionicTabsDelegate.select(index);
	}
	$scope.onShowYeSelected=function(){
		
		var jsonStr=eval("["+"{'type' : '1', 'name':'火车票信息'},{'type': '2','name':'百度地图'},{'type':'3','name':'IP地址'},{'type' : '4', 'name':'汽车信息'}"+"]");
		
		title_id.innerHTML="首页";
		$ionicSlideBoxDelegate.slide(0,[1000]);
		$scope.items = [];
		var arr=["1a","2a","3a","4a","5a","6a","7a","8a"];
		for(var i=0;i<jsonStr.length;i++){		
			$scope.items.push(jsonStr[i]);
		}
	}
	$scope.onContentSelected=function(){
		title_id.innerHTML="分类";
		$ionicSlideBoxDelegate.slide(1,[1000]);
		$http.get('http://apicloud.mob.com/wx/article/category/query?key=13e3d87147959').success(function(data,status,headers,config){
			$scope.istitle=true;
			$scope.itemContent = [];
			for(var i=0;i<data.result.length;i++){
				$scope.itemContent.push(data.result[i]);
			}
			//请求正确的响应，不代表请求数据正确，只是说请求过程正确。请求数据的正确判断，一般是根据服务端返回的数据里面携带的状态码判断的  
		}).error(function(data,status,headers,config){  
			alert(222);
			//请求错误的响应，表示请求过程错误  
		})
	}
	$scope.onAboutSelected=function(){
		title_id.innerHTML="百度地图";
		getmapinfo();
		$ionicSlideBoxDelegate.slide(2,[1000]);
		
	}
	$scope.onSettingSelected=function(){
		title_id.innerHTML="设置";
		$ionicSlideBoxDelegate.slide(3,[1000]);
		
	}
	
	//------------------微信模块--------------------------
	
	$scope.itemTitleTouch=function(item){
		$http.get('http://apicloud.mob.com/wx/article/search?key=13e3d87147959&cid='+item.cid).success(function(data,status,headers,config){
			$scope.istitle=false;
			$scope.itemContent = [];
			for(var i=0;i<data.result.list.length;i++){
				$scope.itemContent.push(data.result.list[i]);
			}			
			title_id.innerHTML=item.name;
			//请求正确的响应，不代表请求数据正确，只是说请求过程正确。请求数据的正确判断，一般是根据服务端返回的数据里面携带的状态码判断的  
		}).error(function(data,status,headers,config){  
			alert(222);
			//请求错误的响应，表示请求过程错误  
		})
	}
	$scope.itemContentTouch=function(item){
		$scope.showModal1(item);
	}
	
	//定义开启弹窗的方法 photo
	$scope.showModal1 = function (item) {
		if ($scope.modal) {
		  $scope.modal.show();      //如果弹窗已经存在，直接显示
		} else {
		  $ionicModal.fromTemplateUrl('templates/tab-weixindetail.html', {
			scope: $scope,
			animation: 'silde-in-up'
		  }).then(function (modal) {
		    $scope.model=modal;
			$scope.model.show();
			//微信文章
			$scope.title=item.title;
			$scope.url = $sce.trustAsResourceUrl(item.sourceUrl);		
			//window.open(item.sourceUrl, '_self', 'location=yes');
			
		  });
		}
	   
	};
	$scope.hideModal1 = function () {
		$scope.model.remove();
	};
	//当前视图被销毁后，同时从内容中移除弹窗
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
	
//----------------火车票模块---------------------------
	
	$scope.CategoryTouch=function(item){
		$scope.showModal2(item);
	}
	//定义开启弹窗的方法 photo
	$scope.showModal2 = function (item) {
	
		  $ionicModal.fromTemplateUrl('templates/tab-queryhuochepiao.html', {
			scope: $scope,
			animation: 'silde-in-up'
		  }).then(function (modal2) {
		    $scope.model2=modal2;
			$scope.model2.show();
			//标题
			$scope.title=item.name;
			$scope.myStyle1="active";
			$scope.myStyle2="";	
			$scope.select_position_show=false;
		  });
		
	   
	};
	$scope.hideModal2 = function () {
		$scope.model2.remove();
	};
	//当前视图被销毁后，同时从内容中移除弹窗
	$scope.$on('$destroy', function() {
		$scope.modal2.remove();
	});
	
	$scope.query_select = function(index){
		if(index ==1){
			$scope.select_position_show=false;
			$scope.myStyle1="active";
			$scope.myStyle2="";	
			$scope.queryhuochepiao = [];			
		}else if(index==2){
			$scope.select_position_show=true;
			$scope.myStyle1="";
			$scope.myStyle2="active";
			$scope.queryhuoche = [];			
		}
	}
	
	//获取查询的数据
	$scope.itemhuocheQuery=function(){
		var url='';
		var startStation = document.getElementById("startStation").value;
		var endStation = document.getElementById("endStation").value;
		var huochecheci = document.getElementById("huochecheci").value;
		if($scope.myStyle1==''){
			url='http://apicloud.mob.com/train/tickets/queryByTrainNo?key=13e3d87147959&trainno='+huochecheci;
		}else{
			url='http://apicloud.mob.com/train/tickets/queryByStationToStation?key=13e3d87147959&start='+startStation+'&end='+endStation;
		}
		$http.get(url).success(function(data,status,headers,config){

			if($scope.myStyle1==''){
				$scope.queryhuoche = [];
				for(var i=0;i<data.result.length;i++){
					$scope.queryhuoche.push(data.result[i]);
				}
			}else{
				$scope.queryhuochepiao = [];
				for(var i=0;i<data.result.length;i++){
					$scope.queryhuochepiao.push(data.result[i]);
				}
			}

			//请求正确的响应，不代表请求数据正确，只是说请求过程正确。请求数据的正确判断，一般是根据服务端返回的数据里面携带的状态码判断的
		}).error(function(data,status,headers,config){
			alert(222);
			//请求错误的响应，表示请求过程错误
		})
	}

//--------------百度地图模块-------------------
    $scope.getmap = function(){
        $scope.showModal3();
    }

    //定义开启弹窗的方法 地图
    $scope.showModal3 = function () {
        
          $ionicModal.fromTemplateUrl('templates/tab-baidumap.html', {
            scope: $scope,
            animation: 'silde-in-up'
          }).then(function (modal3) {
            $scope.model3=modal3;
            $scope.model3.show();
            //标题
            $scope.title='地图';
            //加载地图信息
            getmapinfo();

          });
        
    }

    $scope.hideModal3 = function () {
    		$scope.model3.remove();
    };
    //当前视图被销毁后，同时从内容中移除弹窗
    $scope.$on('$destroy', function() {
        $scope.modal3.remove();
    });
    function getmapinfo(){
        // 百度地图API功能
        var map = new BMap.Map("allmap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		
		//创建小狐狸
		var pt = new BMap.Point(116.404, 39.915);
		var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
		var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
		map.addOverlay(marker2);              // 将标注添加到地图中
		
		
		var myKeys = ["酒店", "加油站"];
		var local = new BMap.LocalSearch(map, {
			renderOptions:{map: map, panel:"r-result"},
			pageCapacity:5
		});
		local.searchInBounds(myKeys, map.getBounds());
		
			
		/*var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			alert('您的位置：'+r.point.lng+','+r.point.lat);
		}else {
			alert('failed'+this.getStatus());
		}*/        
	},{enableHighAccuracy: true})
    }
	$scope.searchInfo = function (){
		var local = new BMap.LocalSearch(map, {
		renderOptions:{map: map}
		});
		local.search("景点");
	}
	
});
