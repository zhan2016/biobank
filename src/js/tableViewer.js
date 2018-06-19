import dt from 'datatables.net';
import jszip from 'jszip';
require( 'datatables.net-buttons' );
var isInt = false;
function setupTableViewer() {
    if (isInt)
    {
        //已经初始化，无需初始化
        return;
    }
     var html = '<table id="specimens">' + '<thead>' + '<tr>';
     var tablesFileds = require('../configure/tableFileds');
    tablesFileds.forEach(function(table) {
        html += '<th>' + table.tableHead + '</th>';
    });
    html += '</tr></thead>';
    html+='<tbody id="tableBody"></tbody>'
    html += '</table>';
    console.log(html);
    $('#viewer').append(html);
    var language = {
        "processing": "<img src='loading-spinner-grey.gif'/><span>&nbsp;&nbsp;"+"处理中..."+"</span>",
        "lengthMenu": "每页 _MENU_ 条结果",
        "zeroRecords": "没有匹配结果",
        "info": "<span class='seperator'>  </span>" + "总共找到 _TOTAL_ 条结果",
        "infoFiltered": " (从所有 _MAX_ 条记录中得到)",
        "infoEmpty": "共 0 项",
        "emptyTable": "表中数据为空",
        "paginate": {
            "previous": "前页",
            "next": "下页",
            "first": "第一页  ",
            "last": "  尾页"
        }
    };
    var columns=[];
    tablesFileds.forEach(function (table) {
        var column = {};
        column["data"] = table.FieldName;
        column["name"] = table.FieldName;
        column["orderable"] = true;
        columns.push(column);

    });
    $('#specimens').DataTable({
        pageLength: 10,
        language:language,
        paging: true,
        searching: true,
        order: [[0, "asc"]],
        columns: columns,
        columnDefs: [{ orderable: false, targets: [5] }], // 6 was the highest index, not 7
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Save current page',
                exportOptions: {
                    modifier: {
                        page: 'all'
                    }
                }
            }
        ]
    });
    isInt = true;
}
export {
    setupTableViewer
}