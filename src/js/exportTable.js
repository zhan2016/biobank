const html2canvas = require('html2canvas/dist/html2canvas.min');
function  exportPng() {
        html2canvas($('#specimens').get(0)).then(function (canvas) {
            console.log("about to render table to png");
            var saveAs = function(uri, filename) {
                var link = document.createElement('a');
                if (typeof link.download === 'string') {
                    document.body.appendChild(link); // Firefox requires the link to be in the body
                    link.download = filename;
                    link.href = uri;
                    link.click();
                    document.body.removeChild(link); // remove the link when done
                } else {
                    location.replace(uri);
                }
            };

            var img = canvas.toDataURL("image/png"),
                uri = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
            saveAs(uri, 'tableExport.png');
        });
}
function exportExcel() {
    
}

export {
    exportExcel,
    exportPng
}