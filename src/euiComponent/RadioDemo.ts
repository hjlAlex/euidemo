class RadioDemo extends eui.Component implements  eui.UIComponent {
	public xiaomi:eui.RadioButton;
	public huawei:eui.RadioButton;
	public apple:eui.RadioButton;


	public constructor() {
		super();
		this.skinName = "RadioDemoSkin";
	}

	protected partAdded(partName:string,instance:any):void{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void{
		this.xiaomi.addEventListener(eui.UIEvent.CHANGE,this.changeHandler,this);
		this.huawei.addEventListener(eui.UIEvent.CHANGE,this.changeHandler,this);
		this.apple.addEventListener(eui.UIEvent.CHANGE,this.changeHandler,this);
	}
	
	private changeHandler(event:eui.UIEvent):void{
		let radioButton:eui.RadioButton = <eui.RadioButton>event.target;
		window.alert(radioButton.label + ":" + radioButton.group + ":" + radioButton.groupName + ":" + radioButton.value);
	}
}