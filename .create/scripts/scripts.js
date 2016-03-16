
$(function(){    
    Browser.init();
    Site.init();     
});

$(window).load(function(){
    $( "#tabs" ).tabs();
})

var Site = new function () {
    this.init = function(){        
    };
};

var Browser = new function() {
    this.data = {};    
    this.getData = function() {
        return this.data;
    };
    this.init = function() {
        var t = this;
        var data = this.data;
        
        data.$b = $("body");
        data.navigator = navigator.userAgent.toLowerCase();
        data.clazz = {
            mobile : "mobile"
        };
        data.list = [
            {  tool:'ipad', clazz:'iPad'},
            {  tool:'android', clazz:'android'},
            {  tool:'ipod', clazz:'iPod'},
            {  tool:'iphone', clazz:'iPhone'},
            {  tool:'firefox', clazz:'firefox'},            
            {  tool:'msie 8.', clazz:'ie8'},
            {  tool:'msie 9.', clazz:'ie9'},
            {  tool:'msie 10.', clazz:'ie10'},
            {  tool:' opr/', clazz:'opera'}            
            ];
        
        for (i =0; i< data.list.length; i++)
            {
                if (data.navigator.indexOf(data.list[i].tool) > 0) 
                {
                    data.$b.addClass(data.list[i].clazz);
                    
                    if (data.list[i].tool=='android' || data.list[i].tool == 'iphone') 
                    {
                        t.orientation();
                        data.$b.addClass(data.clazz.mobile);
                    }
                }
            }                
        
        if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) && !this.isIpad()) {
            data.$b.addClass("safari");
        } 
        else if ((data.navigator.indexOf('Trident') > 0) && (data.navigator.indexOf('rv:11.') > 0)) data.$b.addClass("ie11");                             
                
        this.viewPort();
    };
    this.isIpad = function() { return this.check(this.data.list[0]); };
    this.isAndroid = function() { return this.check(this.data.list[1]); };
    this.isIpod = function() { return this.check(this.data.list[2]); };
    this.isIphone = function() { return this.check(this.data.list[3]); };
    
    this.check = function(pos)
    {
        if (this.data.navigator.indexOf(pos.tool) > 0) this.data.$b.addClass(pos.clazz);
        return (this.data.$b.hasClass(pos.clazz));
    };        
    this.orientation = function() {
        var or = ["orX", "orY"];
        var data = this.data;
        var c = [data.$b.innerHeight(), data.$b.innerWidth()];
        (c[0] > c[1]) ? data.$b.removeClass(or[0]) : data.$b.removeClass(or[1]);
        (c[0] > c[1]) ? data.$b.addClass(or[1]) : data.$b.addClass(or[0]);            
    };
    this.viewPort = function() {
        var def = document.querySelector("meta[name=viewport]");
        var view = '<meta name="viewport" content="width=device-width">';
        if (def != null) {            
            if (this.isIpad()) { 
                def.remove();
                view = '<meta name="viewport" content="maximum-scale=1.0, initial-scale=1.0, user-scalable=0">';
            } 
//            else 
//                if (this.isIPhone())
//                    {
//                        def.remove();
//                        view = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">';
//                    }
        };     
        jQuery('head').append(view);
    }
}