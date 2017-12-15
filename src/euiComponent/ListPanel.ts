class ListPanel extends eui.Component{

	public scroller:eui.Scroller;
	public list:eui.List;

	public constructor() {
		super();
		this.skinName = "ListPanelSkin";
	}

	protected childrenCreated(): void{
		super.childrenCreated();
		let items = [];
        for(let i = 0;i < 100;i++){
			let itemdata = {"img":"bg_jpg","title":"怪物来袭","time":"00:00:00"};
            items.push(itemdata);
        }
        let arrCollection:eui.ArrayCollection = new eui.ArrayCollection(items);
		this.list.dataProvider = arrCollection;
		this.list.itemRenderer = MyItemRenderer;//重新指定自定义的渲染器
		this.scroller.viewport = this.list;
	}
}