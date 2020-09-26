// Xử lí khi click tùy mục
function clickOption(e) {
    optionMode = $(this).attr("op-mode");
    $(this).addClass("option-selected");
    $(this).siblings().removeClass("option-selected");
    if (optionMode == 1) {
        $("#main-title").text("Danh mục tính tiền");
        $(".main-caculate").siblings().css("display", "none");
        $(".main-caculate").css("display", "");
    }
    else {
        $(".main-product").siblings().css("display", "none");
        $(".main-product").css("display", "");
        if (optionMode == 2) {
            $("#main-title").text("Danh mục sản phẩm");
            $(".main-product .product-info").css("display", "");
            $(".main-product .bill-info").css("display", "none")
            $("#product-table").siblings().css("display", "none");;
            $("#product-table").css("display", "");
        }
        if (optionMode == 3) {
            $("#main-title").text("Danh mục hóa đơn");
            $(".main-product .product-info").css("display", "none");
            $("#bill-table").siblings().css("display", "none");
            $("#bill-table").css("display", "");
            $(".main-product .bill-info").css("display", "");
        }
    }

}

//Xử lí lúc nhập tiền
function formatMoney(amount) {
    try {
        var decimalCount = 0;
        var decimal = ".";
        var thousands = ".";
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

/**
 * replace all a charactor in text
 * @param {any} text
 * @param {any} removeCh
 * @param {any} insertCh
 */
function replaceAllCh(text, removeCh, insertCh) {
    var predictText = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i] == removeCh)
            predictText += insertCh;
        else
            predictText += text[i]
    }
    return predictText;
}

// Xử lí click 1 hoặc nhiều hàng trong bảng
function clickOnRow(e) {
    if (e.ctrlKey) {
        // Khi click vào dòng chưa chọn sẵn
        if (!$(this).hasClass("row-clicked")) {
            $(this).addClass("row-clicked");
        }
        else {
            $(this).removeClass("row-clicked");
        }
    }
    else {
        if ($(this).hasClass("row-clicked")) {
            if ($(".row-clicked").length > 1)
                $(this).siblings().removeClass("row-clicked");
            else
                $(this).removeClass("row-clicked");
        } else {
            this.classList.add("row-clicked");
            $(this).siblings().removeClass("row-clicked");
        }
    }

}

// Xử lí double click 1 hàng trong bảng
function dblClickOnRow(e) {
    $.each($(this).siblings(), function (index, item) {
        $($(item).children()[0]).html(index + 1);
    });
    $(this).remove();  
}

/**
 * Xử lí khi bấm vào thêm ảnh
 * @param {any} e
 */
function addNewAvatar(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#product-photo').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * Xử lí khi click bấm đóng thông báo
 * */
function closeNotice() {
    $(".main-notice").css("display", "none");
}

/**
 * Hiện thông báo
 * */
function displayNotice() {
    $("#notice-title").text("Thông báo");
    $("#notice-button-cf").css("display", "none");
    $(".notice-main-icon").css("background", "url('../css/Contents/images/notice.png') no-repeat");
    $(".main-notice").css("display", "flex");
}
/**
 * Hiện cảnh báo
 * */
function displayWarning() {
    $("#notice-title").text("Cảnh báo");
    $("#notice-button-cf").css("display", "");
    $(".notice-main-icon").css("background", "url('../css/Contents/images/warning.png') no-repeat");
    $(".main-notice").css("display", "flex");
}

/**
 * Ẩn thông báo
 * */
function hiddenNotice() {
    $(".main-notice").css("display", "none");
}

/**
 * Xóa text trong input
 * */
function clearInput() {
    $(".product-info input, .product-info textarea").val("");
}

/**
 * Di duyển thông báo khi kéo thả
 * @param {any} e
 */
function moveNotice(e) {
    $("document body").append($('.notice-content'));
    document.addEventListener('mousemove', onMouseMove);
    $('.notice-content').on("mouseup", function () {
        document.removeEventListener('mousemove', onMouseMove);
        $('.notice-content').on("mouseup", null);
    });
    $('.notice-content').on("dragstart", function () { return false });
};

/**
 * Chuyển thanh thông báo vào chính giữa trỏ chuột
 * @param {any} pageX
 * @param {any} pageY
 */
function moveAt(pageX, pageY) {
    $('.notice-content').css({
        left: pageX - parseInt($('.notice-content').css("width").split("px")[0]) / 2 + 'px',
        top: pageY - parseInt($('.notice-content').css("height").split("px")[0]) / 5 + 'px'
    });
}

function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
}

/**
 * Nhập mã vạch
 * @param {any} e
 */
function pressNumber(e) {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
}

/**
 * Đếm số dòng đang chọn
 * */
function countRowSelected() {
    return $(".row-clicked").length;
}

/**
 * Thay đổi số dòng trên 1 trang
 * */
function changeRowOnPage() {
    rowOnPage = parseInt($("#rowOnPage").val());
}

/**
 * Lấy ra ngày hiện tại
 */
function getToday() {
    var today = new Date();
    var day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    var month = today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
    return today.getFullYear() + "-" + month + "-" + day;
}

/**
 * Định dạng ngày tháng của đối tượng datetime
 * @param {any} datetime
 */
function formatDate(datetime) {
    var day = datetime.split("T")[0].split("-")[2];
    var month = datetime.split("T")[0].split("-")[1];
    var year = datetime.split("T")[0].split("-")[0];
    return day + "-" + month + "-" + year;
}

