import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";

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
					<td className="fieldLabel">Field_1</td>
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
					<td className="fieldLabel">Field_2</td>
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
					<td className="fieldLabel">Field_3</td>
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
					<td className="fieldLabel">Field_4</td>
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
		TEST_CLICK_ACTION: ({ action, properties }) => {
			// How to access payload, desctructure property from payload
			const { value } = action.payload;

			// Update Properties
			// properties.testValues.push(event.path[0].innerText);
			console.log(value.childNodes);
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

				// console.log(event.path);

				//var n = 0;
				dispatch("TEST_CLICK_ACTION",{
					value: event.path
				});

				for (var node in event.path[2].childNodes) {
					if (
						node < event.path[2].childNodes.length &&
						event.path[0].className != "fieldLabel" &&
						event.path[2].childNodes[node].nodeName != "TR"
					) {
						// If node in row matches text of currently selected cell
						if (
							event.path[2].childNodes[node].innerText ==
							event.path[1].innerText
						) {
							// If node already selected, make unselected
							if (event.path[2].childNodes[node].className == "selected") {
								if (event.path[2].childNodes[node].nodeName != "TH") {
									event.path[2].childNodes[node].className = "notSelectedField";
								} else if (
									event.path[2].childNodes[node].className != "ignore"
								) {
									event.path[2].childNodes[node].className =
										"notSelectedRecord";
								}
							} else {
								// Select all nodes that match innner text of current node to selected
								event.path[2].childNodes[node].className = "selected";
							}
						} else if (
							event.path[2].childNodes[node].className != "fieldLabel"
						) {
							if (event.path[2].childNodes[node].nodeName != "TH") {
								event.path[2].childNodes[node].className = "notSelectedField";
							} else if (event.path[2].childNodes[node].className != "ignore") {
								event.path[2].childNodes[node].className = "notSelectedRecord";
							}
						}
					}
				}
			},
		},
	],
	properties: {
		testValues: {
			default: [],
		},
	},
});

/**
 *
 * https://react.semantic-ui.com/usage/ - 2.1.2
 *
 */
