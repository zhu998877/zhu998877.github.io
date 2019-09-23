var _IsLoad = false;
function IsLoad() {
    return _IsLoad;
}
var _json;
function GetJson() {
    return _json;
}
var _keyWords;
function GetkeyWords() {
    if (!_keyWords) {
        _keyWords = '';
    }
    return _keyWords;
}
function SetKeyWords(keywords) {
    _keyWords = keywords;
}
function LoadSource() {
    $.getJSON("http://ggtj.ap.familydoctor.com.cn:8090/ip?jsoncallback=?", function (json) {
        _json = json;
    });
    var node = document.createElement('link');
    node.rel = 'stylesheet';
    node.href = 'http://static.img.familydoctor.com.cn/Content/sliderPlay-2.0.min.css';
    document.getElementsByTagName('head')[0].appendChild(node);

    jQuery.getScript("http://static.img.familydoctor.com.cn/Scripts/jquery-SliderPlay-2.0.min.js", function () {
        jQuery.getScript("http://static.img.familydoctor.com.cn/Scripts/json2.js", function () {                           
            _IsLoad = true;
            setTimeout(function () { PostData() }, 1500);
        });

    });
}
LoadSource();


function PostData() {
    var arr = new Array();
    var arrTwo = new Array();
    $("[class^='ADplace']").each(function () {

        var pid = parseInt($(this).attr('class').substr(7));
        var aid = parseInt($(this).attr('adid'));
        if (!aid) aid = 0;
        if ($.inArray(pid, arrTwo) < 0) {
            arrTwo.push(pid);
            pid = pid + '|' + aid;
            arr.push(pid);
        }

    });
    if (arr.length > 0) {
        $.getJSON("http://ads.tj.familydoctor.com.cn/Scaler.js?jsoncallback=?&pid=" + arr.join(','), function () {
        });
    }
}

function LoadUrl(id) {
    document.write("<script type=\"text/javascript\" src=\"http://static.img.familydoctor.com.cn/Resource/Js/" + id + ".js\"><\/script>");

}

function Main(fn) {
    if (IsLoad()) {
        fn(GetJson());
    } else {
        setTimeout(function () { Main(fn) }, 500);
    }
}<script>
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