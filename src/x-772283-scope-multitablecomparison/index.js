import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";

// Use Data to render table
// const data = require("./data.json");

const view = (state, { updateState, dispatch }) => {
	return (
		<div>
			<table>
				{/* Always make first row */}
				<tr>
					{/* For Each record object.number in data resource array, make a header */}
					<th className="ignore"></th>
					<th className="recordLabel">
						<div>Record 1</div>
					</th>
					<th className="recordLabel">
						<div>Record 2</div>
					</th>
					<th className="recordLabel">
						<div>Record 3</div>
					</th>
				</tr>

				{/* For Each field AND for each record obj in arr, find same field.value for each td (besides first) */}
				<tr>
					<td className="fieldLabel">Field_Name_A</td>
					<td className="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td className="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td className="fieldValue">
						<div>FieldValue3</div>
					</td>
				</tr>
				<tr>
					<td className="fieldLabel">Field_Name_B</td>
					<td className="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td className="fieldValue">
						<div>FieldValue2</div>
					</td>
					<td className="fieldValue">
						<div>FieldValue1</div>
					</td>
				</tr>
				<tr>
					<td className="fieldLabel">Field_Name_C</td>
					<td className="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td className="fieldValue">
						<div>FieldValue2</div>
					</td>
					<td className="fieldValue">
						<div>FieldValue2</div>
					</td>
				</tr>
				<tr>
					<td className="fieldLabel">Field_Name_D</td>
					<td className="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td className="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td className="fieldValue">
						<div>FieldValue1</div>
					</td>
				</tr>
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

			// Update Properties
			// properties.testValues.push(event.path[0].innerText);

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

							// Update object
							// var fieldNameLabel = eventData.path[2].childNodes[0].innerText;
							// obj[fieldNameLabel] = eventData.path[0].innerText;
							// console.log(obj);
							// console.log(fieldNameLabel);
						}
					} else if (
						eventData.path[2].childNodes[node].className != "fieldLabel"
					) {
						if (eventData.path[2].childNodes[node].nodeName != "TH") {
							eventData.path[2].childNodes[node].className = "notSelectedField";
						} else if (
							eventData.path[2].childNodes[node].className != "ignore"
						) {
							eventData.path[2].childNodes[node].className =
								"notSelectedRecord";
						}
					}
				}
			}

			// console.log(eventData.path);

			// Look at each row
			for (var outerNode in eventData.path[3].childNodes) {
				
				// Look at each cell in row
				for (var innerNode in eventData.path[3].childNodes[outerNode].childNodes) {

					// IF classname on this cell is selected
					// ADD property & value to obj
					// console.log(eventData.path[3].childNodes[outerNode].childNodes[innerNode]);

					if (eventData.path[3].childNodes[outerNode].childNodes[innerNode].className == 'selected') {
						// console.log(`${eventData.path[3].childNodes[outerNode].childNodes[0].innerText} : ${eventData.path[3].childNodes[outerNode].childNodes[innerNode].innerText}`);
						obj[eventData.path[3].childNodes[outerNode].childNodes[0].innerText] = eventData.path[3].childNodes[outerNode].childNodes[innerNode].innerText;
						break;
					}
				}
			}
			// Print out final object
			dispatch('RUN_FINAL_TEST',{finalList: obj});
		},
		// Payload from this action will be used to render new merged form
		RUN_FINAL_TEST: ({ action }) => {
			const { finalList } = action.payload;
			console.log(finalList);
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
					eventData: event
				});
			},
		},
	],
	properties: {
		testValues: {
			default: [],
		}
	},
});

/**
 *
 * https://react.semantic-ui.com/usage/ - 2.1.2
 *
 */
