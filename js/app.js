(function(angular) {
	'use strict';

	angular
		.module('todoApp', [])
		.controller('TodoController', ['$scope', TodoController]);
	
	
	// 控制器函数
	function TodoController($scope) {
		var vm = $scope;

		// 代码写在此处！

		// 1 展示任务列表
		// 抽象数据结构
		var todoList = [
			{ id: 1, name: '抽烟', isCompleted: false },
			{ id: 2, name: '喝酒', isCompleted: false },
			{ id: 3, name: '烫头', isCompleted: true },
		];

		vm.todoList = todoList;
	}

})(angular);