			var oldId = "";
			var heroCount = [];
			var occupations = ["S", "A", "T", "M", "P", "W", "K", "E"];
			var modeSH = "";

			$(document).ready(function () {
				Init();
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

			$(document).on("click", ".hero div.main", function () {

				//resetCount
				ReSetCount();

				var newId = $(this).attr("Id");

				if (oldId == newId) {

					SetStatus(true);

					oldId = "";
				}
				else {
					SetStatus(false);

					SetAllHero(newId);

					oldId = newId;
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
				modeSH = "H";
			}

			function SetAllHero(id) {

				var level = id.length.toString(2).length;
				var highest = 5;

				for (var i = 1; i <= highest; i++) {

					if (i < level) {

						//set lowHero
						SetLevelHero(id, i, 1);
					}
					else if (i > level) {

						//set highHero
						SetLevelHero(id, i, 2);
					}
					else {

						//set itself
						SetStatus(true, id);
					}
				}

				SetCount();
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
									}
									else {
										hero = { Id: heroId, Count: 1 };
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
				//$(".countDiv").removeClass("countDiv").find("p").text("X 0");

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
				}
				else {
					$(".hero" + modeSH).find("#" + id).removeClass("enable");
					$(".hero" + modeSH).find("#" + id).removeClass("disable");
					$(".hero" + modeSH).find("#" + id).addClass(statusClass);
				}
			}

			function ChangeMode(mode) {

				switch (mode) {
					case "simple":
						$(".main").addClass(mode);
						break;
					case "normal":
						$(".main").removeClass().addClass("main");
						break;
					case "straight":
						modeSH = "S";
						$(".heroH").hide();
						$(".heroS").show();
						SetStatus(true);
						break;
					case "horizontal":
						modeSH = "H";
						$(".heroH").show();
						$(".heroS").hide();
						SetStatus(true);
						break;
					default:
						break;
				}

			}

			function SetFileH() {
				var path = "Img/";
				var extName = ".jpg";

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
					}
					else {
						$(this).parent().addClass("none");
					}
				});
			};

			function SetFileS() {
				var path = "Img/";
				var extName = ".jpg";

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
					}
					else {
						$(this).parent().addClass("none");
					}
				});
			};
