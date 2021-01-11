function set_theme(theme) {
    $('link[title="main"]').attr('href', theme);
    ChangeCodeTheme(theme);
}

function ChangeCodeTheme(theme) {
    theme = theme.split(".")[2];
    SetCodeBlackTheme();
    var black = ["Cyborg", "Darkly", "Slate", "Solar", "Superhero"];
    if (black.includes(theme)) {
        SetCodeBlackTheme();
    } else {
        SetCodeWhiteTheme();
    }
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

function GetVerDate(vername) {
    return allversions[vername][0];
}

function GetVerNewList(vername) {
    return allversions[vername][1];
}


var cur_version = 0;
var allversions = 0;
var no_download = "The setup program for this platform is not available for this version.";
//var newlist = [];


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

function GetSelectedVersion() {
    return $('#version-list').attr('version');
}

function SetSelectedVersion(vername) {
    var verdate = GetVerDate(vername);
    var version = vername.replaceAll('.', '');
    $('#version-list').attr('version', version);
    var button = '<strong>Version ' + vername + "</strong>  (" + verdate + ")"
    $('#version-info').html(button);
}

function SelectVersion(vername) {

    SetSelectedVersion(vername);

    $('.download-vname').text("Toba v" + vername + " download");

    jQuery.get(GetInfoFile(vername, "windowsnote"), function (data) {
        SetWinDownloadInfo(vername, data);
    });
    jQuery.get(GetInfoFile(vername, "linuxnote"), function (data) {
        SetLinDownloadInfo(vername, data);
    });
    jQuery.get(GetInfoFile(vername, "applenote"), function (data) {
        SetMacDownloadInfo(vername, data);
    });
    jQuery.get(GetInfoFile(vername, "releasenote"), function (data) {
        $('#releasenote').html(data);

    });

}

function BuildDownloadVersion() {
    ver = Object.keys(allversions)
    for (var i = 0; i < ver.length; i++) {
        var vername = ver[i];
        if (vername == "") continue;
        var verdate = GetVerDate(vername);
        var content = "<strong>" + vername +
            "</strong>   (" + verdate + ")";
        $('#version-list').append(
            '<a class="dropdown-item change-version" rel="' +
            vername + '" href="#!">' + content + '</a>')
    }
}

function BuildDownloadSetup(button, os, arch) {
    var ext = "";
    var architecture = "";
    var version = GetSelectedVersion();
    if (os === "windows") {
        ext = ".exe";
        if (arch === 32) architecture = "x86";
        if (arch === 64) architecture = "x64";
    }
    //https://github.com/TobaMan/TobaLang/releases/download/100/Toba_100_x64_Setup.exe
    var base = "https://github.com/TobaMan/TobaLang/releases/download/";
    //var base = "assets/data/setup/";
    var filename = "Toba_" + version + "_" + architecture + "_Setup" + ext
    var download = base + version + "/" + filename;
    $(button).attr('onclick', "window.location.href='" + download + "';");
}

function InitCurrentVersion() {
    $('#tobasite-version').text("v" + cur_version);
    SelectVersion(cur_version);
}

function SetWinDownloadInfo(vername, info) {
    if (info == "") {
        $('#windowsnote').html(no_download);
        if (!$("#win-download").hasClass("disabled")) {
            $("#win-download").addClass("disabled");
        }
    } else {
        $('#windowsnote').html(info);
        $("#win-download").removeClass("disabled");
        BuildDownloadSetup('#win-arch32', "windows", 32);
        BuildDownloadSetup('#win-arch64', "windows", 64);
    }
}

function SetLinDownloadInfo(vername, info) {
    if (info == "") {
        $('#linuxnote').html(no_download);
        if (!$("#lin-download").hasClass("disabled")) {
            $("#lin-download").addClass("disabled");
        }
    } else {
        $('#linuxnote').html(info);
        $("#lin-download").removeClass("disabled");
        BuildDownloadSetup('#lin-arch32', "linux", 32);
        BuildDownloadSetup('#lin-arch64', "linux", 64);
    }
}

function SetMacDownloadInfo(vername, info) {
    if (info == "") {
        $('#applenote').html(no_download);
        if (!$("#mac-download").hasClass("disabled")) {
            $("#mac-download").addClass("disabled");
        }
    } else {
        $('#applenote').html(info);
        $("#mac-download").removeClass("disabled");
        BuildDownloadSetup('#mac-arch32', "apple", 32);
        BuildDownloadSetup('#mac-arch64', "apple", 64);
    }
}

function InitDocToc() {
    $(function () {
        Toc.init($("#toc"));
    });
}

function IsDocPage() {
    var winame = document.location.href.match(/[^\/]+$/)[0]
    return winame.includes("documentation");
}

function AddDocNewItem(newlist) {
    var splitter = "::";
    var extra = '<span style="margin-left:4px" class="badge badge-primary">New</span>';
    //    if (!IsDocPage()) {
    //        return;
    //    }
    $("h1, h2").each(function () {
        var text = $(this).text();
        for (let i = 0; i < newlist.length; i++) {
            if (text.includes(newlist[i])) {
                var txt = text + splitter + extra;
                $(this).attr("data-toc-text", txt);
                break;
            }
        }
    });
    InitDocToc();
}

function ResponsiveDocToc() {
    var win = $(window);
    if (win.width() <= 758) {
        //console.log("small device");
        $(".drop-toc").append('<nav id="toc"></nav>');
    } else {
        //console.log("large device");
        $("#navleft").append('<nav id="toc"></nav>');
    }
}

function ApplyDocumentationStyle() {

    $('tr').css("width", "100%");
    $('td').css("width", "100%");
    $('table').css("table-layout", "fixed");
    $('table').css("width", "100%");
    $('table').css("table-layout", "fixed");

    $('table').css("border", "solid var(--primary) 1px");
    $('table').css("border-left", "solid var(--primary) 1px");
    $('table').css("border-right", "solid var(--primary) 1px");
    $('table').css("border-top", "solid var(--primary) 1px");
    $('table').css("border-bottom", "solid var(--primary) 1px");
    $('table').css("background", "none");
    //$('body').css("font - size ", "0.7 em ");

    $('body').css("font-family", "");
    $('p').css("font-family", "");
    $('span').css("font-family", "");


}

function AddCode(name) {
    var begin = "<br>\
                <h5 class='dropdown-toggle' data-toggle='collapse' data-target='#code-" + name + "'>" + name + "</h5>\
                <pre class='codeviewer collapse show' id='code-" + name + "'><code style='border-color: var(--secondary)' class='language-swift'>";
    var end = "</code></pre>";

    jQuery.get("assets/data/code/" + name + ".to", function (code) {
        code = begin + code + end;
        $("#gstart-code").append(code);
    });
}


function SetCodeBlackTheme() {
    $('link[info="code-css"]').attr('href', "assets/css/prism_black.css");
}

function SetCodeWhiteTheme() {
    $('link[info="code-css"]').attr('href', "assets/css/prism_light.css");
}

function LoadDemoCode(democode) {
    for (var i = 0; i < democode.length; i++) {
        AddCode(democode[i]);
    }
}

function LoadDemoCode2() {
    AddCode("ClassConfig");
    AddCode("DrawSphere");
}

$(document).ready(function () {

    ApplyDocumentationStyle();
    ResponsiveDocToc();

    var theme = GetCurrentTheme();
    if (theme) {
        set_theme(theme);
    } else {
        set_theme("assets/css/bootstrap.min.Slate.css");
    }

    jQuery.get("assets/data/data", function (datav) {
        data = JSON.parse(datav);
        cur_version = data["version"];
        newlist = data["newlist"];
        allversions = data["allversions"];
        democode = data["democode"];
        InitCurrentVersion();
        //LoadDemoCode(democode);
        BuildDownloadVersion();
        AddDocNewItem(newlist);
    });

});
