function set_theme(theme) {
    $('link[title="main"]').attr('href', theme);
}

/* When a theme-change item is selected, update theme */
jQuery(function ($) {
    $('body').on('click', '.change-style-menu-item', function () {
        var theme_name = $(this).attr('rel');
        var theme = "assets/css/bootstrap.min." + theme_name + ".css";
        localStorage.theme = theme;
        set_theme(theme);
    });
});

function GetCurrentTheme() {
    return localStorage.theme;
}


function setContrast(item) {
    var rgb = $(item).css("background-color");
    var brightness = Math.round(((parseInt(rgb[0]) * 299) +
        (parseInt(rgb[1]) * 587) +
        (parseInt(rgb[2]) * 114)) / 1000);
    var textColour = (brightness > 125) ? 'black' : 'white';
    var backgroundColour = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    $(item).css('color', textColour);
    $(item).css('background-color', backgroundColour);
}

function chnColor() {
    $(p).each(function () {
        var str = this.html();
        str = str.replace(/=/g, '<span style="color:green;">=</span>');
        this.html(str);
    })(jQuery);
}


var cur_version = 0;
var allversions = 0;



jQuery(function ($) {
    $('body').on('click', '.change-version', function () {
        var vername = $(this).attr('rel');
        SelectVersion(vername);
    });
});


function GetInfoFile(version, name) {
    version = version.replaceAll('.', '');
    return "assets/data/" + version + "/" + name;
}


function SelectVersion(vername) {

    $('.download-vname').text("Toba v" + vername + " download");

    jQuery.get(GetInfoFile(vername, "windowsnote"), function (data) {
        $('#windowsnote').html(data);
    });
    jQuery.get(GetInfoFile(vername, "linuxnote"), function (data) {
        $('#linuxnote').html(data);
    });
    jQuery.get(GetInfoFile(vername, "applenote"), function (data) {
        $('#applenote').html(data);
    });
    jQuery.get(GetInfoFile(vername, "releasenote"), function (data) {
        $('#releasenote').html(data);
    });

}

function BuildDownloadVersion() {
    for (var i = 0; i < allversions.length; i++) {
        var vername = allversions[i];
        if (vername == "") {
            continue;
        }
        $('#version-list').append(
            '<a class="dropdown-item change-version" rel="' + vername + '" href="#!">' + vername + '</a>')


    }
}

function InitCurrentVersion() {
    $('#tobasite-version').text("v" + cur_version);
    SelectVersion(cur_version);
}


$(document).ready(function () {

    var theme = GetCurrentTheme();
    if (theme) {
        set_theme(theme);
    } else {
        set_theme("assets/css/bootstrap.css");
    }



    jQuery.get("assets/data/version", function (data) {
        cur_version = data;
        jQuery.get("assets/data/allversions", function (data) {
            allversions = data.split("\n");
            InitCurrentVersion();
            BuildDownloadVersion();

        });
    });




});
