class MyVSlider extends eui.VSlider{
	
	public fill:eui.Image;	


	public constructor() {
		super();
		this.skinName = "skins.MyVSliderSkin";
		
	}

	protected childrenCreated(): void{
		super.childrenCreated();
		this.fill.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClickBar,this);
	}

	public updateSkinDisplayList() :void{
		super.updateSkinDisplayList();
		this.fill.height = (this.value/this.maximum)*this.height;
		this.fill.y = this.height - this.fill.height;
	}

	private onClickBar(event:egret.TouchEvent): void{
		super.onTrackTouchBegin(event);
	}
}