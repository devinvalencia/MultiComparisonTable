import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";

// Use Data to render table
const data = require("./data.json");

const view = ({ properties }, { updateState, dispatch }) => {
	// console.log(data[0]._row_data.displayValue);
	
	const fieldRows = [];

	// For each property in first record AFTER first two props, run loop
	for (var n = 2; n < Object.keys(properties.records[0]).length; n++) {
		var fieldLabel = Object.keys(properties.records[0])[n];

		var rowObj = {};
		var x = 0;

		rowObj.name = fieldLabel;
		const valuesArr = [];

		for (var record in properties.records) {
			window.fieldValue = `recordValue${x}`;
			valuesArr.push(properties.records[record][fieldLabel].displayValue);
			x++;
		}

		rowObj.recordValues = valuesArr;
		fieldRows.push(rowObj);
	}


	console.log(fieldRows);

	return (
		<div>
			<table>
				<tr>
					<th className="ignore"></th>
					{properties.records.map((record) => (
						<th key={record.number.value} className="recordLabel">
							<div>{record.number.value}</div>
						</th>
					))}
				</tr>

				{fieldRows.map(row => (
					<tr key={row.name}>
					<td className="fieldLabel">{row.name}</td>
					{row.recordValues.map(recordValue => (
						<td key={row.name} className="fieldValue"><div>{recordValue}
						</div></td>
					))}
					</tr>
				))}
			</table>
		</div>
	);
};

createCustomElement("x-772283-scope-multitablecomparison", {
	renderer: {
		type: snabbdom,
	},
	view,
	styles,
	actionHandlers: {
		TEST_CLICK_ACTION: ({ action, properties, dispatch }) => {
			// How to access payload, desctructure property from payload
			const { eventData } = action.payload;

			// console.log(eventData);

			// Update Properties
			// properties.testValues.push(event.path[0].innerText);

			if (eventData.path[2].childNodes[0].nodeName != "TR") {
				var obj = {};

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
									eventData.path[2].childNodes[node].className =
										"notSelectedField";
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
								eventData.path[2].childNodes[node].className =
									"notSelectedField";
							} else if (
								eventData.path[2].childNodes[node].className != "ignore"
							) {
								eventData.path[2].childNodes[node].className =
									"notSelectedRecord";
							}
						}
					}
				}

				// Look at each row
				for (var outerNode in eventData.path[3].childNodes) {
					// Look at each cell in row
					for (var innerNode in eventData.path[3].childNodes[outerNode]
						.childNodes) {
						// IF classname on this cell is selected
						// ADD property & value to obj
						// console.log(eventData.path[3].childNodes[outerNode].childNodes[innerNode]);

						if (
							eventData.path[3].childNodes[outerNode].childNodes[innerNode]
								.className == "selected"
						) {
							// console.log(`${eventData.path[3].childNodes[outerNode].childNodes[0].innerText} : ${eventData.path[3].childNodes[outerNode].childNodes[innerNode].innerText}`);
							if (
								eventData.path[3].childNodes[outerNode].childNodes[0]
									.innerText != ""
							) {
								obj[
									eventData.path[3].childNodes[
										outerNode
									].childNodes[0].innerText
								] =
									eventData.path[3].childNodes[outerNode].childNodes[
										innerNode
									].innerText;
								break;
							} else {
								obj.record =
									eventData.path[3].childNodes[outerNode].childNodes[
										innerNode
									].innerText;
							}
						}
					}
				}
				// Print out final object
				dispatch("RUN_FINAL_TEST", { finalList: obj });
			}
		},
		// Payload from this action will be used to render new merged form
		RUN_FINAL_TEST: ({ action }) => {
			const { finalList } = action.payload;
			// console.log(finalList);
		},
	},
	eventHandlers: [
		{
			events: ["click"],
			effect(coeffects) {
				const {
					dispatch,
					action: {
						payload: { event },
					},
				} = coeffects;

				dispatch("TEST_CLICK_ACTION", {
					eventData: event,
				});
			},
		},
	],
	properties: {
		testValues: {
			default: [],
		},
		records: {
			default: data,
		},
	},
});

/**
 *
 * https://react.semantic-ui.com/usage/ - 2.1.2
 *
 */
