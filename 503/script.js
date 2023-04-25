/** 
* @file Implements additional custom JS to supplenent WET/GCWeb
* @author ContactWeb <contactweb@pc.gc.ca>
* @version 1.5
* @changelog 1.5 - Purged all but core functionality as additional JS will now be included on relevant pages via HTML block includes.
*/

const docLang = document.documentElement.lang; //Save document language for localization use

$(document).on("wb-ready.wb", function (event) {
    if ($("#sec-pnl").find("a[href*='" + $(location).attr('pathname') + "']").length > 0) {
        if ($("#sec-pnl").find("details").length > 0) {
            $($("#sec-pnl").find("details")[0]).attr("open", "open");
        }
    }
});

//Show and Hide items on mobile menu

$(document).ready(function () {
    $('section.feature-set div.thumbnail').matchHeight();

    $('#menu-btn').on("click", function () {
        $("#mb-pnl .srch-pnl").addClass('hide');
        $("#mb-pnl #sm-pnl").removeClass('hide');
        $("#mb-pnl #info-pnl").removeClass('hide');
    });
    $('#search-btn').on("click", function () {
        $("#mb-pnl #sm-pnl").addClass('hide');
        $("#mb-pnl #info-pnl").addClass('hide');
        $("#mb-pnl .srch-pnl").removeClass('hide');
    });
});




