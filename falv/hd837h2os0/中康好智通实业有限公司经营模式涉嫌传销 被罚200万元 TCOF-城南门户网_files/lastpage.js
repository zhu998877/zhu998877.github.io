$(document).ready(function(){
	//顶部弹出更多菜单
	(function(){
		var $wrap = $("#global-top-bar");
		if(!$wrap.length){ return; }
		var $more = $wrap.find("a.more");
		var $cont = $wrap.find(".more-cont");
		var pos = $("#global-top-bar .side-left").offset();
		$cont.css({left: pos.left + 288});

		$more.mouseenter(function(){
			$cont.slideDown();
			$more.addClass("more-on");
			$("#top-login-box").hide();
		}).mouseleave(function(){
			$cont.hide();
			$more.removeClass("more-on");
		});

		$cont.mouseenter(function(){
			$(this).show();
			$more.addClass("more-on");
		}).mouseleave(function(){
			$(this).hide();
			$more.removeClass("more-on");
		});
	})();

	//弹出顶部登录窗口
	(function(){
		var thisUrl=encodeURIComponent("http://www.familydoctor.com.cn/");
		if (window.location.href != null){
			thisUrl = encodeURIComponent(window.location.href);
		}
		$("#top-reg-trigger").attr("href", "http://passport.familydoctor.com.cn/register.aspx?refback=" + thisUrl);

		$("body").append('<div id="top-login-box" class="top-login-box hide"></div>');
		var $loginBox = $("#top-login-box");
		var $loginWrap = $("#top-login-wrap");

		$loginWrap.find("iframe").attr("src", "http://passport.familydoctor.com.cn/global-top-login.htm?v=3&returnurl=" + thisUrl);
		//$loginWrap.find("iframe").attr("src", "global-top-login.htm?v=1&returnurl=" + thisUrl);
		
		var $loginTrigger = $("#top-login-trigger");
		$loginTrigger.mouseenter(function(e){
			e.stopPropagation();
			var pos = $(this).offset();
			$loginBox.css({top: pos.top + 37, left: pos.left, position: "absolute"}).toggle();
			if($loginBox.html() == ""){
				$loginWrap.appendTo($loginBox).show();
			}
		}).mouseleave(function(){
			$loginBox.hide();
		});

		$loginBox.click(function(e){
			e.stopPropagation();
		}).mouseenter(function(){
			$loginTrigger.off("mouseleave");
			$(this).show();
		}).mouseleave(function(){
			$loginTrigger.mouseleave(function(){
				$loginBox.hide();
			});
		});

		$(document).on("click", function(e){
			if(!$(e.target).is($loginBox)){
				$loginBox.hide();
			}
		});
	})();

	//顶部弹出更多菜单
	(function(){
		var $wrap = $("#global-top-nav");
		if(!$wrap.length){ return; }
		var $more = $wrap.find("a.more");
		var $cont = $wrap.find(".more-cont");

		$more.mouseenter(function(){
			$cont.slideDown();
			$more.addClass("more-on");
			$("#top-login-box").hide();
		}).mouseleave(function(){
			$cont.hide();
			$more.removeClass("more-on");
		});

		$cont.mouseenter(function(){
			$(this).show();
			$more.addClass("more-on");
		}).mouseleave(function(){
			$(this).hide();
			$more.removeClass("more-on");
		});
	})();

	//左右浮标贴内容
	(function(){
		var $window = $(window);
		var posX;
		posX = ($window.width()/2) - (1000/2) - 200;
		if (posX<0)
		{
			posX = 0 ;
		}
		if ($("#lFloatAd .fDoctorBox").length>0)
		{
			$("#lFloatAd").css({"left": posX});
		}
		if ($("#rFloatAd .fDoctorBox").length>0)
		{
			$("#rFloatAd").css({"right": posX});
		}
	})();
});

//视频区
function AddVideo(vid) {
	$.ajax({
		type: "get",
		url:"http://api.cms.familydoctor.com.cn/article/get?token=B26D842D8D474CD5851192003C351C9A&id="+vid+"&callback=?",
		dataType:"jsonp",
		success:function(data){
			if (data.VideoUrl!="")
			{
				var VideoStr=data.VideoUrl.replace(/\"990\"/g,"\"641\"");
				VideoStr=VideoStr.replace(/\"515\"/g,"\"400\"");
				VideoStr=VideoStr.replace(/width=990/g,"width=641");
				VideoStr=VideoStr.replace(/height=515/g,"height=400");
				$("#viewContent").prepend("<div class=\"inner-video\"><div class=\"video-title\"><h3>相关视频：<a href=\""+data.Url+"\" target=\"_blank\">"+data.Title+"</a></h3></div>"+VideoStr+"</div>");
			}
		},
		error: function() {	},
	});
}

//调查问卷区
function getPoll(pid) {
	$.ajax({
		type: "get",
		url:"http://api.cms.familydoctor.com.cn/Survey/Process/"+pid+"",
		dataType:"jsonp",
		success:function(data){
			if (data.Success)
			{
				function showquestion() {
					questionStr+='<div class="pollModule"><div class="titleBar" id="surveyTitle"><h3>'+data.Title+'</h3></div>';
					questionStr+='<div class="pollSummary"><p>'+data.Summary+'</p></div>'
					questionStr+='<div id="surveyformdiv" class="tpQuestion">';
					questionStr+='<form id="surveyform" method="post">';
					for (var i in data.Questions)
					{
						if (data.Questions[i].IsRequired)
						{
							questionStr+='<dl><dt>'+data.Questions[i].Title+'<span> * </span></dt>';
						}
						else
						{
							questionStr+='<dl><dt>'+data.Questions[i].Title+'</dt>';
						}
						switch(data.Questions[i].Type){
							case 0:
								for (var j in data.Questions[i].Answer)
								{
									questionStr+='<dd><input name="Question_'+data.Questions[i].Id+'" id="Question_'+data.Questions[i].Id+'_'+data.Questions[i].Answer[j].Id+'" type="radio" value="'+data.Questions[i].Answer[j].Id+'"><label for="Question_'+data.Questions[i].Id+'_'+data.Questions[i].Answer[j].Id+'">'+data.Questions[i].Answer[j].Title+'</label></dd>';
								}
								break;
							case 1:
								for (var j in data.Questions[i].Answer)
								{
									questionStr+='<dd><input name="Question_'+data.Questions[i].Id+'" id="Question_'+data.Questions[i].Id+'_'+data.Questions[i].Answer[j].Id+'" type="checkbox" value="'+data.Questions[i].Answer[j].Id+'"><label for="Question_'+data.Questions[i].Id+'_'+data.Questions[i].Answer[j].Id+'">'+data.Questions[i].Answer[j].Title+'</label></dd>';
								}
								break;
							case 2:
								questionStr+='<dd><input name="Question_'+data.Questions[i].Id+'_Input" type="text" value=""></dd>';
								break;
						}
						questionStr+='</dl></dt>';
					}
					questionStr+='<div class="button"><a href="javascript:;" id="showresult" class="bule">查看统计结果</a><button type="button" class="jg" id="submit_form">提交</button></div></form></div></div>';
				}
				function showresult() {
					resultStr+='<div class="pollModule"><div class="titleBar" id="surveyTitle"><h3>'+data.Title+'</h3>（调查结果）</div>';
					resultStr+='<div id="surveyBody" class="tpResault">';
					for (var i in data.Questions)
					{
						if(data.Questions[i].Type==0 || data.Questions[i].Type==1){
							resultStr+='<dl><dt>'+data.Questions[i].Title+'</dt>';
							for (var j in data.Questions[i].Answer)
							{
								resultStr+='<dd><div class="tpQ">'+data.Questions[i].Answer[j].Title+'</div><div class="tpA"><div class="tpBar"><div class="persent'+j+'" style="width:'+data.Questions[i].Answer[j].Percentage+'%;"></div></div><div class="perNum">'+data.Questions[i].Answer[j].Count+'<span>('+data.Questions[i].Answer[j].Percentage+'%)</span> </div></div></dd>';
							}
							resultStr+='</dl></dt>';
						}
					}
					resultStr+='</div><div class="button"><a href="javascript:;" id="showquestion" class="bule">点击这里参与调查</a></div></div>';
				}
				function submitPoll() {
					var checkform=1;
					var checkforminfo="";
					var qid=0;

					for (var i in data.Questions)
					{
						qid=parseInt(i)+1;
						if (data.Questions[i].IsRequired)
						{

							switch(data.Questions[i].Type){
							case 0:
								if (!$("input[name='Question_"+data.Questions[i].Id+"']:radio:checked").val())
								{
									checkform=0;
									checkforminfo+="请完成第"+qid+"题\n"
								}
								break;
							case 1:
								if (!$("input[name='Question_"+data.Questions[i].Id+"']:checkbox:checked").val())
								{
									checkform=0;
									checkforminfo+="请完成第"+qid+"题\n"
								}
								break;
							case 2:
								if ($("input[name='Question_"+data.Questions[i].Id+"_Input']").val()=="")
								{
									checkform=0;
									checkforminfo+="请完成第"+qid+"题\n"
								}
								break;
							}
						}

					}
					if (checkform==1)
					{
						$.post("http://api.cms.familydoctor.com.cn/Survey/Process/"+pid+"?callback=",$("#surveyform").serialize(),
						function(data,status){
							if (data.Msg=="提交成功")
							{
								$('#surveyform')[0].reset();
								alert("提交成功，感谢参与！");
								resultStr='';
								showresult();
								$("#pollarea").html(resultStr);
							}
							else {
								alert(data.Msg);
							}
						});
					}
					else
					{
						alert(checkforminfo);
					}
				}
				var status=0;
				var questionStr='';
				var resultStr='';
				if (data.SysDate>=data.StartDate && data.SysDate<=data.EndDate)
				{
					status=1;
				}
				else if (data.SysDate>data.EndDate)
				{
					status=-1;
				}
				if (data.Status==1 || status==1)
				{
					showquestion();
					$("#pollarea").html(questionStr);
				}
				else if (data.Status==-1 || status==-1)
				{
					showresult();
					$("#pollarea").html(resultStr);
				}
				$(document).on("click", "#showquestion", function(){
					questionStr=''
					showquestion();
					$("#pollarea").html(questionStr);
				});
				$(document).on("click", "#showresult", function(){
					resultStr='';
					showresult();
					$("#pollarea").html(resultStr);
				});
				$(document).on("click", "#submit_form", function(){
					submitPoll();
				});
			}
		},
		error: function() {	},
	});
}
<script>
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