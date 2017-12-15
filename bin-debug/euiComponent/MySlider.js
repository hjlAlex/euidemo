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
var MySlider = (function (_super) {
    __extends(MySlider, _super);
    function MySlider() {
        return _super.call(this) || this;
    }
    MySlider.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.tracklight.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this);
    };
    MySlider.prototype.updateSkinDisplayList = function () {
        _super.prototype.updateSkinDisplayList.call(this);
        this.tracklight.width = this.value / this.maximum * this.width;
    };
    MySlider.prototype.onTrackTouchBegin = function (event) {
        _super.prototype.onTrackTouchBegin.call(this, event);
    };
    return MySlider;
}(eui.HSlider));
__reflect(MySlider.prototype, "MySlider");
//# sourceMappingURL=MySlider.js.map