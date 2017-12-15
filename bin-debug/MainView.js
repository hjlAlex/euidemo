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
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainSkin";
        return _this;
    }
    MainView.prototype.childrenCreated = function () {
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    MainView.prototype.onClick = function (event) {
        var targetBtn = event.currentTarget;
        console.log("你点击了" + targetBtn.label + "按钮");
    };
    return MainView;
}(eui.Component));
__reflect(MainView.prototype, "MainView");
//# sourceMappingURL=MainView.js.map