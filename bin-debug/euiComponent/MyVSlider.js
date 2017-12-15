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
var MyVSlider = (function (_super) {
    __extends(MyVSlider, _super);
    function MyVSlider() {
        var _this = _super.call(this) || this;
        _this.skinName = "skins.MyVSliderSkin";
        return _this;
    }
    MyVSlider.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.fill.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickBar, this);
    };
    MyVSlider.prototype.updateSkinDisplayList = function () {
        _super.prototype.updateSkinDisplayList.call(this);
        this.fill.height = (this.value / this.maximum) * this.height;
        this.fill.y = this.height - this.fill.height;
    };
    MyVSlider.prototype.onClickBar = function (event) {
        _super.prototype.onTrackTouchBegin.call(this, event);
    };
    return MyVSlider;
}(eui.VSlider));
__reflect(MyVSlider.prototype, "MyVSlider");
//# sourceMappingURL=MyVSlider.js.map