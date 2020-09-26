// Biến lưu trang hiện tại của hóa đơn
var indexPageBill = 1;
// Biến lưu số dòng trong 1 trang của hóa đơn
var rowOnPageBill = 50;
// Tổng số trang mục hóa đơn
var totalPageBill = 0;

var bl = null;
$(document).ready(function (e) {
    bill = new Bill();

});

class Bill {
    constructor() {
        bl = this;
        bl.initEvent();
        //bl.getDataBill();
    };

    initEvent() {

    }

    /**
     * Lấy dữ liệu sản phẩm từ server
     * */
    // getDataBill() {
    //     $("#page-index").val(indexPageBill);
    //     $.ajax({
    //         url: "../api/bills/" + indexPageBill + "/" + rowOnPageBill,
    //         method: "GET"
    //     }).done(function (response) {
    //         totalPageBill = response[`item1`] % rowOnPageBill == 0 ? parseInt(response[`item1`] / rowOnPageBill) : parseInt(response[`item1`] / rowOnPageBill) + 1;
    //         $("#total-page").text("trên " + totalPageBill);
    //         $("#total-product").text("trên " + response[`item1`]);
    //         bl.displayDataBill(response[`item2`][`result`]);
    //     }).fail(function () {
    //         debugger
    //     });
    // }

    /**
     * Thêm dữ liệu vào bảng
     * */
//     displayDataBill(bills) {
//         $("#bill-table tbody tr").remove();
//         $.each(bills, function (index, item) {
//             var billInfoInput = $(`<tr><td>` + (index + 1) + `</td><td>` + item[`billCode`] + `</td><td>` + formatDate(item[`billCreateDay`])
//                 + `</td><td>` + formatMoney(item[`billTotal`]) + `</td><td>` + item[`billDesciption`] + `</td></tr>`);
//             billInfoInput.data("id", item[`billId`]);
//             $("#bill-table tbody").append(billInfoInput);
//         });

//     }
// }