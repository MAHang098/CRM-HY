function Tab(params) {
    this.tabLi = params.tabLi;
    this.conLi = params.conLi;
    this.tabCN = params.tabCN;
    this.conCN = params.conCN;
    this.index = 0;
    this.len = this.tabLi.length;
    this.init();
}
Tab.prototype.init = function() {
    this.addClick();
}
Tab.prototype.addClick = function() {
    var that = this;
    for (var i = 0; i < this.len; i++) {
        (function(i) {
            this.tabLi[i].onclick = function() {
                this.change(i);
            }.bind(that);
        }).call(this, i)


    }
}
Tab.prototype.change = function(i) {
    this.tabLi[this.index].className = "";
    this.conLi[this.index].className = "";
    this.index = i;
    this.conLi[this.index].className = this.conCN || "on";
    this.tabLi[this.index].className = this.tabCN || "on";
}

function Fn() {};
Fn.prototype = Tab.prototype;

Player.prototype = new Fn();

function Player(params) {

    Tab.call(this, params);
    this.leftBtn = params.leftBtn;
    this.rightBtn = params.rightBtn;
    this.timer;
    this.tabWrap = params.tabWrap;
    this.btnWrap = params.btnWrap;

    this.initMore();

}
Player.prototype.initMore = function() {
    this.btnTab();
    this.interMove();
    this.addOnmouse();
}
Player.prototype.btnTab = function() {
    this.leftBtn.onclick = function() {
        var i = this.index;
        i = i - 1 >= 0 ? --i : this.len - 1;

        this.change(i);
    }.bind(this);

    this.rightBtn.onclick = function() {
        var i = this.index;
        i = i + 1 < this.len ? ++i : 0;
        this.change(i);
    }.bind(this);
}
Player.prototype.interMove = function() {
    this.timer = setInterval(
        function() {
            var i = this.index;
            i = i + 1 < this.len ? ++i : 0;
            this.change(i);
        }.bind(this), 2000);
};
Player.prototype.interST = function(wrap) {
    console.log("0");
    console.log(wrap);
    wrap.onmouseover = function() {
        clearInterval(this.timer);
    }.bind(this);
    wrap.onmouseout = function() {
        this.interMove();
    }.bind(this);
};

Player.prototype.addOnmouse = function() {
    console.log(1);
    this.interST(this.btnWrap);
    this.interST(this.tabWrap);
};


new Player({
    tabLi: document.querySelectorAll(".main-pd .circle div"),
    conLi: document.querySelectorAll(".main-pd .img img"),
    tabCN: "on",
    conCN: "active",
    leftBtn: document.getElementById("left-btn"),
    rightBtn: document.getElementById("right-btn"),
    tabWrap: document.querySelector(".main-pd .circle"),
    btnWrap: document.querySelector(".button")
});