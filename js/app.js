(function(angular) {
	'use strict';

	angular
		// 创建模块
		.module('todoApp', [])
		// 创建控制器
		.controller('TodoController', ['$scope', TodoController]);
	
	
	// 控制器函数
	function TodoController($scope) {
		var vm = $scope;
		// 代码写在此处！

		// 1 展示任务列表
		// 根据视图，抽象数据结构
		// 	id 用来确定唯一一条数据
		//  name 表示当前任务名称
		//  isCompleted 表示当前任务是否完成
		var todoList = [
			{ id: 1, name: '抽烟', isCompleted: false },
			{ id: 2, name: '喝酒', isCompleted: false },
			{ id: 3, name: '烫头', isCompleted: true },
		];
		// 给view提供数据
		vm.todoList = todoList;

		// 2 添加任务

		// 任务名称
		vm.taskName = '';
		vm.add = function() {
			// 判断任务名称是否为空
			if(vm.taskName.trim() === '') {
				return;
			}

			// 处理id
			// 思路：获取到数组最后一项的id，再加1就是当前要添加的id
			var id;
			if( todoList.length === 0 ) {
				// 如果数组中没有数据，那么，id就是1
				id = 1;
			} else {
				id = todoList[todoList.length - 1].id + 1;
			}

			todoList.push({ id: id, name: vm.taskName, isCompleted: false });
			// 清空文本框（清空 taskName 属性的值）
			vm.taskName = '';
		};

		// 3 删除一条任务
		vm.del = function(id) {
			// 思路：只需要将当前id对应的数据，从数组中移除就可以了！
			for(var i = 0; i < todoList.length; i++) {
				if(todoList[i].id === id) {
					todoList.splice(i, 1);
					break;
				}
			}
		};

		
	}

})(angular);