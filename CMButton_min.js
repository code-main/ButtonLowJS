import{pins,INPUT,DIGITAL}from"gpio";import EventEmitter from"events";const defaultConfig={clickDuration:350,doubleClickDuration:900,longPressDuration:1500};class CMButton extends EventEmitter{constructor(t,i=defaultConfig){super(),this.pin=t,this.clickDuration=i.clickDuration,this.doubleClickDuration=i.doubleClickDuration,this.longPressDuration=i.longPressDuration,this.lastIsPressed=!1,this.lastPressedMillis=0,this.lastClickedMillis=0,this.init()}init(){pins[this.pin].setType(INPUT),setInterval(this.checkState.bind(this),75)}checkState(){pins[this.pin].getValue(DIGITAL,(t,i)=>{const s=i,e=(new Date).getTime();!this.lastIsPressed&&s?(this.emit("press"),this.lastPressedMillis=(new Date).getTime()):this.lastIsPressed&&!s&&(this.emit("release"),e-this.lastPressedMillis<=this.clickDuration?(this.emit("click"),e-this.lastClickedMillis<this.doubleClickDuration&&this.emit("doubleClick"),this.lastClickedMillis=(new Date).getTime()):e-this.lastPressedMillis>this.longPressDuration&&this.emit("longPress")),this.lastIsPressed=s})}}export default CMButton;