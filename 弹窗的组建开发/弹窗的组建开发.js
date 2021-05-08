window.onload = function () {
  const aInput = document.getElementsByTagName('input');

  aInput[0].onclick = function () { // 当<input>被点击时
    const dl = new Drag();
    dl.init({
      iNow: 0,
      title: '登录',
      t: true,
    });
  };

  aInput[1].onclick = function () { // 当<input>被点击时
    const dl = new Drag();
    dl.init({
      iNow: 1,
      w: 200,
      h: 400,
      dir: 'right',
      title: '公告',

    });
  };

  aInput[2].onclick = function () { // 当<input>被点击时
    const dl = new Drag();
    dl.init({
      iNow: 2,
      title: '遮罩弹窗',
      mark: true,

    });
  };
};

function Drag() {
  this.obj = null;
  this.span = null;
  this.Mark = null;
  this.disX = 0;
  this.disY = 0;

  this.settings = { // 默认参数
    w: 300,
    h: 300,
    dir: 'center',
    title: '',
    mark: false,
    t: false,
  };
}
Drag.prototype.json = {};// 标识
Drag.prototype.init = function (opt) { // 初始化
  extend(this.settings, opt);// 有配置参数就走配置参数，没有就走默认参数

  if (this.json[this.settings.iNow] == undefined) {
    this.json[this.settings.iNow] = true;
  }

  if (this.json[this.settings.iNow]) {
    this.create();
    this.setData();
    this.fnClose();

    if (this.settings.t) {
      const This = this;
      this.obj.onmousedown = function (ev) {
        var ev = ev || window.event;
        This.toDown(ev);
        document.onmousemove = function (ev) {
          var ev = ev || window.event;
          This.toMove(ev);
        };
        document.onmouseup = function () {
          This.toUp();
        };
        return false;
      };
    }

    this.json[this.settings.iNow] = false;
  }
};
Drag.prototype.create = function () { // 创建元素
  this.obj = document.createElement('div');
  this.obj.className = 'login';
  this.obj.innerHTML = `<div class="title"><span>${this.settings.title}</span><span class="close">X</span></div>`;

  this.Mark = document.createElement('div');
  this.Mark.id = 'mark';

  if (this.settings.mark) {
    document.body.appendChild(this.Mark);
    document.body.appendChild(this.obj);
  } else {
    document.body.appendChild(this.obj);
  }
};

Drag.prototype.setData = function () { // 设置属性
  this.obj.style.width = `${this.settings.w}px`;
  this.obj.style.height = `${this.settings.h}px`;

  if (this.settings.dir === 'center') {
    this.obj.style.left = `${(viewWidth() - this.obj.offsetWidth) / 2}px`;
    this.obj.style.top = `${(viewHeight() - this.obj.offsetHeight) / 2}px`;
  } else if (this.settings.dir === 'right') {
    this.obj.style.left = `${viewWidth() - this.obj.offsetWidth}px`;
    this.obj.style.top = `${viewHeight() - this.obj.offsetHeight}px`;
  }

  if (this.settings.mark) {
    this.Mark.style.width = `${viewWidth()}px`;
    this.Mark.style.height = `${viewHeight()}px`;
  }
};
Drag.prototype.fnClose = function () { // 关闭按钮
  const This = this;
  this.span = this.obj.getElementsByTagName('span')[1];
  this.span.onclick = function () {
    document.body.removeChild(This.obj);
    if (This.settings.mark) {
      document.body.removeChild(This.Mark);
    }
    this.json[this.settings.iNow] = true;
  };
};
Drag.prototype.toDown = function (ev) {
  this.disX = ev.clientX - this.obj.offsetLeft;
  this.disY = ev.clientY - this.obj.offsetTop;
};
Drag.prototype.toMove = function (ev) {
  let L = ev.clientX - this.disX;
  let T = ev.clientY - this.disY;
  if (L < 0) {
    L = 0;
  } else if (L > viewWidth() - this.obj.offsetWidth) {
    L = viewWidth() - this.obj.offsetWidth;
  }
  if (T < 0) {
    T = 0;
  } else if (T > viewHeight() - this.obj.offsetHeight) {
    T = viewHeight() - this.obj.offsetHeight;
  }
  this.obj.style.left = `${L}px`;
  this.obj.style.top = `${T}px`;
};
Drag.prototype.toUp = function () {
  document.onmousemove = null;
  document.onmouseup = null;
};
function extend(obj1, obj2) { // 对象的复制 ： 配置 默认
  for (const attr in obj2) {
    obj1[attr] = obj2[attr];
  }
}

function viewWidth() {
  return document.documentElement.clientWidth;
}
function viewHeight() {
  return document.documentElement.clientHeight;
}
