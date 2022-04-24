import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "./index.css";

const view = (state, { updateState, dispatch }) => {
	const styles = {
		tableLabel: {
			backgroundColor: "#d3d3d3",
			fontWeight: "bold",
		},
	};

	return (
		<div>
			<table>
				{/* Always make first row */}
				<tr>
					{/* For Each record object.number in data resource array, make a header */}
					<th class="ignore" style={{ border: "none" }}></th>
					<th class="recordLabel" style={styles.tableLabel}>
						<div>Record 1</div>
					</th>
					<th class="recordLabel" style={styles.tableLabel}>
						<div>Record 2</div>
					</th>
					<th class="recordLabel" style={styles.tableLabel}>
						<div>Record 3</div>
					</th>
				</tr>

				{/* For Each field AND for each record obj in arr, find same field.value for each td (besides first) */}
				<tr>
					<td class="fieldLabel" style={styles.tableLabel}>
						Field_1
					</td>
					<td class="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue3</div>
					</td>
				</tr>
				<tr>
					<td class="fieldLabel" style={styles.tableLabel}>
						Field_2
					</td>
					<td class="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue2</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue1</div>
					</td>
				</tr>
				<tr>
					<td class="fieldLabel" style={styles.tableLabel}>
						Field_3
					</td>
					<td class="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue2</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue2</div>
					</td>
				</tr>
				<tr>
					<td class="fieldLabel" style={styles.tableLabel}>
						Field_4
					</td>
					<td class="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td class="fieldValue">
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
		TEST_CLICK_ACTION: (e, value) => {
			console.log(value);
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

				console.log(event.path);

				// path[0] = div in cell, path[1] = cell, path[2] = row
				// For each cell in table row
				for (var node in event.path[2].childNodes) {
					if (node < event.path[2].childNodes.length) {
						// If node in row matches text of currently selected cell
						if (
							event.path[2].childNodes[node].innerText ==
							event.path[1].innerText
						) {
							if (event.path[2].childNodes[node].className == "selected") {
								event.path[2].childNodes[node].className = "notSelectedField";
							} else {
								event.path[2].childNodes[node].className = "selected";
							}
						} else {
							event.path[2].childNodes[node].className = "notSelectedField";
						}
					}
				}
			},
		},
	],
});

/**
 *
 * https://react.semantic-ui.com/usage/ - 2.1.2
 *
 */
