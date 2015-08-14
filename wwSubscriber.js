//子父窗体广播通信机制

//关注订阅号 - 自动关注成为父窗体的粉丝
parent.window.wwSubscriptionWindows && parent.window.wwSubscriptionWindows.push(window);

//我的粉丝列表（订阅者）
window.wwSubscriptionWindows = [];

//发布消息
window.wwSubscriptionBroadcast = function (type, data) {
	//事件通知 - 自己
	window.wwSubscribe(window, type, data);
	//事件通知 - 订阅者
	for (var index = 0; index < wwSubscriptionWindows.length; index++) {
		wwSubscriptionWindows[index].wwSubscribe(window, type, data)
	}
}

//接收消息
window.wwSubscribe = function (win, type, data) {
	//var isMeBroadcast = (win == self);
	var eData = {
		'$win': win,//谁发布
		'type': type,//发布类型
		'data': data//发布内容
	}
	//利用 jquery 自定义事件
	$(document).trigger("subscribe", eData);
	$(document).trigger("subscribe." + type, eData);
}