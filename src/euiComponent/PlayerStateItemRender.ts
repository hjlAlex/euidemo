class PlayerStateItemRender extends eui.ItemRenderer{
	
	private userNameTxt:eui.Label;
	private onlineTxt:eui.Label;
	private labelDisplay:eui.Label;

	public constructor() {
		super();
		this.userNameTxt = new eui.Label();		
		this.userNameTxt.left = 10;
		this.userNameTxt.textAlign = egret.HorizontalAlign.RIGHT;
		this.userNameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.userNameTxt.height = 80;
		this.addChild(this.userNameTxt);

		this.onlineTxt = new eui.Label();
		this.onlineTxt.right = 10;
		this.onlineTxt.textAlign = egret.HorizontalAlign.RIGHT;
		this.onlineTxt.verticalAlign = egret.VerticalAlign.MIDDLE;	
		this.onlineTxt.height = 80;	
		this.addChild(this.onlineTxt);

		this.height = 80;		
		
	}

	protected childrenCreated(): void{
		//隐藏默认的labelDisplay
		this.labelDisplay.visible = false;
	}

	protected dataChanged(): void{
		super.dataChanged();
		this.userNameTxt.text = this.data.userName;
		this.onlineTxt.text = this.data.online == true ? "在线" : "离线";
	}
}