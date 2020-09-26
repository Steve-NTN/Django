
// Biến xác nhận có đang di chuyển thông báo hay không
var isMovingNotice = false;
// Biến chỉ số trang hiện tại
var indexPageProduct = 1;
// Biến số dòng trên 1 trang
var rowOnPageProduct = 50;
// Biến tổng số trang
var totalPageProduct = 0;
// Biến xác nhận đang thêm, sửa, xóa
var selectMode = 0;
// Mã sản phẩm đang chọn
var productId = "";
// Mã sản phẩm đang chỉnh sửa
var productIdEdit = "";
// Biến xác nhận đang sửa thông tin hay không
var isEditing = false;

var pr = null;

$(document).ready(function (e) {
    product = new Product();

});

class Product {
    constructor() {
        pr = this;
        pr.initEvent();
        pr.getDataProduct();        
    };

    initEvent() {
        $("#product-price").on("keyup", this.pressPrice);
        $("table").on("click", "tbody tr", clickOnRow);
        $("#product-input-photo").on("change", this.changeImage);
        $("#product-button-delphoto").click(function () { $("#product-photo").attr("src", "../static/images/productDefault.gif") })
        $("#product-button-close").click(this.back);
        $("#product-button-delete").click(this.deleteProduct);
        $("#product-button-edit").click(this.editProduct);
        $(".notice-content").on("mousedown", moveNotice);
        $("#product-button-add").click(this.addProduct);
        $("#product-code").on("keyup", pressNumber);
        $("#page-first").click(firstPage);
        $("#page-pre").click(prePage);
        $("#page-next").click(nextPage);
        $("#page-last").click(lastPage);
        $("#notice-button-cf").click(this.clickCfNotice);
        $("#rowOnPageProduct").change(function () { changerowOnPageProduct(); pr.getDataProduct() });
    }

    /**
     * Thêm sản phẩm
     * */
    addProduct() {
        selectMode = 1;
        var product = pr.getProductInput();
        if (pr.checkAddProduct(product)) {
            $.ajax({
                url: "../api/products",
                method: "POST",
                data: JSON.stringify(product),
                dataType: "json",
                contentType: "application/json"
            }).done(function (response) {
                $(".notice-main-text").text("Thêm sản phẩm thành công");
                pr.getDataProduct();
                displayNotice();
            }).fail(function (response) {
                debugger
            });
            clearInput();
        }
        else {
            $(".notice-main-text").text("Phải điền đầy đủ thông tin sau: mã hàng, đơn giá");
            displayNotice();
        }
    }

    /**
     * Kiểm tra sản phẩm thêm vào có hợp lệ không
     * @param {any} product
     */
    checkAddProduct(product) {
        if (product.productCode == "" || product.productPrice == "") {
            return false;
        }
        return true;
    }

    /**
     * Sửa sản phẩm
     * */
    editProduct() {
        selectMode = 2;       
        // Kiểm tra ở trạng thái sửa hay không
        if (!isEditing) {
            if (countRowSelected() == 0) {
                $(".notice-main-text").text("Chưa chọn sản phẩm");
                displayNotice();
            } else {
                if (countRowSelected() == 1) {
                    productId = $(".row-clicked").data("id");
                    productIdEdit = productId;
                    $.ajax({
                        url: "../api/products/" + productId,
                        method: "GET"
                    }).done(function (response) {
                        pr.showInfoEditProduct(response);
                        isEditing = true;
                    }).fail(function (response) {
                        debugger
                    });
                } else {
                    $(".notice-main-text").text("Chỉ được sửa một sản phẩm");
                    displayNotice();
                }
            }
        } else {
            var product = pr.getProductInput();
            product.productId = productIdEdit;
            $.ajax({
                url: "../api/products/" + productIdEdit,
                method: "PUT",
                data: JSON.stringify(product),
                dataType: "json",
                contentType: "application/json"
            }).done(function (response) {
                $(".notice-main-text").text("Chỉnh sửa sản phẩm thành công");
                displayNotice();
                pr.getDataProduct();
                isEditing = false;
            }).fail(function (response) {
                debugger
            });
        }
        
    }


    /**
     * Xóa sản phẩm
     * */
    deleteProduct() {
        selectMode = 3;
        if (countRowSelected() == 0) {
            $(".notice-main-text").text("Chưa chọn sản phẩm");
            displayNotice();
        } else {
            if (countRowSelected() == 1) {
                $(".notice-main-text").text("Bạn có chắc chắn muốn xóa sản phẩm này không?");               
            } else {
                $(".notice-main-text").text("Bạn có chắc chắn muốn xóa nhiều sản phẩm không?");
            }
            displayWarning();
        }       
    }

    /**
     * Nhập số tiền
     * @param {any} e
     */
    pressPrice(e) {
        $("#product-price").val(formatMoney(replaceAllCh($("#product-price").val(), '.', '')));
    }
    /**
     * Lấy dữ liệu sản phẩm từ server
     * */
    getDataProduct() {
        $("#page-index").val(indexPageProduct);       
        $.ajax({
            // + indexPageProduct + "/" + rowOnPageProduct
            url: "/billshop/products",
            method: "GET"
        }).done(function (response) {
            totalPageProduct = response.length % rowOnPageProduct == 0? parseInt(response.length / rowOnPageProduct) : parseInt(response.length / rowOnPageProduct) + 1;
            $("#total-page").text("trên " + totalPageProduct);
            $("#total-product").text("trên " + response.length);
            pr.displayData(response);           
        }).fail(function () {
            debugger
        });
    }

    /**
     * Thêm dữ liệu vào bảng
     * */
    displayData(products) {
        $("#product-table tbody tr").remove();
        $.each(products, function (index, item) {
            var productInfoInput = $(`<tr><td>` + (index + 1) + `</td><td>` + item[`product_code`] + `</td><td>` + item[`product_name`]
                + `</td><td>` + formatMoney(item[`product_price`]) + `</td><td>` + item[`product_desciption`] + `</td></tr>`);
            productInfoInput.data("id", item[`product_id`]);
            $("#product-table tbody").append(productInfoInput);
        });

    }

    /**
     * Thay ảnh mới
     * */
    changeImage() {
        addNewAvatar(this);
    }

    /**
     * Xử lí khi bấm đóng
     * */
    back() {
        optionMode = "1";
        $("#option-mode li").removeClass("option-selected");
        $("#option-mode li[op-mode=1]").addClass("option-selected");
        $("#main-title").text("Danh mục tính tiền");
        $(".main-caculate").siblings().css("display", "none");
        $(".main-caculate").css("display", "");
    }

    /**
     * Kiểm tra đang ở trạng thái thêm, sửa, xóa và xử lí khi bấm nút confirm
     * */
    clickCfNotice() {
        // Trạng thái xóa
        if (selectMode == 3) {
            // Nếu đang chọn 1 hàng
            if (countRowSelected() == 1) {
                productId = $(".row-clicked").data("id");
                $.ajax({
                    url: "../api/products/" + productId,
                    method: "DELETE"
                }).done(function (response) {
                    $(".notice-main-text").text("Xóa sản phẩm mã " + response.productCode + " thành công.");
                    pr.getDataProduct();
                    displayNotice();
                }).fail(function () {
                    debugger
                });
            } else {
                // Nếu đang chọn nhiều hàng
                $.each($(".row-clicked"), function (index, item) {
                    var productId = $(item).data("id");
                    $.ajax({
                        url: "../api/products/" + productId,
                        method: "DELETE"
                    }).done(function (response) {                       
                        pr.getDataProduct();
                        if (index == $(".row-clicked").length - 1) {
                            $(".notice-main-text").text("Xóa các sản phẩm đã chọn thành công.");
                            displayNotice();
                        }
                    }).fail(function () {
                        debugger
                    });
                });
            }
            
        }
    }

    /**
     * Hiển thị thông tin sản phẩm đang chọn sửa
     * @param {any} product
     */
    showInfoEditProduct(product) {
        $("#product-code").val(product.productCode);
        $("#product-name").val(product.productName);
        $("#product-price").val(formatMoney(product.productPrice));
        $("#product-desciption").val(product.productDesciption);
        $("#product-photo").attr("src", product.productPhoto);
    }

    // Trả về đối tượng sản phẩm
    getProductInput() {
        return {
            productCode: $("#product-code").val().trim(),
            productName: $("#product-name").val().trim(),
            productPrice: replaceAllCh($("#product-price").val().trim(), '.', ''),
            productDesciption: $("#product-desciption").val().trim(),
            productPhoto: $("#product-photo").attr("src")
        };
    }
};

/**
 * Bấm vào trang đầu tiên 
 * */
function firstPage() {
    if (indexPageProduct != 1) {
        indexPageProduct = 1;
        pr.getDataProduct();
    }
}

/**
 * Bấm vào trang kế trước
 * */
function prePage() {
    if (indexPageProduct > 1) {
        indexPageProduct--;
        pr.getDataProduct();
    }
}
/**
 * Bấm vào trang tiếp theo
 * */
function nextPage() {
    if (indexPageProduct < totalPageProduct) {
        indexPageProduct++;
        pr.getDataProduct();
    }
}
/**
 * Bấm vào trang tiếp theo
 * */
function lastPage() {
    if (indexPageProduct != totalPageProduct) {
        indexPageProduct = totalPageProduct;
        pr.getDataProduct();
    }
}
