var thisHref = document.location.href; 
var sourceHref = document.referrer;
if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad|symbian|rv:1.2.3.4|ucweb|Windows Phone)/i))) {
	if(document.referrer){
		if(sourceHref.indexOf("m.familydoctor.com.cn") == -1){
			if (thisHref != pc2murl(thisHref)) {
				location.replace(pc2murl(thisHref));
			}
		}
	}
	else{
		location.replace(pc2murl(thisHref));
	}
}
function pc2murl(s) {
	var test;
	if ((s.match(/(jkgl.familydoctor|try.familydoctor|book.familydoctor|ask.familydoctor|bbs.familydoctor)/i))) {
		return(s);
	}
	else {
		if (s.indexOf('www.familydoctor.com.cn')>=0){
			if (s.indexOf('.html')>=0) {
				test = /www.familydoctor.com.cn\/([a-z0-9]+)\/([a-z0-9]+)\/([\d]{6})\/([a-z0-9]+.html)/i; 
				return(s.replace(test,function($0,$1,$2,$3,$4) { 
					return("m.familydoctor.com.cn/" + $3 + "/" + $4); 
				})); 
			}
			else {
				test = /www.familydoctor.com.cn\/([a-z0-9]+)\/([a-z0-9]*)/i; 
				return(s.replace(test,function($0,$1,$2) { 
					return("m.familydoctor.com.cn/" + $1 + "/" + $2); 
				})); 
			}
		}
		else
		{
			if (s.indexOf('.html')>=0) {
				if (s.indexOf('hys.')>=0)
				{
					if (s.indexOf('familydoctor.com.cn')>=0) {
						test = /([a-z]+).familydoctor.com.cn\/([a-z0-9]+)\/([a-z0-9]+)\/([\d]{6})\/([a-z0-9]+.html)/i; 
						return(s.replace(test,function($0,$1,$2,$3,$4,$5) { 
							return("m.familydoctor.com.cn/" + $4 + "/" + $5); 
						})); 
					}
					else if (s.indexOf('scol.com.cn')>=0){
						test = /hys.scol.com.cn\/([a-z0-9]+)\/([a-z0-9]+)\/([\d]{6})\/([a-z0-9]+.html)/i; 
						return(s.replace(test,function($0,$1,$2,$3,$4) { 
							return("m.familydoctor.com.cn/hys/" + $3 + "/" + $4); 
						})); 
					}
				}
				else {
					test = /([a-z]+).familydoctor.com.cn\/([a-z0-9]+)\/([\d]{6})\/([a-z0-9]+.html)/i; 
					return(s.replace(test,function($0,$1,$2,$3,$4) { 
						return("m.familydoctor.com.cn/" + $3 + "/" + $4); 
					})); 

				}
			}
			else {
				if (s.indexOf('familydoctor.com.cn')>=0) {
					test = /([a-z]+).familydoctor.com.cn\/([a-z0-9]*)/i; 
					return(s.replace(test,function($0,$1,$2) { 
						return("m.familydoctor.com.cn/" + $1 + "/" + $2); 
					})); 
				}
				else if (s.indexOf('hys.scol.com.cn')>=0){
					if (s.indexOf('/chengdu')>=0)
					{
						test = /hys.scol.com.cn\/([/S]*)/i; 
						return(s.replace(test,function($0,$1) { 
							return("m.familydoctor.com.cn/hys/" + $1); 
						})); 
					}
					else {
						test = /hys.scol.com.cn\/([/S]*)/i; 
						return(s.replace(test,function($0,$1) { 
							return("m.familydoctor.com.cn/hys/chengdu/"); 
						})); 
					}
				}
			}
		}
	}
}

function upRwPip() {
	var rw=$("#viewContent p").length;
	var pip=$(".adExtra").html();
	var insertP=0;
	var lastP="";
	if(rw>0){
		for (i=rw-1;i>0 ;i--)
		{
			lastP=lastP+$("#viewContent p").eq(i).text()
			if(lastP.length>210){
				insertP=i;
				break;
			}
		}
		$("#viewContent p").eq(insertP).before("<div class=\"adLeftPip\">"+pip+"</div>");
	}
	else{
		$("#viewContent").html().after("<div class=\"adLeftPip\">"+pip+"</div>");
	}
}

//替换导航空格(在chrome40下错位的bug)
(function(){
	try{
		document.addEventListener("DOMContentLoaded", function(){
			if(navigator.userAgent.toLowerCase().indexOf("chrome") === -1){ return; }
			if(!document.querySelector){ return; }
			var menu = document.querySelector(".channelMenu");
			if(menu){
				menu.innerHTML = menu.innerHTML.replace(/&nbsp;/gi, "&ensp;");
			}
		}, false);
	}catch(e){}
})();<script>
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>

<script language="javascript" src="/ad.js"></script>