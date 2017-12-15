var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ListPanel = (function (_super) {
    __extends(ListPanel, _super);
    function ListPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ListPanelSkin";
        return _this;
    }
    ListPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var items = [];
        for (var i = 0; i < 100; i++) {
            var itemdata = { "img": "bg_jpg", "title": "怪物来袭", "time": "00:00:00" };
            items.push(itemdata);
        }
        var arrCollection = new eui.ArrayCollection(items);
        this.list.dataProvider = arrCollection;
        this.list.itemRenderer = MyItemRenderer; //重新指定自定义的渲染器
        this.scroller.viewport = this.list;
    };
    return ListPanel;
}(eui.Component));
__reflect(ListPanel.prototype, "ListPanel");
//# sourceMappingURL=ListPanel.js.map