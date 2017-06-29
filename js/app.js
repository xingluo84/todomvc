(function (angular) {
	'use strict';

	angular
		// 创建模块
		.module('todoApp', ["ngRoute", "todoApp.service"])

		.config(['$routeProvider', function($routeProvider){
			$routeProvider.when('/:status?', {
				templateUrl: './views/app.html',
				controller: 'TodoController'
			})
			.otherwise({
				redirectTo: '/'
			})
		}])
		// 创建控制器
		.controller('TodoController', ['$scope', '$location','$routeParams', 'TotoService', TodoController]);


	// 控制器函数
	function TodoController($scope, $location, $routeParams, TotoService) {
		// console.log( $routeProvider );
		//将所有的数据相关的操作, 全部移动到service中, 控制器中只调用 service中的方法
		var vm = $scope;
		// 给view提供数据
		vm.todoList = TotoService.getData();

		// 2 添加任务
		vm.taskName = '';
		vm.add = function () {
			if (vm.taskName.trim() === '') {
				return;
			}
			TotoService.addData(vm.taskName);
			vm.taskName = '';
		};


		// 3 删除一条任务
		vm.del = TotoService.delData;


		// 4 修改任务
		vm.editingId = -1;
		vm.edit = function (id) {
			vm.editingId = id;
		};
		vm.update = function () {
			vm.editingId = -1;
			TotoService.save();
		};

		// 5 切换任务选中状态(单个或批量)
		vm.saveSingleCbx = function(){
			TotoService.save();
		}
		vm.isCheckAll = false;
		vm.checkAll = function () {
			TotoService.checkAll(vm.isCheckAll);
		};

		// 6 清除已完成任务
		vm.clearCompleted = TotoService.clearCompleted;


		//7.处理清除任务按钮的显示和隐藏
		vm.isShow = TotoService.isShow;

		//8.显示未完成任务数
		vm.getUnCompletedCount = TotoService.getUnCompletedCount;

		vm.status = undefined;
		// //9.根据url的变化展示响应任务
		// vm.location = $location;
		// vm.$watch("location.url()", function (curVal) {
		// 	switch (curVal) {
		// 		case "/active":
		// 			vm.status = false;
		// 			break;
		// 		case "/completed":
		// 			vm.status = true;
		// 			break;
		// 		default:
		// 			vm.status = undefined;
		// 			break;
		// 	}
		// })

		var routeObj = {
			active: false,
			completed: true,
		}

		vm.status = routeObj[$routeParams.status];

	}

})(angular);
