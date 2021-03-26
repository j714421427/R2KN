    var occupations = ["S", "A", "T", "M", "P", "W", "K", "E"];
    var occupationsT2 = ["SK", "SS",
        "AA", "AT",
        "TT", "ST",
        "MM", "MW",
        "MP", "AP",
        "WW", "WE",
        "KK", "AK",
        "PE", "KE",];
    var element = ["Fire", "Wind", "Freeze", "Light", "Dark", "Metal"];
    var profession = ["Defence", "Damage", "Cure"];
    var tag = [];
    var characters = [];

    characters.push({
        Id: occupations[0],
        Name: "劍士",
        Level: "1",
        Element: element[0],
        Profession: profession[0],
        Skills: [],
        Tags: [],
    });

    characters.push({
        Id: occupations[1],
        Name: "弓箭手",
        Level: "1",
        Element: element[1],
        Profession: profession[1],
        Skills: [],
        Tags: [],
    });