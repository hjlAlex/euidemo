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
var RadioDemo = (function (_super) {
    __extends(RadioDemo, _super);
    function RadioDemo() {
        var _this = _super.call(this) || this;
        _this.skinName = "RadioDemoSkin";
        return _this;
    }
    RadioDemo.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    RadioDemo.prototype.childrenCreated = function () {
        this.xiaomi.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
        this.huawei.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
        this.apple.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
    };
    RadioDemo.prototype.changeHandler = function (event) {
        var radioButton = event.target;
        window.alert(radioButton.label + ":" + radioButton.group + ":" + radioButton.groupName + ":" + radioButton.value);
    };
    return RadioDemo;
}(eui.Component));
__reflect(RadioDemo.prototype, "RadioDemo", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=RadioDemo.js.map