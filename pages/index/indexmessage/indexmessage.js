getApp();

Page({
    data: {
        staticurl: getApp().globalData.staticurl,
        messageList: [ {
            face: getApp().globalData.staticurl + "index_tx.jpg",
            name: "活动通知01",
            cont: "您参加的活动有变化，请及时调整行程。",
            time: "上午9:08"
        }, {
            face: getApp().globalData.staticurl + "index_tx.jpg",
            name: "活动通知02",
            cont: "您参加的活动有变化，请及时调整行程。",
            time: "上午9:08"
        }, {
            face: getApp().globalData.staticurl + "index_tx.jpg",
            name: "活动通知03",
            cont: "您参加的活动有变化，请及时调整行程。",
            time: "上午9:08"
        }, {
            face: getApp().globalData.staticurl + "index_tx.jpg",
            name: "活动通知04",
            cont: "您参加的活动有变化，请及时调整行程。",
            time: "上午9:08"
        } ]
    }
});