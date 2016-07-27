define(function(require, module, exports) {
	require('jquery');

	require('./bootstrap/bootstrap.min.css');
	require('../css/header.css');
	require('../css/login.css')

	function getverifycode(){  
	    var i = parseInt(10 * Math.random());  
	    var j = parseInt(10 * Math.random()); 
	    var opt = randomOpt();
	    $("#validate").html('<span style="color:'+getRandomColor()+'">' + i +'</span><span style="color:'+getRandomColor()+'">'+ opt +'</span><span style="color:'+getRandomColor()+'">'+ j + '</span>=');  
	    if(opt == "+"){
	        return i+j;
	    }else if(opt == "-"){
	        return i-j;
	    }else if(opt == "*"){
	        return i*j;
	    }
	}
	          
	function getverifycodeChange(){  
	    var i = parseInt(10 * Math.random());  
	    var j = parseInt(10 * Math.random());  
	    var opt = randomOpt();
	    $("#validate").html('<span style="color:'+getRandomColor()+'">' + i +'</span><span style="color:'+getRandomColor()+'">'+ opt +'</span><span style="color:'+getRandomColor()+'">'+ j + '</span>=');  
	    if(opt == "+"){
	        return i+j;
	    }else if(opt == "-"){
	        return i-j;
	    }else if(opt == "*"){
	        return i*j;
	    }
	}
	var getRandomColor = function(){   
	    return (function(m,s,c){   
	    return (c ? arguments.callee(m,s,c-1) : '#') +   
	      s[m.floor(m.random() * 16)]
	    })(Math,'0123456789abcdef',5);
	} 
	var randomOpt = function () {
	    var arr = ['+', '-', '*'];
	    return arr[randomInt()];
	}
	var randomInt = function(){
	    var arr=Math.random()*10;
	    return parseInt(arr%3);
	};
	$(window).resize(function() {
	    var winWidth = 0;
	    var winHeight = 0;
	    //获取窗口宽度
	    if (window.innerWidth)
	        winWidth = window.innerWidth;
	    else if ((document.body) && (document.body.clientWidth))
	        winWidth = document.body.clientWidth;
	    //获取窗口高度
	    if (window.innerHeight)
	        winHeight = window.innerHeight;
	    else if ((document.body) && (document.body.clientHeight))
	        winHeight = document.body.clientHeight;
	    //通过深入Document内部对body进行检测，获取窗口大小
	    if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth){
	        winHeight = document.documentElement.clientHeight;
	        winWidth = document.documentElement.clientWidth;
	    }
	    //console.log(winHeight);
	   // $(".main").height(winHeight-160);
	    // if((winWidth/(winHeight-160))<(1346/681)){
	    //     $(".login-img").height(winHeight-160);
	    // }
	});
	$(function(){
		var winWidth = 0;
	    var winHeight = 0;
	    //获取窗口宽度
	    if (window.innerWidth)
	        winWidth = window.innerWidth;
	    else if ((document.body) && (document.body.clientWidth))
	        winWidth = document.body.clientWidth;
	    //获取窗口高度
	    if (window.innerHeight)
	        winHeight = window.innerHeight;
	    else if ((document.body) && (document.body.clientHeight))
	        winHeight = document.body.clientHeight;
	    //通过深入Document内部对body进行检测，获取窗口大小
	    if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth){
	        winHeight = document.documentElement.clientHeight;
	        winWidth = document.documentElement.clientWidth;
	    }
	    //console.log(winHeight);
	    // $(".main").height(winHeight-160);
	    // if((winWidth/(winHeight-160))<(1346/681)){
	    //     $(".login-img").height(winHeight-160);
	    // }
	})
	$(function(){
	    
	    var validateNum=getverifycode();
	    $("#validate").click(function(){
	        validateNum=getverifycodeChange();
	    });
	    $(".validate-text").click(function(){
	        validateNum=getverifycodeChange();
	    });
	    $(".login-button").click(function(){
	        var validateSelf=$("#validateSelf").val();
	        if(validateSelf!=validateNum){
	            alert("验证码输入错误!");
	            validateNum=getverifycodeChange();
	            return false;
	        }else{
	            var name=$("#name").val();
	            var pass=$("#pass").val();
	            var datatosend={
	                "username":name,
	                "password":pass
	            };
	            ajaxInit("GET","mobile/login/user",datatosend,function(data){
	                //console.log(data.map.id);
	                var base=new Base64();
	                var pass=base.encode(datatosend.password);
	                var name=base.encode(datatosend.username);
	                var code=base.encode("var pass='"+pass+"';var name='"+name+"'");
	                //window.location.href="infoModel.html?code="+code;
	            });
	             window.location.href = 'visual-index';
	        }
	    });
	});
	var ajaxInit=function(type,url,datatosend,callback){
	    $.ajax({
	        type:type,
	        url:url,
	        async:true,
	        data:datatosend,
	        dataType:"json",
	        crossDomain:true,
	        success:function (data) {
	            if(data.result=="success"){
	                //console.log(data);
	                if (typeof (callback) == 'function') {
	                    callback(data);
	                }
	            }else{
	                alert(data.detail);
	            }
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	            console.log(url);
	            console.log(XMLHttpRequest.status);
	            console.log(XMLHttpRequest.readyState);
	            console.log(textStatus);
	        }
	    });
	};



});