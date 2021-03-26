var path = "Img/";
var extName = ".jpg";
var historyId = [];
var heroCount = [];
var modeSH = "";

var moveing = false;
var canclick = true,
    cur_clientX = 0,
    cur_clientY = 0;

$(window).mousemove(function (m) {
    if (moveing) {
        if (cur_clientX != m.pageX || cur_clientY != m.pageY) {
            canclick = false;
        }
        window.scrollBy(cur_clientX - m.pageX, cur_clientY - m.pageY)
    }
});

$(window).mousedown(function (m) {
    cur_clientY = m.pageY;
    cur_clientX = m.pageX;
    moveing = true;
    m.preventDefault()
});

$(window).mouseup(function (m) {
    moveing = false;
});

$(document).ready(function () {

    Init();

    $(document).get(0).oncontextmenu = function () {

        //returnHero
        var nowId = historyId.pop();
        var oldId = historyId.pop();

        if (oldId) {
            CombineHeroHandler(oldId);
        } else {
            historyId.push(nowId);
        }

            return false;
    };
});

$(document).on("click", "#historyUpdate", function () {

    var ishidden = $(".historyUpdateContent").is(":hidden");

    if (ishidden) {
        $(".historyUpdateContent").show();
        $(this).val("隱藏歷史修改內容");
    } else {
        $(".historyUpdateContent").hide();
        $(this).val("顯示歷史修改內容");
    }
});

$(document).on("click", "#normal", function () {
    ChangeMode("normal");
    $("#normal").hide();
    $("#simple").show();
});

$(document).on("click", "#simple", function () {
    ChangeMode("simple");
    $("#normal").show();
    $("#simple").hide();
});

$(document).on("click", "#horizontal", function () {
    ChangeMode("horizontal");
    $("#horizontal").hide();
    $("#straight").show();
});

$(document).on("click", "#straight", function () {
    ChangeMode("straight");
    $("#horizontal").show();
    $("#straight").hide();
});

$(document).on("mouseenter", ".displayHero", function () {  
    ScaleDisplay(true);
});

$(document).on("mouseleave", ".displayHero", function () {   
    ScaleDisplay(false);
});

$(document).on("click", ".hero div.divTableCell", function () {
    if (canclick) {
        CombineHeroHandler($(this).find(".main").attr("Id"));
    } else {
        canclick = true;
    }
});

$(document).on("click", "#displayHerohide", function () {
    let isLock = !$("#displayHero").data("lock");
    $("#displayHero").data("lock", isLock);
    if(isLock) {
        $("#displayHero").addClass("lock");
        $("#displayHerohide").addClass("icon-down-open");
        $("#displayHerohide").removeClass("icon-right-open");
    } else {
        $("#displayHero").removeClass("lock");
        $("#displayHerohide").addClass("icon-right-open");
        $("#displayHerohide").removeClass("icon-down-open");
    }
});

//init
function Init() {

    //set name file
    SetFileH();
    SetFileS();

    //set status
    SetStatus(true);

    //hidden
    $("#normal").hide();
    $("#horizontal").hide();
    $(".heroS").hide();
    $(".displayHero").hide();
    $("#historyUpdate").click();
    modeSH = "H";
}

function CombineHeroHandler(id) {

    //resetCount
    ReSetCount();

    var newId = id;

    if (historyId[historyId.length - 1] == newId) {

        SetStatus(true);

        ReSetDisplay();

        historyId = [];
    } else {
        SetStatus(false);

        SetAllHero(newId);

        historyId.push(newId);
    }
}

function SetAllHero(id) {

    var level = id.length.toString(2).length;
    var highest = 5;

    for (var i = 1; i <= highest; i++) {

        if (i < level) {

            //set lowHero
            SetLevelHero(id, i, 1);
        } else if (i > level) {

            //set highHero
            SetLevelHero(id, i, 2);
        } else {

            //set itself
            SetStatus(true, id);
        }
    }

    SetCount();

    ReSetDisplay();

    SetDisplay(id);
}

function ReSetDisplay() {
    $(".displayHero .main, .displayHero .countDiv, .displayHero .selectedCombineHero").remove();
    $(".displayHero").hide();
}

function SetDisplay(id) {
    var selectedHero = $("#" + id).clone();

    $(".displayHero .selectedHero").append(selectedHero);

    $(".hero" + modeSH + " .enable").each(function () {

        var tdDiv = $(this).parent();
        var id = $(this).attr("id");
        if (id) {
            var level = id.length.toString(2).length;
            $(".displayHero .T" + level).append(tdDiv.clone().removeClass("T" + level).addClass("selectedCombineHero"));
        }
    });

    $(".displayHero .divTableCell.combinHero").hide();
    $(".displayHero .divTableCell.skill").hide();
    $(".displayHero").show();
}

function ScaleDisplay(scale) {
    let ishidden = $(".displayHero .divTableCell").is(":hidden");
    let isLock = $("#displayHero").data("lock");

    if (scale && ishidden) {
        $(".displayHero .divTableCell.combinHero").show();
        $(".displayHero .divTableCell.skill").show();
    } else if(!isLock) {
        $(".displayHero .divTableCell.combinHero").hide();
        $(".displayHero .divTableCell.skill").hide();
    }
}


//type 1:low 2:high
function SetLevelHero(id, level, type) {

    var heroId = "";

    switch (type) {

        //set low
        case 1:

            for (var i = 0; i < id.length; i++) {

                heroId += id[i];

                if ((i + 1) % Math.pow(2, level - 1) == 0) {

                    SetStatus(true, heroId)

                    if (type) {

                        //log count
                        var hero = heroCount.find(f => f.Id == heroId);

                        if (hero) {
                            hero.Count++;
                        } else {
                            hero = {
                                Id: heroId,
                                Count: 1
                            };
                            heroCount.push(hero);
                        }
                    }

                    heroId = "";
                }
            }

            break;

            //set high
        case 2:

            $(".T" + level + " .main").each(function () {

                heroId = $(this).attr("Id");

                if (heroId) {
                    var combinHero = "";

                    for (var i = 0; i < heroId.length; i++) {
                        combinHero += heroId[i];
                        if ((i + 1) % id.length == 0) {
                            if (combinHero == id) {
                                SetStatus(true, heroId);
                            }
                            combinHero = "";
                        }
                    }
                }

            });

            break;
    }


}

function ReSetCount() {
    $(".countDiv").addClass("visHidden").find("p").text("X 0");

    heroCount = [];
}

function SetCount() {

    heroCount.forEach(function (item, index) {
        var countDiv = $(".hero" + modeSH).find("#" + item.Id).siblings("div");
        countDiv.removeClass("visHidden").find("p").text("X " + item.Count);
    });
}

function SetStatus(status, id) {

    var statusClass = "";

    switch (status) {
        case true:
            statusClass = "enable";
            break;
        case false:
            statusClass = "disable";
            break;
        default:
            statusClass = "enable";
            break;
    }

    if (!id) {

        $(".hero" + modeSH + " div.main").each(function (e) {
            $(this).removeClass("enable");
            $(this).removeClass("disable");
            $(this).addClass(statusClass);
        });
    } else {
        $(".hero" + modeSH).find("#" + id).removeClass("enable");
        $(".hero" + modeSH).find("#" + id).removeClass("disable");
        $(".hero" + modeSH).find("#" + id).addClass(statusClass);
    }
}

function ChangeMode(mode) {

    switch (mode) {
        case "simple":
            $(".hero .main").addClass(mode);
            break;
        case "normal":
            $(".hero .main").removeClass().addClass("main");
            break;
        case "straight":
            modeSH = "S";
            $(".heroH").hide();
            $(".heroS").show();
            CombineHeroHandler(historyId[historyId.length - 1]);
            break;
        case "horizontal":
            modeSH = "H";
            $(".heroH").show();
            $(".heroS").hide();
            CombineHeroHandler(historyId[historyId.length - 1]);
            break;
        default:
            break;
    }

}

function SetFileH() {
    $(".heroH div.main").each(function (e) {

        var id = $(this).attr("Id");
        var occupation = $(this).closest(".divTableRow").attr("occupation");
        var level = id.length.toString(2).length;
        $(this).closest(".divTableCell").addClass("T" + level);
        $(this).closest(".divTableRow").addClass(occupation);

        if (id) {
            var filePath = path + occupation + "/" + id + extName;

            var countDiv = $("<div/>").addClass("countDiv").addClass("visHidden").append($("<p/>").text("X 0"));
            $(this).css("background-image", "url(" + filePath + ")").after(countDiv);
        } else {
            $(this).parent().addClass("none");
        }
    });
};

function SetFileS() {
    $(".heroS div.main").each(function (e) {

        var id = $(this).attr("Id");
        var occupation = occupations[$(this).closest("div.divTableRow").find(".main").index(this)];
        var level = id.length.toString(2).length;
        $(this).closest(".divTableCell").addClass(occupation);
        $(this).closest(".divTableRow").addClass("T" + level);

        if (id) {
            var filePath = path + occupation + "/" + id + extName;

            var countDiv = $("<div/>").addClass("countDiv").addClass("visHidden").append($("<p/>").text("X 0"));
            $(this).css("background-image", "url(" + filePath + ")").after(countDiv);
        } else {
            $(this).parent().addClass("none");
        }
    });
};