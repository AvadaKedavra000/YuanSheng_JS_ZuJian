/*
组件开发： 代码复用的一种形式
正规的组件开发三者分离，配置参数，方法，事件
自定义事件： 有利于多人开发协作开发
onmousedown//当鼠标按下时
onmousemove//当鼠标移入时
onmouseup//当鼠标放开时
*/

window.onload = function () {
    const d1 = new Drag();
    d1.init('div1');
  };
  
  function Drag(){//拖拽函数
  
    this.obj = null;
    this.disX = 0;
    this.disY = 0;
  
    this.settings = {
  
    };
  

  }
  Drag.prototype.init = function(id,opt){// 初始化
  
    this.obj = document.getElementById(id);
    const This = this;
    this.obj.onmousedown = function(ev){
        var ev = ev || window.event;
        This.toDown(ev);
        document.onmousemove = function(ev){
          var ev = ev || window.event;
          This.toMove(ev);
        }
        document.onmouseup = function(){
          This.toUp();
        }
    }
  }

  Drag.prototype.toDown = function(ev){
    this.disX = ev.clientX - this.obj.offsetLeft;
    this.disY = ev.clientY - this.obj.offsetTop;
  }

  Drag.prototype.toMove = function(ev){
    this.obj.style.left=ev.clientX - this.disX + 'px';
    this.obj.style.top=ev.clientY - this.disY + 'px';
  }
  
  Drag.prototype.toUp = function(){
    document.onmousemove = null;
    document.onmouseup = null;
  }
  
  
  
  
  