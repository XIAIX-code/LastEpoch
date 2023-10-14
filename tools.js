function generateToolTipOUTERHTML(tree_id, node) {
	var dnswpa = false;
	var outerHTML = '<div class="tree-node-card">';
	outerHTML += '<div class="tree-node-description-block">';
	outerHTML += '<div class="tree-node-name" tree_id="';
	outerHTML += tree_id;
	outerHTML += '" tree_node_id="';
	outerHTML += node.id;
	outerHTML += '">';
	outerHTML += node.nodeName;
	outerHTML += '</div>';
	if (node.description) {
		outerHTML += '<div class="tree-node-description">';
		outerHTML += func_.tripple_N_lineBreaks(node.description);
		if (node.altText) {
			outerHTML += '<div class="alt-divider"></div>';
		}
	}
	if (node.altText) {
		outerHTML += '<div class="alt-text">';
		outerHTML += func_.tripple_N_lineBreaks(node.altText);
		outerHTML += '</div>';
	}
	if (node.description) {
		outerHTML += '</div>';
	}
	var statFound = 0;
	if (node.stats.length) {
		node.stats.forEach(function (stat) {
			if (stat.noScaling) {
				return;
			}
			if (++statFound == 1) {
				outerHTML += '<div class="stats-container">';
			}
			outerHTML += '<div class="tree-node-stat">';
			outerHTML += '<div class="tree-node-stat-icon">';
			outerHTML += '<div class="icons icons-r-';
			outerHTML += stat.sprite.split("-")[2];
			outerHTML += '"></div>'; // icons icons-r-
			outerHTML += '</div>'; // tree-node-stat-icon
			outerHTML += '<div class="tree-node-stat-text">';
			outerHTML += stat.statName;
			if (stat["value"]) {
				outerHTML += ': <span class="stat-emphasis">';
				outerHTML += stat["value"];
				outerHTML += ' per point</span>';
			}
			outerHTML += '</div>'; // tree-node-stat-text
			outerHTML += '</div>'; // tree-node-stat
		});
		if (statFound) {
			outerHTML += '</div>'; // stats-container
		}
	}

	// Any bonus info?
	var pointsBonusContainer = false;
	if (node.noScalingPointThreshold) {
		pointsBonusContainer = true;
		outerHTML += '<div class="point-bonus-container">';
		outerHTML += '<div class="point-bonus-title">';
		outerHTML += node.noScalingPointThreshold;
		outerHTML += ' Point Bonus</div>'; // point-bonus-title
		if (node.pointBonusDescription) {
			outerHTML += '<div class="point-bonus-description">';
			outerHTML += node.pointBonusDescription;
			outerHTML += '</div>'; // point-bonus-description
		}
		if (node.noScalingType && !dnswpa) {
			outerHTML += '<div class="stats-header">Does not scale with points allocated</div>';
			dnswpa = true;
		}
	} else {
		if (node.pointBonusDescription) {
			pointsBonusContainer = true;
			outerHTML += '<div class="point-bonus-container">';
			outerHTML += '<div class="point-bonus-description">';
			outerHTML += node.pointBonusDescription;
			outerHTML += '</div>'; // point-bonus-description
		}
		if (node.noScalingType && !dnswpa) {
			outerHTML += '<div class="stats-header">Does not scale with points allocated</div>';
			dnswpa = true;
		}
	}
	//if (pointsBonusContainer) {
	statFound = 0;
	if (node.stats.length) {
		node.stats.forEach(function (stat) {
			if (!stat.noScaling) {
				return;
			}
			if (++statFound == 1) {
				outerHTML += '<div class="stats-container">';
				if (!dnswpa) {
					outerHTML += '<div class="stats-header">Does not scale with points allocated</div>';
					dnswpa = true;
				}
			}
			outerHTML += '<div class="tree-node-stat">';
			outerHTML += '<div class="tree-node-stat-icon">';
			outerHTML += '<div class="icons icons-r-';
			outerHTML += stat.sprite.split("-")[2];
			outerHTML += '"></div>'; // icons icons-r-
			outerHTML += '</div>'; // tree-node-stat-icon
			outerHTML += '<div class="tree-node-stat-text">';
			outerHTML += stat.statName;
			if (stat["value"]) {
				outerHTML += ': <span class="stat-emphasis">';
				outerHTML += stat["value"];
				outerHTML += '</span>';
			}
			outerHTML += '</div>'; // tree-node-stat-text
			outerHTML += '</div>'; // tree-node-stat
		});
		if (statFound) {
			outerHTML += '</div>'; // stats-container
		}
		//}
		if (pointsBonusContainer) {
			outerHTML += '</div>'; // point-bonus-container
		}
	}


	outerHTML += '</div>'; // tree-node-description-block
	outerHTML += '</div>'; // tree-node-card
	return outerHTML;
}
function generateToolTip(tippyDivParent, node, tree_id, kind) {
	var tippyDIV = document.createElement("div");
	tippyDIV.classList.add("tippydiv");
	tippyDIV.style.display = "none";
	tippyDIV.id = kind + "_tippydiv_" + node.id + "";
	tippyDIV.innerHTML = generateToolTipOUTERHTML(tree_id, node);
	tippyDivParent.addEventListener("mouseenter", function (e) {
		tippyDIV.style.display = "unset";
	});
	tippyDivParent.addEventListener("mouseleave", function (e) {
		tippyDIV.style.display = "none";
	});
	// tippyDivParent.addEventListener("mousemove", function (e) {
	// 	//tippyDIV.style.marginLeft = e.currentTarget.offsetWidth + "px";
	// 	//e.stopPropagation();
	// });
	tippyDivParent.appendChild(tippyDIV);
	return tippyDivParent;
}