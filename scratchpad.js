							// If cell is already selected, then find other 
							if (event.path[1].className == "selected") {
								for (var node in event.path[2].childNodes) {
									if (
										event.path[2].childNodes[node].innerText ==
										event.path[1].innerText
									) {
										event.path[2].childNodes[node].className = "selected";
									}
								}
							} else {
								for (var node in event.path[2].childNodes) {
									if (
										event.path[2].childNodes[node].innerText ==
										event.path[1].innerText
									) {
										event.path[2].childNodes[node].attributes[0].value =
											"selected";
									}
								}
							}