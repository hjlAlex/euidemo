class MySlider extends eui.HSlider{
	
	public tracklight:eui.Image;
	
	public constructor() {
		super();		
	}

	protected childrenCreated():void{
		super.childrenCreated();
		this.tracklight.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTrackTouchBegin,this);
	}

	protected updateSkinDisplayList(){
		super.updateSkinDisplayList();		
		this.tracklight.width = this.value / this.maximum * this.width;
	}

	protected onTrackTouchBegin(event:egret.TouchEvent):void{
		super.onTrackTouchBegin(event);
	}
}