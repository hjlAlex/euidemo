class MainView extends eui.Component{

	private username:eui.TextInput;
	private password:eui.TextInput;

	private registerBtn:eui.Button;
	private loginBtn:eui.Button;

	public constructor() {
		super();
		this.skinName = "MainSkin";
	}

	protected childrenCreated(): void{
		this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
	}

	private onClick(event:egret.TouchEvent): void{
		let targetBtn:eui.Button = event.currentTarget;
		console.log("你点击了"+targetBtn.label+"按钮")
	}
}