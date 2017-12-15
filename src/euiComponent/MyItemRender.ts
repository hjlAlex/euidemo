class MyItemRenderer extends eui.ItemRenderer{

	public rect:eui.Rect;
	public time:eui.Label;
	public img:eui.Image;
	public title:eui.Label;
	public fightBtn:eui.Button;


	public constructor() {
		super();
		this.skinName = "MyItemRender";
	}

	protected childrenCreated(): void{
		super.childrenCreated();
		this.fightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
	}

	protected dataChanged(): void{
		super.dataChanged();
	}

	private clickHandler(event:egret.TouchEvent): void{
		if(this.data){
			window.alert(this.data.title+":"+this.data.time);
		}
	}
}