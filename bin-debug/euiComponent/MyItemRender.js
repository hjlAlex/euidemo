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
var MyItemRenderer = (function (_super) {
    __extends(MyItemRenderer, _super);
    function MyItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "MyItemRender";
        return _this;
    }
    MyItemRenderer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.fightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    MyItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    MyItemRenderer.prototype.clickHandler = function (event) {
        if (this.data) {
            window.alert(this.data.title + ":" + this.data.time);
        }
    };
    return MyItemRenderer;
}(eui.ItemRenderer));
__reflect(MyItemRenderer.prototype, "MyItemRenderer");
//# sourceMappingURL=MyItemRender.js.map