import dt from 'datatables.net';
const tableFields = require("../configure/tableFileds");
function  loadData() {
    console.log("about to send ajax request");
    $.ajax({
        type:"GET",
        url:"testdata.json",
        contentType: "text/plain",
        success:function (data) {
            console.log(data);
            var table = $('#specimens').DataTable();
            data.forEach(function (patient) {
                table.row.add(patient).draw();
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

}

export {
    loadData
}