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
var backgroundUI = (function (_super) {
    __extends(backgroundUI, _super);
    function backgroundUI() {
        var _this = _super.call(this) || this;
        _this.createImage();
        return _this;
    }
    backgroundUI.prototype.createImage = function () {
        var bg = new egret.Bitmap(RES.getRes("background1"));
        this.addChild(bg);
    };
    return backgroundUI;
}(egret.Sprite));
__reflect(backgroundUI.prototype, "backgroundUI");
//# sourceMappingURL=backgroundUI.js.map