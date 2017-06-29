(function (angular) {

	angular
		.module("todoApp.service", [])
		.service("TotoService", ['$window', TotoService]);

	function TotoService($window) {
		// var todoList = [
		// 	{ id: 1, name: '抽烟', isCompleted: false },
		// 	{ id: 2, name: '喝酒', isCompleted: false },
		// 	{ id: 3, name: '烫头', isCompleted: true },
		// ];
		//将数据保存到localStorage中, 这样进入页面就读取数据, 将来发生任何数据变化, 都将这个此案后, 存到localstorage中

		var todoList;
		var storage = $window.localStorage;
		var that = this;
		todoList = JSON.parse(storage.getItem( 'todo' )) || [];

		//因为很多方法中都会修改数据, 所以我们将保存数据封装成一个方法
		this.save = function (){
			storage.setItem('todo', JSON.stringify(todoList));
		}


		//暴露获取数据的方法
		this.getData = function () {
			console.log(todoList );
			return todoList;
		}

		//暴露添加数据的方法
		this.addData = function (taskName) {
			var id;
			if (todoList.length === 0) {
				// 如果数组中没有数据，那么，id就是1
				id = 1;
			} else {
				id = todoList[todoList.length - 1].id + 1;
			}

			todoList.push({ id: id, name: taskName, isCompleted: false });
			that.save();
		}

		//删除一条数据
		this.delData = function (id) {
			// 思路：只需要将当前id对应的数据，从数组中移除就可以了！
			for (var i = 0; i < todoList.length; i++) {
				if (todoList[i].id === id) {
					todoList.splice(i, 1);
					break;
				}
			}
			that.save();
		}
		//7.处理清除任务按钮的显示和隐藏
		this.isShow = function(){
			return todoList.some(function (todo) {
				if (todo.isCompleted) {
					return true;
				}
			});
		}
		// 5 切换任务选中状态(单个或批量)
		this.checkAll = function (isCheckAll) {
			todoList.forEach(function (todo) {
				todo.isCompleted = isCheckAll;
			});
			that.save();
		};

		//显示未完成任务数
		this.getUnCompletedCount = function () {
			return todoList.reduce(function (acc, todo) {
				if (!todo.isCompleted) {
					acc++;
				}
				return acc;
			}, 0)
		};

		//清除已完成任务
		this.clearCompleted = function() {
			// 思路：遍历数据源，将已完成的任务删除（从数组中删除元素有个坑）
			// 			直接将未完成的任务保存起来
			var tempArr = [];
			for(var i = 0; i < todoList.length; i++) {
				var todo = todoList[i];
				if( !todo.isCompleted ) {
					tempArr.push( todo );
				}
			}
			//注意: 此处将tempArr赋值给vm.todoList就修改了vm.dotoList的指向
			//		修改以后, todoList 和vm.todoList的指向就不是同一个数组了
			// vm.todoList = tempArr;
			// todoList = vm.todoList;

			//清空数组(这种方式不会改变vm.todoList的指向)
			todoList.length = 0;
			[].push.apply(todoList, tempArr);
			that.save();
		}

	}

})(angular);
