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
var PlayerStateItemRender = (function (_super) {
    __extends(PlayerStateItemRender, _super);
    function PlayerStateItemRender() {
        var _this = _super.call(this) || this;
        _this.userNameTxt = new eui.Label();
        _this.userNameTxt.left = 10;
        _this.userNameTxt.textAlign = egret.HorizontalAlign.RIGHT;
        _this.userNameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.userNameTxt.height = 80;
        _this.addChild(_this.userNameTxt);
        _this.onlineTxt = new eui.Label();
        _this.onlineTxt.right = 10;
        _this.onlineTxt.textAlign = egret.HorizontalAlign.RIGHT;
        _this.onlineTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.onlineTxt.height = 80;
        _this.addChild(_this.onlineTxt);
        _this.height = 80;
        return _this;
    }
    PlayerStateItemRender.prototype.childrenCreated = function () {
        //隐藏默认的labelDisplay
        this.labelDisplay.visible = false;
    };
    PlayerStateItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.userNameTxt.text = this.data.userName;
        this.onlineTxt.text = this.data.online == true ? "在线" : "离线";
    };
    return PlayerStateItemRender;
}(eui.ItemRenderer));
__reflect(PlayerStateItemRender.prototype, "PlayerStateItemRender");
//# sourceMappingURL=PlayerStateItemRender.js.map