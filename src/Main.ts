//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene() {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private textfield: egret.TextField;

    protected startCreateScene(): void {
        //this.scrollerTestHorizontal();
        this.tileLayoutTest();
        //this.tabBarTest();
        //this.dataGroupTest();
        //this.listTest();
        // let listPanel:ListPanel = new ListPanel();
        // this.addChild(listPanel);
    }

    private tileLayoutTest(): void{
        let scroller:eui.Scroller = new eui.Scroller();
        scroller.width = this.stage.stageWidth;
        scroller.height = this.stage.stageHeight;
        scroller.bounces = false;

        let items = [];
        for(let i = 0;i < 100;i++){
            items.push("内容"+i);
        }
        let arrCollection:eui.ArrayCollection = new eui.ArrayCollection(items);

        let list:eui.List = new eui.List();
        let tileLayout:eui.TileLayout = new eui.TileLayout(); 
        tileLayout.requestedColumnCount = 4;  
        tileLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;     
        list.layout = tileLayout;
        list.dataProvider = arrCollection;

        scroller.viewport = list;
        this.addChild(scroller);

    }

    private listTest(): void{
        let scroller:eui.Scroller = new eui.Scroller();
        scroller.width = this.stage.stageWidth;
        scroller.height = this.stage.stageHeight;
        scroller.bounces = false;

        let items = [];
        for(let i = 0;i < 40;i++){
            items.push("内容"+i);
        }
        let arrCollection:eui.ArrayCollection = new eui.ArrayCollection(items);

        let list:eui.List = new eui.List();
        let verticalLayout:eui.VerticalLayout = new eui.VerticalLayout();
        verticalLayout.gap = 5;
        list.layout = verticalLayout;
        list.dataProvider = arrCollection;

        scroller.viewport = list;
        this.addChild(scroller);

    }

    private dataGroupTest(): void{
        let array = [
            {"userName":"Cocos","online":true},
            {"userName":"Java","online":true},
            {"userName":"Egret","online":true}
        ];
        let arrCollection:eui.ArrayCollection = new eui.ArrayCollection(array);        
        //开始使用datagroup
        let datagroup:eui.DataGroup = new eui.DataGroup();
        datagroup.dataProvider = arrCollection;
        datagroup.itemRenderer = PlayerStateItemRender;//定义数据渲染器,注意不是一个类的实例而是类的定义
        datagroup.width = 480;
        datagroup.x = (this.stage.stageWidth - datagroup.width)/2     
        this.addChild(datagroup);
    }

    private scrollerTestHorizontal():void{
        let scroller:eui.Scroller = new eui.Scroller();
        scroller.width = this.stage.stageWidth;
        scroller.height = this.stage.stageHeight;
        this.addChild(scroller);
        let group:eui.Group = new eui.Group();
        group.layout = new eui.HorizontalLayout();
        scroller.viewport = group;
        for(let i = 0;i < 40;i++){
            let rect:eui.Rect = new eui.Rect();
            rect.height = scroller.height;
            rect.width = 100;
            rect.x = 100 * i + 5 * i;
            rect.fillColor = Math.random() * 0xffffff;
            group.addChild(rect);
        }    
     }

     private scrollerTestVerticle():void{
        let scroller:eui.Scroller = new eui.Scroller();
        scroller.width = this.stage.stageWidth;
        scroller.height = this.stage.stageHeight;
        this.addChild(scroller);
        let group:eui.Group = new eui.Group();
        group.layout = new eui.VerticalLayout();
        scroller.viewport = group;
        for(let i = 0;i < 40;i++){
            let rect:eui.Rect = new eui.Rect();
            rect.width = scroller.width;
            rect.height = 100;
            rect.y = 100 * i + 5 * i;
            rect.fillColor = Math.random() * 0xffffff;
            group.addChild(rect);
        }    
     }

     private tabBarTest(): void{
         let tabBar:eui.TabBar = new eui.TabBar();
         tabBar.layout = new eui.VerticalLayout();
         tabBar.x = 200;
         tabBar.y = 100;
         tabBar.dataProvider = new eui.ArrayCollection(["VIP礼包","VIP特权"]);
         this.addChild(tabBar);
     }

     protected startCreateScene1(): void {
          let mainView:MainView = new MainView();
          this.addChild(mainView);
     }

    protected startCreateScene2(): void {
        //let mainView:MainView = new MainView();
        //this.addChild(mainView);
        let qFaceView:QFaceView = new QFaceView();
        this.addChild(qFaceView);

        let btn:eui.Button = new eui.Button();
        btn.label = "点击切换表情";
        this.addChild(btn);
        let index = 1;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent) => {            
            if(index  >= 3){
                index = index % 3;
            }
            qFaceView.currentState = ["q1","q2","q3"][index];
            index = index + 1;            
        },this);

        let label:eui.Label = new eui.Label();
        label.textFlow = new egret.HtmlTextParser().parse('我们<i>一起</i>学习<b>白鹭入门教程</b><font color="#ff0000" size="30" fontFamily="Verdana">Hello Egret</font>');
        label.x = 100;
        label.y = 100;
        this.addChild(label);

        let button:eui.Button = new eui.Button();
        button.skinName = "skins.MyButtonSkin";
        button.label = "购买";
        button.width = 100;
        button.height = 80;
        button.x = 200;
        button.y = 200;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent):void => {
            window.alert('你点击了'+(<eui.Button>event.currentTarget).label+'按钮');
        },this);

        let toggleButton:eui.ToggleButton = new eui.ToggleButton();
        toggleButton.label = "状态切换";
        toggleButton.width = 100;
        toggleButton.height = 80;
        toggleButton.x = 200;
        toggleButton.y = 400;
        toggleButton.addEventListener(eui.UIEvent.CHANGE,(event:eui.UIEvent):void => {
            let flag:boolean = (<eui.ToggleButton>event.currentTarget).selected;
            if(flag){
                window.alert('你按下了按钮');
            }else{
                window.alert('你取消了按下按钮');
            }            
        },this);
        this.addChild(toggleButton);

        let toggleSwitch:eui.ToggleSwitch = new eui.ToggleSwitch();       
        toggleSwitch.x = 200;
        toggleSwitch.y = 600;
        toggleSwitch.addEventListener(eui.UIEvent.CHANGE,(event:eui.UIEvent):void => {
            let flag:boolean = (<eui.ToggleButton>event.currentTarget).selected;
            if(flag){
                window.alert('开关开启了');
            }else{
                window.alert('开关关闭了');
            }            
        },this);
        this.addChild(toggleSwitch); 

        let checkBox:eui.CheckBox = new eui.CheckBox();
        checkBox.x = 200;
        checkBox.y = 800;
        checkBox.addEventListener(eui.UIEvent.CHANGE,(event:eui.UIEvent):void => {
            let flag:boolean = (<eui.ToggleButton>event.currentTarget).selected;
            if(flag){
                window.alert('选中了复选框');
            }else{
                window.alert('取消选中复选框');
            }            
        },this);
        this.addChild(checkBox);

        let radioDemo:RadioDemo = new RadioDemo();
        radioDemo.x = 200;
        radioDemo.y = 800;
        this.addChild(radioDemo);

        let radioButtonGroup:eui.RadioButtonGroup = new eui.RadioButtonGroup();
        let data = [
            {label:"小米",value:100},
            {label:"华为",value:200},
            {label:"苹果",value:300}
        ];
        for(let i = 0;i < data.length;i++){
            let rb:eui.RadioButton = new eui.RadioButton();
            rb.label = data[i].label; 
            rb.value = data[i].value;
            rb.group = radioButtonGroup;
            rb.x = 500;
            rb.y = 850 + i * 50;
            this.addChild(rb); 
        }
        radioButtonGroup.addEventListener(eui.UIEvent.CHANGE,(event:eui.UIEvent) => {
            let rbGroup:eui.RadioButtonGroup = <eui.RadioButtonGroup>event.target;
            let radioButton:eui.RadioButton = rbGroup.selection;
		    window.alert(radioButton.label + ":" + radioButton.group + ":" + radioButton.groupName + ":" + radioButton.value);
        },this);

        let progressBar:eui.ProgressBar = new eui.ProgressBar();
        this._progressBar = progressBar;
        progressBar.width = 332;
        progressBar.height = 22;
        progressBar.value = 10;
        progressBar.maximum = 100;
        progressBar.x = (this.stage.stageWidth - progressBar.width)/2;
        progressBar.y = this.stage.stageHeight - 100;
        this.addChild(progressBar);

        //创建一个计时器对象
        let timer:egret.Timer = new egret.Timer(500);
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER,(event:egret.TimerEvent) => {
            let b = this.hasEventListener(egret.Event.ENTER_FRAME);
            console.log(b);
            if(!b){
                timer.stop();
            }
        },this);

       this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
        
       timer.start();

       //HSlider
       let hSlider:MySlider= new MySlider();
       hSlider.skinName = "skins.MyHSliderSkin";
       hSlider.minimum = 0;
       hSlider.value = 0;
       hSlider.maximum = 100;
       hSlider.width = 300;
       hSlider.height = 50;
       hSlider.x = (this.stage.stageWidth - hSlider.width)/2;
       hSlider.y = this.stage.stageHeight - 50;
       this.addChild(hSlider);
       hSlider.addEventListener(eui.UIEvent.CHANGE,(event:eui.UIEvent) => {
           let target:eui.HSlider = <eui.HSlider>event.target;
           console.log("当前值:"+target.value);
       },this);

       //VSlider
       let vSlider:MyVSlider= new MyVSlider();       
       vSlider.minimum = 0;
       vSlider.value = 0;
       vSlider.maximum = 100;
       vSlider.width = 50;
       vSlider.height = 300;
       vSlider.x = 300
       vSlider.y = 300
       this.addChild(vSlider);
       vSlider.addEventListener(eui.UIEvent.CHANGE,(event:eui.UIEvent) => {
           let target:MyVSlider = <MyVSlider>event.target;
           console.log("MyVSlider当前值:"+target.value);
       },this);

      
    }
    private enterFrame(event:egret.Event):void{
        if(this._progressBar.value == this._progressBar.maximum){
            this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
            return;
        }
        this._progressBar.value = this._progressBar.value + 1;  
         
    }
    private _progressBar:eui.ProgressBar;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateSceneOld(): void {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this);

        let button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}
