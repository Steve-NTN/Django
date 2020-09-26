var optionMode = "1";
// Khởi tạo biến tính toán
var cal = null;
var pt = null;
$(document).ready(function (e) {
    caculate = new Caculate();
});

class Caculate {
    constructor() {
        cal = this;
        this.initCommonInfo();
        this.initEvent();
    };

    initEvent() {
        $("#head-menu, #head-menu-text").click(this.clickMenu);
        $("#option-mode li").click(clickOption);
        $("#notice-button-dl").click(closeNotice);
        $("#caculate-quatity, #caculate-code").keyup(pressNumber);
        $("#caculate-sale").keyup(cal.pressSale);
        $("#caculate-sale, #caculate-quatity, #caculate-code").keypress(cal.pressEnterCaculate);
        $("#table-main").on("dblclick", "tbody tr", dblClickOnRow);
        $("#table-main tbody").on("change", function () { alert() });
    }

    /**
     * Ẩn hiện menu
     * @param {any} e
     */
    clickMenu(e) {
        var showMainLeft = $(".main-left").toggle().is(":visible");
        if (showMainLeft)
            $(".main-right").css("width", "calc(100% - 200px)");
        else
            $(".main-right").css("width", "100%");
    }

    /**
     * Khởi tạo thông tin chung của bảng tính tiền
     * */
    initCommonInfo() {
        $("#bill-date").val(getToday());
        $("#caculate-quatity").val(1);
        $("#caculate-sale").val(0);
        $("#caculate-sum").val(0);
    }

    /**
     * Nhập tiền giảm giá
     * */
    pressSale() {
        $("#caculate-sale").val(formatMoney(replaceAllCh($("#caculate-sale").val(), '.', '')));
    }


    /**
     * Nhấn enter vào bảng tính
     * @param {any} e
     */
    pressEnterCaculate(e) {
        if (e.which == 13) {
            cal.getProductByCode($("#caculate-code").val())
            
        }
    }

    /**
     * Nhận 1 đối tượng sản phẩm và hiển thị lên bảng tính
     * @param {any} caculate
     */
    addProductIntoTable(caculate) {
        var index = $("#table-main tr").length
        var productInfoInput = $(`<tr><td>` + index + `</td><td>` + caculate[`productCode`] + `</td><td>` + caculate[`productName`] + `</td><td>` + caculate[`productQuatity`]
            + `</td><td>` + formatMoney(caculate[`productPrice`]) + `</td><td>` + formatMoney(caculate[`productSale`]) + `</td><td>` + formatMoney(caculate[`caculateTotal`]) + `</td></tr>`);
        $("#table-main tbody").append(productInfoInput);
    }

    /**
     * Lấy ra sản phẩm với mã vạch
     * @param {any} code
     */
    getProductByCode(code) {
        $.ajax({
            url: "../api/products/searchCode/" + code,
            method: "GET",
        }).done(
            function (response) {
                pt = response[0];
                var caculate = {
                    productCode: $("#caculate-code").val(),
                    productQuatity: $("#caculate-quatity").val(),
                    productSale: $("#caculate-sale").val(),
                    productName: pt.productName,
                    productPrice: pt.productPrice,
                };
                var caculateTotal = parseInt(caculate.productQuatity) * parseInt(pt.productPrice) - parseInt(replaceAllCh(caculate.productSale, '.', ''));
                caculate.caculateTotal = caculateTotal;
                cal.addProductIntoTable(caculate);
                $("#caculate-name").val(pt.productName);
                $("#caculate-price").val(formatMoney(pt.productPrice));
                $("#caculate-total").val(formatMoney(caculateTotal));
                $("#caculate-sum").val(formatMoney(parseInt(replaceAllCh($("#caculate-sum").val(), ".", "")) + parseInt(replaceAllCh(caculateTotal, ".", ""))));
                                
            }
        ).fail(
            function () { debugger });
    }

    

};

/**
 * Trả về tổng 1 cột của 1 bảng
 * @param {any} tableName
 * @param {any} indexColumn
 */
function getSumInColumn(tableName, indexColumn) {
    var sum = 0;
    $.each($("#" + tableName + " tbody tr"), function (index, item) {
        sum += parseInt(replaceAllCh($($(item).children()[indexColumn]).text(), ".", ""));
    });
    return sum;
}

