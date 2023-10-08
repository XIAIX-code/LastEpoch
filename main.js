var character = {};
var generalSkillData = {
	"maxSkillXP": 5700000, // This should never need to be changed
	"unspentPoints": 0 // This should never need to be changed
};
var rxSpace = new RegExp(" ", "g");
var rxTagUS = new RegExp("_", "g");
var func_ = {
	init: function () {
		func_.resetFileInput();
		func_.clearTextArea();
		func_.hideGenerateCodeBtn();
		func_.hideCopyBtn();
		func_.hide_work_tr();
		func_.setTextAreaOnchangeFunction();
		func_.setInputButtonOnclickFunction();
		func_.check_if_copy_command_is_supported();
		// Create an addEventListener for when a character file is loaded
		func_.readFile();
	},
	tripple_N_lineBreaks: function (str) {
		var regex = /\n\n\n/g;
		var subst = '<div class="separator"></div>';
		var result = str.replace(regex, subst);
		return result;
	},
	hideCopyBtn: function () {
		var e = document.getElementById("copyButton_div");
		if (e) {
			e.style.display = "none";
		}
	},
	showCopyBtn: function () {
		var e = document.getElementById("copyButton_div");
		if (e) {
			e.style.display = "";
		}
		func_.hideInputFileDIV();
	},
	hideGenerateCodeBtn: function () {
		var e = document.getElementById("generateCodeButton_div");
		if (e) {
			e.style.display = "none";
		}
	},
	showGenerateCodeBtn: function () {
		var e = document.getElementById("generateCodeButton_div");
		if (e) {
			e.style.display = "";
		}
	},
	hideMainSkillsDiv: function () {
		var e = document.getElementById("character_skillList_div");
		if (e) {
			e.style.display = "none";
		}
	},
	showMainSkillsDiv: function () {
		var e = document.getElementById("character_skillList_div");
		if (e) {
			e.style.display = "";
		}
	},
	startOver: function () {
		func_.hideGenerateCodeBtn();
		func_.clearTextArea();
		func_.resetFileInput();
		func_.hideMainSkillsDiv();
	},
	check_if_copy_command_is_supported: function () {
		var e = document.getElementById("generateCodeFileData");
		if (e) {
			if (!document.queryCommandSupported('copy')) {
				e.parentNode.removeChild(e);
			}
		}
	},
	selectAndCopyTextArea: function (copyBtn) {
		function flashCopyMessage(el, msg) {
			el.textContent = msg;
			el.classList.add("largeFontSize");
			el.disabled = true;
			setTimeout(function () {
				el.textContent = "Copy to Clipboard";
				el.classList.remove("largeFontSize");
				el.disabled = false;
				func_.deleteAllSkillNodeDivs();
			}, 2000);
		}
		try {
			var e = document.getElementById("generateCodeFileData");
			if (e && e.value != "") {
				e.select();
				document.execCommand("copy");
			}
			flashCopyMessage(copyBtn, 'Copied!')
		} catch (e) {
			console && console.log(e);
			flashCopyMessage(copyBtn, 'Failed :\'(')
		}
	},
	clearTextArea: function () {
		var e = document.getElementById("generateCodeFileData");
		if (e) {
			e.value = "";
			e.style.display = "none";
			func_.hideTextAreaDIV();
			func_.deleteAllSkillNodeDivs();
			func_.hideCopyBtn();
		}
	},
	setTextArea: function (data) {
		var e = document.getElementById("generateCodeFileData");
		if (e) {
			e.value = data;
			e.style.display = "";
			func_.showTextAreaDIV();
			func_.showCopyBtn();
		}
	},
	deleteAllSkillNodeDivs: function () {
		var safety = 500;
		var div = document.getElementsByClassName("skillnodesdiv")[0];
		while (div && --safety > 0) {
			div.parentNode.removeChild(div);
			div = document.getElementsByClassName("skillnodesdiv")[0];
		}
	},
	resetFileInput: function () {
		var e = document.getElementById("inputfile");
		if (e) {
			e.value = "";
		}
	},
	hideTextAreaDIV: function () {
		var e = document.getElementById("generateCodeFileData_div");
		if (e) {
			e.style.display = "none";
		}
	},
	showTextAreaDIV: function () {
		var e = document.getElementById("generateCodeFileData_div");
		if (e) {
			e.style.display = "";
		}
	},
	hideInputFileDIV: function () {
		var e = document.getElementById("inputfile_div");
		if (e) {
			e.style.display = "none";
		}
	},
	showInputFileDIV: function () {
		var e = document.getElementById("inputfile_div");
		if (e) {
			e.style.display = "";
		}
	},
	hide_work_tr: function () {
		var e = document.getElementById("work_tr");
		if (e) {
			e.style.display = "none";
		}
	},
	show_work_tr: function () {
		var e = document.getElementById("work_tr");
		if (e) {
			e.style.display = "";
		}
	},
	removeIrrelevantClassDivs: function (charClass) {
		var e = document.getElementsByName("main_class_skill_div");
		var divArray = [];
		for (var i = 0; i < e.length; i++) {
			divArray.push(e[i]);
		}
		var safety = 500;
		while (divArray.length && --safety > 0) {
			if (divArray[0].id.toString().indexOf(charClass) < 0) {
				document.getElementById(divArray[0].id).parentNode.removeChild(document.getElementById(divArray[0].id));
				divArray.splice(0, 1);
			} else {
				divArray.splice(0, 1);
			}
		}
	},
	populatePassivesTable: function () {
		character.savedCharacterTree.nodeIDs.forEach(function (passiveNode, passiveIndex) {
			var input = document.getElementById("passiveinput_" + passiveNode + "");
			if (input) {
				input.value = character.savedCharacterTree.nodePoints[passiveIndex];
			}
		});
	},
	readFile: function () {
		document.getElementById('inputfile').addEventListener('change', function () {
			var fr = new FileReader();
			fr.onload = function () {
				character = {};
				fileDataPlaceholder = fr.result.toString();
				try {
					character = JSON.parse(fileDataPlaceholder.split('EPOCH')[1]);
					if (!func_.dataIsValid(character)) {
						alert("The data is either corrupt or you picked a non-character save file.");
						location.reload();
						return;
					}
				} catch (err) {
					alert("The data is either corrupt or you picked a non-character save file.");
					location.reload();
					return;
				}

				func_.show_work_tr();
				func_.showGenerateCodeBtn();
				func_.showMainSkillsDiv();
				func_.showClassSkillDiv();
				func_.hideInputFileDIV();
				var charClass = false;

				// Character skills
				var character_skillList_div = document.getElementById("character_skillList_div");
				character.savedSkillTrees.forEach(function (fileSkillTree) {
					if (fileSkillTree.treeID && fileSkillTree.treeID != "") {
						if (window.LESkillTrees[fileSkillTree.treeID]) {
							var SKILL = window.LESkillTrees[fileSkillTree.treeID];
							var skill_DIV = document.createElement("div");
							skill_DIV.id = "skill_" + SKILL.ability;
							skill_DIV.classList.add("skillButton");
							skill_DIV.onclick = function () { func_.toggleSkillEdit(skill_DIV, SKILL, fileSkillTree, window.LEAbilities.abilityList[SKILL.ability]); }
							// Skill ICON
							if (window.LEAbilities.abilityList[SKILL.ability].abilitySprite) {
								var skill_span_ICON = document.createElement("span");
								skill_span_ICON.classList.add("skillIcon");
								skill_span_ICON.classList.add("icons");
								skill_span_ICON.classList.add("icons-r-" + window.LEAbilities.abilityList[SKILL.ability].abilitySprite.split("-")[2]);
								skill_DIV.insertBefore(skill_span_ICON, skill_DIV.firstChild);
							}
							var skill_span_NAME = document.createElement("span");
							skill_span_NAME.textContent = window.LEAbilities.abilityList[SKILL.ability]["name"];
							skill_span_NAME.classList.add("skillName");

							skill_DIV.appendChild(skill_span_NAME);
							character_skillList_div.appendChild(skill_DIV);
						}
					}
				});
				if (charClass) {
					func_.removeIrrelevantClassDivs(charClass);
				}

				// Character passives
				var pdiv = document.getElementById("passives_div");
				if (pdiv) {
					// Clear out anything that might be there.
					while (pdiv.children.length) {
						pdiv.removeChild(pdiv.children[0]);
					}

					window.LECharTrees.trees.forEach(function (passive) {
						if (character.characterClass == passive.characterTree.characterClass.classID) {
							var passiveReference = passive.ref;
							passive.characterTree.characterClass.masteries.forEach(function (mastery, mIdx) {
								var pTable = document.createElement("table");
								pTable.classList.add("skillPointTable");

								var masteryHeaderTR = document.createElement("tr");
								var masteryHeaderTD = document.createElement("td");
								masteryHeaderTD.colSpan = "3";
								masteryHeaderTD.classList.add("passiveMasteryHeader");

								masteryHeaderTR.appendChild(masteryHeaderTD);
								pTable.appendChild(masteryHeaderTR);

								var pTblTR = document.createElement("tr");
								var pTblTH = document.createElement("th");
								pTblTH.textContent = "Passive";
								pTblTR.appendChild(pTblTH);
								pTblTH = document.createElement("th");
								pTblTH.textContent = "Points";
								pTblTR.appendChild(pTblTH);
								pTblTH = document.createElement("th");
								pTblTH.textContent = "Max";
								pTblTR.appendChild(pTblTH);
								pTable.appendChild(pTblTR);

								if (!pTable.id || pTable.id == "") {
									pTable.id = "passives_table_" + mIdx + "";

									// Why we can't just use masteryHeaderTD.textContent = 
									// https://stackoverflow.com/questions/74048912/changes-to-a-parent-elements-textcontent-causes-the-child-to-delete
									var tmpSpan = document.createElement("span");
									tmpSpan.textContent = mastery["name"];
									masteryHeaderTD.appendChild(tmpSpan);
								}
								Object.keys(passive.characterTree.nodes).forEach(function (N) {
									var node = passive.characterTree.nodes[N];
									if (node.mastery == mIdx) {
										pTblTR = document.createElement("tr");

										// Passive
										pTblTD = document.createElement("td");
										pTblTD.textContent = node.nodeName;
										pTblTD = generateToolTip(pTblTD, node, passive.characterTree.treeID, 'passive');
										pTblTR.appendChild(pTblTD);

										// Points
										pTblTD = document.createElement("td");
										var pTblINPUT = document.createElement("input");
										pTblINPUT.id = "passiveinput_" + node.id + "";
										pTblINPUT.type = "text";
										pTblINPUT.classList.add("pointInput");
										pTblINPUT.setAttribute("nodename", node.nodeName);
										pTblINPUT.setAttribute("nodeid", node.id);
										pTblINPUT.setAttribute("masteryid", mIdx);
										pTblINPUT.setAttribute("maxvalue", node.maxPoints);
										pTblINPUT.value = 0;
										pTblINPUT.addEventListener("wheel", function (e) {
											if (e.deltaY < 0) { /* Scrolling up */
												if (parseInt(this.value, 10) < node.maxPoints) {
													this.value = parseInt(this.value, 10) + 1;
												}
											}
											else if (e.deltaY > 0) { /* Scrolling down */
												if (parseInt(this.value, 10) > 0) {
													this.value = parseInt(this.value, 10) - 1;
												}
											}
										});
										pTblTD.appendChild(pTblINPUT);
										// Max button
										pTblMaxBtn = document.createElement("button");
										pTblMaxBtn.setAttribute("nodeid", node.id);
										pTblMaxBtn.textContent = "max";
										pTblMaxBtn.classList.add("smallMaxBtn");
										pTblMaxBtn.onclick = function () { func_.maxThisPassivePoint(this); };
										pTblTD.appendChild(pTblMaxBtn);
										pTblTR.appendChild(pTblTD);

										// Max
										pTblTD = document.createElement("td");
										pTblTD.textContent = node.maxPoints;
										pTblTR.appendChild(pTblTD);

										// Put the TR into the table
										pTable.appendChild(pTblTR);
									}
								});
								pdiv.appendChild(pTable);
							});
						}
					});
					func_.populatePassivesTable();
				}
			}
			fr.readAsText(this.files[0]);
		})
	},
	checkMax: function (e, max) {
		if (isNaN(parseInt(e.value))) {
			e.value = 0;
			alert("not a number, setting value to 0");
		}
		if (parseInt(e.value, 10) > parseInt(max, 10)) {
			e.value = parseInt(max, 10);
			alert("setting to max");
		}
		if (parseInt(e.value, 10) < parseInt(max, 10)) {
			e.classList.add("nonMaxedPoints");
		} else {
			e.classList.remove("nonMaxedPoints");
		}
	},
	toggleCollapse: function (e) {
		var p = e.parentNode;
		for (var i = 0; i < p.children.length; i++) {
			if (p.children[i].tagName == "DIV") {
				if (p.children[i].style.display == "none") {
					p.children[i].style.display = "";
				} else {
					p.children[i].style.display = "none";
				}
			}
		}
	},
	deleteWorkTR: function () {
		var e = document.getElementById("work_tr");
		if (e) {
			e.parentNode.removeChild(e);
		}
	},
	maxAllPoints: function (SKILL, fileSkillTree) {
		Object.keys(SKILL.nodes).forEach(function (N) {
			var node = SKILL.nodes[N];
			if (node.id == 0) {
				return;
			}
			var nodeFound = false;
			var INPUT = document.getElementById("input_" + SKILL.ability + "_" + node.nodeName.toLowerCase().replace(rxSpace, "") + "_" + node.id);
			fileSkillTree.nodeIDs.forEach(function (fstNode, fstIndex) {
				if (parseInt(fstNode, 10) == parseInt(node.id, 10)) {
					nodeFound = true;
					if (INPUT) {
						fileSkillTree.nodePoints[fstIndex] = parseInt(node.maxPoints, 10);
						INPUT.value = parseInt(node.maxPoints, 10);
						INPUT.dispatchEvent(new Event('change', { 'bubbles': true }));
						return;
					}
				}
			});
			if (!nodeFound && INPUT) {
				fileSkillTree.nodeIDs.push(parseInt(node.id, 10));
				fileSkillTree.nodePoints.push(parseInt(node.maxPoints, 10));
				INPUT.value = parseInt(node.maxPoints, 10);
				INPUT.dispatchEvent(new Event('change', { 'bubbles': true }));
			}
		});
	},
	maxThisPassivePoint: function (btn) {
		if (btn.previousSibling.id == "passiveinput_" + btn.getAttribute("nodeid")) {
			if (parseInt(btn.previousSibling.value, 10) == parseInt(btn.previousSibling.getAttribute("maxvalue"), 10)) {
				btn.previousSibling.value = 0;
			} else {
				btn.previousSibling.value = parseInt(btn.previousSibling.getAttribute("maxvalue"), 10);
			}
		}
	},
	toggleSkillEdit: function (skill_DIV, SKILL, fileSkillTree, SKILL_ABILITY) {
		var skillNodesDIV = document.getElementById("skillnodesdiv_" + SKILL.ability);
		var passives_div_TD = document.getElementById("passives_div_TD");
		var character_skillList_div = document.getElementById("character_skillList_div");
		if (!skillNodesDIV) {
			skillNodesDIV = document.createElement("div");
			skillNodesDIV.setAttribute("treeid", SKILL.ability);
			skillNodesDIV.id = "skillnodesdiv_" + SKILL.ability;
			skillNodesDIV.classList.add("skillnodesdiv");

			var allMaxDIV = document.createElement("div");
			var allMaxBtn = document.createElement("button");
			allMaxBtn.classList.add("maxAllPointsBTN");
			allMaxBtn.innerText = "Max all points";
			allMaxBtn.setAttribute("treeid", SKILL.ability);
			allMaxBtn.onclick = function () { func_.maxAllPoints(SKILL, fileSkillTree); };
			allMaxDIV.appendChild(allMaxBtn);

			var tbl = document.createElement("table");
			tbl.classList.add("skillPointTable");

			var tblThTr = document.createElement("tr");
			var th = document.createElement("th");
			th.innerText = "Node name";
			tblThTr.appendChild(th);
			th = document.createElement("th");
			th.innerText = "Allocated Points";
			tblThTr.appendChild(th);
			th = document.createElement("th");
			th.innerText = "Max Points";
			tblThTr.appendChild(th);
			tbl.appendChild(tblThTr);

			fileSkillTree.unspentPoints = generalSkillData.unspentPoints;
			fileSkillTree.xp = generalSkillData.maxSkillXP;
			Object.keys(SKILL.nodes).forEach(function (N) {
				var node = SKILL.nodes[N];
				if (node.id == 0) {
					return;
				}

				var TR = document.createElement("tr");
				var INPUT = document.createElement("input");
				INPUT.id = "input_" + SKILL.ability + "_" + node.nodeName.toLowerCase().replace(rxSpace, "") + "_" + node.id;
				INPUT.type = "text";
				INPUT.setAttribute("treeid", SKILL.ability);
				INPUT.setAttribute("nodeid", node.id);
				INPUT.value = 0;

				fileSkillTree.nodeIDs.forEach(function (fstNode, fstIndex) {
					if (parseInt(node.id, 10) == parseInt(fstNode, 10)) {
						INPUT.value = fileSkillTree.nodePoints[fstIndex];
						INPUT.dispatchEvent(new Event('change', { 'bubbles': true }));
						return;
					}
				});

				INPUT.onchange = function () { func_.checkMax(this, node.maxPoints); }
				INPUT.classList.add("pointInput");
				if (parseInt(INPUT.value, 10) < parseInt(node.maxPoints, 10)) {
					INPUT.classList.add("nonMaxedPoints");
				}

				// Column: Skill Name
				var TD = document.createElement("td");
				TD.innerText = node.nodeName;
				TD = generateToolTip(TD, node, SKILL.ability, 'skill');
				// // Skill ICON
				// if (window.LEAbilities.abilityList[SKILL.ability].abilitySprite) {
				//     var skill_span_ICON = document.createElement("span");
				//     skill_span_ICON.classList.add("skillIcon");
				//     skill_span_ICON.classList.add("icons");
				//     skill_span_ICON.classList.add("icons-r-" + window.LEAbilities.abilityList[SKILL.ability].abilitySprite.split("-")[2]);
				//     TD.insertBefore(skill_span_ICON, TD.firstChild);
				// }
				TR.appendChild(TD);

				// Column: Skill Points
				TD = document.createElement("td");
				TD.style.textAlign = "center";
				TD.appendChild(INPUT);
				TR.appendChild(TD);

				// Column: Max Skill Points
				TD = document.createElement("td");
				TD.style.textAlign = "center";
				TD.innerText = node.maxPoints;
				TR.appendChild(TD);

				// Append the TR to the table
				tbl.appendChild(TR);
			});

			skillNodesDIV.appendChild(allMaxDIV);
			skillNodesDIV.appendChild(tbl);
			character_skillList_div.appendChild(skillNodesDIV);
			skillNodesDIV.style.display = "none"; // so it triggers to display below
		}

		if (skillNodesDIV.style.display == "none") {
			skillNodesDIV.style.display = "";
			func_.hidePassivesDiv();
			skill_DIV.classList.remove("skillButton");
			skill_DIV.classList.add("activeSkillButton");
		} else {
			skillNodesDIV.style.display = "none";
			func_.showPassivesDiv();
			skill_DIV.classList.remove("activeSkillButton");
			skill_DIV.classList.add("skillButton");
		}

		// Hide all other skillnodesdiv_ divs
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].id.indexOf("skillnodesdiv_") == 0) {
				if (divs[i].id != "skillnodesdiv_" + SKILL.ability) {
					divs[i].style.display = "none";
				}
			}
			if (divs[i].id.indexOf("skill_") == 0) {
				if (divs[i].id != "skill_" + SKILL.ability) {
					divs[i].classList.remove("activeSkillButton");
					divs[i].classList.add("skillButton");
				}
			}
		}
	},
	hideClassSkillDiv: function () {
		var e = document.getElementsByName("main_class_skill_div")[0];
		if (e) {
			e.style.display = "none";
		}
	},
	showClassSkillDiv: function () {
		var e = document.getElementsByName("main_class_skill_div")[0];
		if (e) {
			e.style.display = "";
		}
	},
	hidePassivesDiv: function () {
		var e = document.getElementById("passives_div");
		if (e) {
			e.style.display = "none";
		}
	},
	showPassivesDiv: function () {
		var e = document.getElementById("passives_div");
		if (e) {
			e.style.display = "grid";
		}
	},
	dataIsValid: function (data) {
		if (data.characterName && data.level && data.currentExp && data.savedSkillTrees) {
			return true;
		}
		return false;
	},
	generateCodeAndDisplay: function () {
		var i = 0;
		var character_skillList_div = document.getElementById("character_skillList_div");
		if (character_skillList_div) {
			var csdInputs = character_skillList_div.getElementsByTagName("input");
			for (i = 0; i < csdInputs.length; i++) {
				if (csdInputs[i].hasAttribute("treeid") && csdInputs[i].hasAttribute("nodeid")) {
					var nodeFound = false;
					character.savedSkillTrees.forEach(function (fileSkillTree) {
						fileSkillTree.nodeIDs.forEach(function (fstNode, fstIndex) {
							if (fileSkillTree.treeID == csdInputs[i].getAttribute("treeid")) {
								if (parseInt(fstNode, 10) == parseInt(csdInputs[i].getAttribute("nodeid"), 10)) {
									// If there's at least 1 point, go ahead and update the value
									if (parseInt(csdInputs[i].value, 10) > 0) {
										fileSkillTree.nodePoints[fstIndex] = parseInt(csdInputs[i].value, 10);
									} else {
										// All points were removed, so let's remove the nodeID and the 0 value

										// Remove the skill
										fileSkillTree.nodeIDs.splice(fstIndex, 1);
										// Remove the point
										fileSkillTree.nodePoints.splice(fstIndex, 1);
									}
									nodeFound = true;
								}
							}
						});
					});
					if (!nodeFound && parseInt(csdInputs[i].value, 10) > 0) {
						character.savedSkillTrees.forEach(function (fileSkillTree) {
							if (fileSkillTree.treeID == csdInputs[i].getAttribute("treeid")) {
								fileSkillTree.nodeIDs.push(parseInt(csdInputs[i].getAttribute("nodeid"), 10));
								fileSkillTree.nodePoints.push(parseInt(csdInputs[i].value, 10));
								return;
							}
						});
					}
				}
			}
		}
		var passives_div = document.getElementById("passives_div");
		if (passives_div) {
			var passiveInputs = passives_div.getElementsByTagName("input");
			character.savedCharacterTree.nodeIDs = [];
			character.savedCharacterTree.nodePoints = [];
			for (i = 0; i < passiveInputs.length; i++) {
				if (parseInt(passiveInputs[i].value, 10) <= 0) {
					continue;
				}
				if (passiveInputs[i].hasAttribute("nodeid")) {
					character.savedCharacterTree.nodeIDs.push(parseInt(passiveInputs[i].getAttribute("nodeid"), 10));
					character.savedCharacterTree.nodePoints.push(parseInt(passiveInputs[i].value, 10));
				}
			}
		}

		// Now validate and display it
		if (func_.dataIsValid(character)) { // One last check for sanity reason :/
			func_.setTextArea("EPOCH" + JSON.stringify(character));
			func_.showCopyBtn();
			func_.hideGenerateCodeBtn();
			func_.deleteWorkTR();
		} else {
			alert("The data is either corrupt or you picked a non-character save file.");
			location.reload();
		}
	},
	setTextAreaOnchangeFunction: function () {
		var e = document.getElementById("generateCodeFileData");
		if (e) {
			e.onchange = function () { func_.textAreaChanged(this); };
		}
	},
	setInputButtonOnclickFunction: function () {
		var e = document.getElementById("inputfile");
		if (e) {
			e.onclick = function () { func_.startOver(); };
		}
	},
	textAreaChanged: function (e) {
		if (e.value == "") {
			func_.hideGenerateCodeBtn();
			func_.hideCopyBtn();
			func_.clearTextArea();
			func_.resetFileInput();
			func_.hideMainSkillsDiv();
		}
	}
};