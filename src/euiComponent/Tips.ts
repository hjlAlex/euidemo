class Tips {
	private constructor() {
	}

	private static instance:Tips = null;

	public static getInstance(): Tips{
		if(null == Tips.instance){
			Tips.instance = new Tips();
		}
		return Tips.instance;
	}


	private layer:egret.DisplayObjectContainer;
	private pool:Array<TipItem>;
	private queue:Array<number>;

	public setLayer(layer:egret.DisplayObjectContainer): void{
		this.layer = layer;
		//this.pool = [];
		this.queue = [];
	}

	public static show(msg:string):void {
		//Tips.getInstance().initView(msg);
	}
}

class TipItem extends egret.Sprite{
	public constructor(){
		super();
		this.init();
	}

	private textField:egret.TextField;
	private bg:egret.Texture;

	private init():void{
		this.width = egret.MainContext.instance.stage.stageWidth * 0.6;
		this.textField = new egret.TextField();
		this.textField.size = 26;
		this.textField.bold = true;
		this.textField.textColor = 0xffffff;
		this.textField.multiline = true;
		this.textField.wordWrap = true;
		this.textField.textAlign = egret.HorizontalAlign.CENTER;
		this.textField.width = egret.MainContext.instance.stage.stageWidth * 5;
		this.textField.y = 10;
		this.addChild(this.textField);
	}
}