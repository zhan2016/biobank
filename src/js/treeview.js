// Import LESS or CSS:
require('jquery.fancytree/dist/modules/jquery.fancytree.edit');
require('jquery.fancytree/dist/modules/jquery.fancytree.filter');
require('jquery.fancytree/dist/modules/jquery.fancytree.glyph');
import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less';
import  {loadData} from "./loadData";
import {setupTableViewer} from './tableViewer';
import  {exportExcel,exportPng} from './exportTable';
const datasource = require('../configure/ajax-tree-products');
const $ = require('jquery');
const fancytree = require('jquery.fancytree');


function logEvent(event, data, msg){
    msg = msg ? ": " + msg : "";
    $.ui.fancytree.info("Event('" + event.type + "', node=" + data.node + ")" + msg);
}

$(function(){
    // Initialize Fancytree
    $("#tree").fancytree({
        extensions: ["glyph"],
        checkbox: false,
        selectMode: 3,
        glyph: {
            preset: "awesome4",
            map: {}
        },
        source: datasource,
        lazyLoad: function(event, ctx) {
            ctx.result = {url: "ajax-sub2.json", debugDelay: 1000};
        },
        click: function(event, data) {
            var node = data.node;
            if (node.title === "标本查询")
            {
                setupTableViewer();
                loadData();
                return false;
            }
            if(node.title === "导出png")
            {
                exportPng();
                return false;
            }

            //if
            // return false to prevent default behavior (i.e. activation, ...)
            //return false;
        }
    });
});