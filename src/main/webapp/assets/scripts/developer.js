/**
 * Created by dany on 2016/7/31.
 */
define(function(require, exports, module) {
    require('jquery');
    require('./bootstrap/bootstrap.min.css');
    require('../css/header.css');
    require('../css/visual-index.css');
    require('../css/developer.css');
    $(function() {
        var main = Document.getElementById('main');
        DVL.horizChart(main, data);
    })
})