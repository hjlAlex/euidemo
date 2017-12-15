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
	//private pool:Array<TipItem>;
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