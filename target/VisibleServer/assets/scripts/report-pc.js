/**
 * Created by dany on 2016/8/13.
 */
define(function(require,exports,module){
		require('jquery');
		require('d3');
		require('echarts');
		var session = window.sessionStorage;
		session.setItem("fresh",'false');

		require('./bootstrap/bootstrap.min.css');
		require('../css/header.css');
		require('../css/visual-report.css');
		require('bootstrap');

        var model = require('./model');
        var setlayer = require('./draw-report.js');
        $(function () {
            loadReport();
        })
    function loadReport() {
        var api ='../user/getreportbyid';
        var reportid = '7';
        $.ajax({
            type:'get',
            url: api,
            async: true,
            data: {reportid: reportid},
            dataType:"json",
            jsonp: 'callback',
            crossDomain:true,
            success:function (data) {

                addContent.call($('.report-edit'), data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
            }
        });
    }
    function addContent(data){
        var that = this;
        var report = JSON.parse(data.reportData);
        var desc = report.desc;
        var content = report.content;
        var descHtml = '<div class="edit-des">+
                        '<div class="des-title">'+desc.title+'</div>'+
                        '<p class="des-detail">'+desc.content+'</p>'+
                        '</div>';
        $(that).append(descHtml);
        var conHtml = [];
        for(var i =0; i<content.length;i++){
            var html = '<div class="edit-chart">' +
                '<div class="chart-title">'+cur.title+'<div class="chart-desicon"></div></div>'
                +'<div class="chart-con">'
                +'<div class="chart-con-view" id="view'+cur.viewId+'"></div>'
                +'<div class="chart-con-des">'+cur.describe+'</div>'
                +'</div></div>';
            $(that).html(html);
            $selector = $(this).find('#view'+cur.viewId);//.attr('id');
            setlayer($selector, cur, cur.type, false);
        }
    }

	
});