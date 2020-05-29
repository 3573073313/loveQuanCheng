Component({
    properties: {
        dropDownMenuTitle: {
            type: Array,
            value: [ "1", "2", "3" ]
        },
        dropDownMenuFirstData: {
            type: Array,
            value: []
        },
        dropDownMenuSecondData: {
            type: Array,
            value: []
        },
        dropDownMenuThirdData: {
            type: Array,
            value: []
        }
    },
    data: {
        hyopen: !1,
        sqopen: !1,
        pxopen: !1,
        sortopen: !1,
        shownavindex: "",
        dropDownMenuDataFirstRight: {},
        select1: "",
        select2: "",
        selectedQt: 0,
        selectedSq: 0,
        selectedSort: 1,
        arrowDirec0: 1,
        arrowDirec1: 1,
        arrowDirec2: 1,
        clickLeft: 0
    },
    methods: {
        listqy: function(e) {
            console.log(e), this.data.hyopen ? this.setData({
                hyopen: !1,
                sqopen: !1,
                pxopen: !1,
                sortopen: !1,
                shownavindex: 0,
                arrowDirec0: 1
            }) : this.setData({
                hyopen: !0,
                pxopen: !1,
                sqopen: !1,
                sortopen: !1,
                shownavindex: e.currentTarget.dataset.nav,
                arrowDirec0: 0
            });
        },
        list: function(e) {
            this.data.sqopen ? this.setData({
                sqopen: !1,
                pxopen: !1,
                hyopen: !1,
                sortopen: !1,
                shownavindex: 0,
                arrowDirec1: 1
            }) : this.setData({
                sqopen: !0,
                pxopen: !1,
                hyopen: !1,
                sortopen: !1,
                shownavindex: e.currentTarget.dataset.nav,
                arrowDirec1: 0
            });
        },
        listpx: function(e) {
            this.data.pxopen ? this.setData({
                sqopen: !1,
                pxopen: !1,
                hyopen: !1,
                sortopen: !1,
                shownavindex: 0,
                arrowDirec2: 1
            }) : this.setData({
                sqopen: !1,
                pxopen: !0,
                sortopen: !1,
                hyopen: !1,
                shownavindex: e.currentTarget.dataset.nav,
                arrowDirec2: 0
            }), console.log(e.target);
        },
        listsort: function(e) {
            this.data.sortopen ? this.setData({
                sqopen: !1,
                pxopen: !1,
                hyopen: !1,
                sortopen: !1,
                shownavindex: 0
            }) : this.setData({
                sqopen: !1,
                pxopen: !1,
                hyopen: !1,
                sortopen: !0,
                shownavindex: e.currentTarget.dataset.nav
            });
        },
        selectleft: function(e) {
            console.log(e);
            var t = e.target.dataset.model.childModel, a = "", s = "";
            e.target.dataset.model.id != this.data.select1 && (a = e.target.dataset.model.id, 
            s = e.target.dataset.model.title), this.setData({
                dropDownMenuDataFirstRight: null == t ? "" : t,
                select1: a,
                select2: "",
                clickLeft: 1
            }), null != t && 0 != t.length || (this.closeHyFilter(), this.triggerEvent("selectedItem", {
                index: this.data.shownavindex,
                selectedId: a,
                selectedTitle: s
            }));
        },
        selectcenter: function(e) {
            console.log(e);
            var t = "", a = "";
            e.target.dataset.model.id != this.data.select2 && (t = e.target.dataset.model.id, 
            a = e.target.dataset.model.title), this.closeHyFilter(), this.setData({
                select2: t
            }), this.triggerEvent("selectedItem", {
                index: this.data.shownavindex,
                selectedId: t,
                selectedTitle: a
            });
        },
        selectsqitem: function(e) {
            var t = "", a = "";
            e.target.dataset.model.id != this.data.selectedSq && (t = e.target.dataset.model.id, 
            a = e.target.dataset.model.title), this.closeHyFilter(), this.setData({
                selectedSq: t
            }), this.triggerEvent("selectedItem", {
                index: this.data.shownavindex,
                selectedId: t,
                selectedTitle: a
            });
        },
        selecsortlitem: function(e) {
            var t = "", a = "";
            e.target.dataset.model.id != this.data.selectedSort && (t = e.target.dataset.model.id, 
            a = e.target.dataset.model.title), this.closeHyFilter(), this.setData({
                selectedSort: t
            }), this.triggerEvent("selectedItem", {
                index: this.data.shownavindex,
                selectedId: t,
                selectedTitle: a
            });
        },
        selecqtlitem: function(e) {
            var t = "", a = "";
            e.target.dataset.model.id != this.data.selectedQt && (t = e.target.dataset.model.id, 
            a = e.target.dataset.model.title), this.closeHyFilter(), this.setData({
                selectedQt: t
            }), this.triggerEvent("selectedItem", {
                index: this.data.shownavindex,
                selectedId: t,
                selectedTitle: a
            });
        },
        closeHyFilter: function() {
            this.setData({
                sqopen: !1,
                pxopen: !1,
                hyopen: !1,
                sortopen: !1
            });
        }
    },
    attached: function() {}
});