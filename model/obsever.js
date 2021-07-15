// 观察者模式
var subject = {
	observers: [],
	notify() {
		this.observers.forEach(observer =>{
			observer.update()
		})
	},
	attach (observer) {
		this.observers.push(observer)
	}
}
var observer = {
	update(){
		console.log('updated')
	}
}
subject.attach(observer)
subject.notify()

// 发布订阅
var publisher = {
	publish(pubsub) {
		pubsub.publish()
	}
}
var pubsub = {
	subscribes: [],
	publish() {
		this.subscribes.forEach(subscribe =>{
			subscribe.update();
		})
	},
	subscribe(sub) {
		this.subscribes.push(sub)
	}
}
var subscribe = {
	update() {
		console.log('update')
	},
	subscribe(pubsub) {
 		pubsub.subscribe(this);
	}
}
subscribe.subscribe(pubsub)
publisher.publish(pubsub)