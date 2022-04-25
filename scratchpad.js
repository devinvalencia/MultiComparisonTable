for (var node in eventData.path[2].childNodes) {
	if (
		node < eventData.path[2].childNodes.length &&
		eventData.path[0].className != "fieldLabel" &&
		eventData.path[2].childNodes[node].nodeName != "TR"
	) {
		// If node in row matches text of currently selected cell
		if (
			eventData.path[2].childNodes[node].innerText ==
			eventData.path[1].innerText
		) {
			// If node already selected, make unselected
			if (eventData.path[2].childNodes[node].className == "selected") {
				if (eventData.path[2].childNodes[node].nodeName != "TH") {
					eventData.path[2].childNodes[node].className = "notSelectedField";
				} else if (
					eventData.path[2].childNodes[node].className != "ignore"
				) {
					eventData.path[2].childNodes[node].className =
						"notSelectedRecord";
				}
			} else {
				// Select all nodes that match innner text of current node to selected
				eventData.path[2].childNodes[node].className = "selected";
			}
		} else if (
			eventData.path[2].childNodes[node].className != "fieldLabel"
		) {
			if (eventData.path[2].childNodes[node].nodeName != "TH") {
				eventData.path[2].childNodes[node].className = "notSelectedField";
			} else if (eventData.path[2].childNodes[node].className != "ignore") {
				eventData.path[2].childNodes[node].className = "notSelectedRecord";
			}
		}
	}
}