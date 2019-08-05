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

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private movers:Mover[]=[];
    private liquid:Liquid;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let bg=new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        this.addChild(bg);

        this.setup();
        this.onEnterFrame();
    }

    private setup(){
        this.liquid=new Liquid(0,this.stage.stageHeight/2,this.stage.stageWidth,this.stage.stageHeight/2,0.5);
        this.liquid.display();
        this.addChild(this.liquid);

        for(let i=0;i<10;i++){
            let mover=new Mover(Math.random()*5+1,0,0);
            this.movers.push(mover);
            this.addChild(mover);
        }
       
    }

    private onEnterFrame(){
        

        for(let i=0;i<this.movers.length;i++){

            if(this.movers[i].isInside(this.liquid)){
                this.movers[i].drag(this.liquid);
            }

            let wind:Vector2D=new Vector2D(0.1,0);//风力
            let gravity:Vector2D=new Vector2D(0,0.1*this.movers[i].mass);//重力

            let c=0.02;
            let friction=this.movers[i].velocity.copy();//摩檫力
            friction.mult(-1);
            friction.normalize();
            friction.mult(c);

            this.movers[i].applyForce(wind);
            this.movers[i].applyForce(gravity);
            this.movers[i].applyForce(friction);

            this.movers[i].update();
            this.movers[i].checkEdge(this.stage.stageWidth,this.stage.stageHeight);
            this.movers[i].display();
        }
        requestAnimationFrame(this.onEnterFrame.bind(this));
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}