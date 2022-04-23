if (event.path[0].attributes[0].value != "test") {
	event.path[0].attributes[0].value = "test";
} else {
	event.path[0].attributes[0].value = "test2";
}


// ONLY WORKS IF NO TWO FIELD VALUES ARE EXACTLY THE SAME
for (var node in event.path[1].childNodes) {
	if (event.path[2].childNodes[node].innerText != event.path[0].innerText) {
		event.path[2].childNodes[node].attributes[0].value = "test2";
	}
}
