import { createCustomElement, actionTypes } from "@servicenow/ui-core";
const { COMPONENT_DOM_TREE_READY } = actionTypes;
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "./index.css";

const view = (state, { updateState, dispatch }) => {
	const styles = {
		tableLabel: {
			backgroundColor: "#d3d3d3",
			fontWeight: 'bold'
		},
	};

	return (
		<div>
			<table>
				<tr>
					<th style={{border: 'none'}}></th>
					<th style={styles.tableLabel}>Record 1</th>
					<th style={styles.tableLabel}>Record 2</th>
					<th style={styles.tableLabel}>Record 3</th>
				</tr>
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
					<td class="fieldLabel" style={styles.tableLabel}>Field_2</td>
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
					<td class="fieldLabel" style={styles.tableLabel}>Field_3</td>
					<td class="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue2</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue3</div>
					</td>
				</tr>
				<tr>
					<td class="fieldLabel" style={styles.tableLabel}>Field_4</td>
					<td class="fieldValue">
						<div>FieldValue1</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue2</div>
					</td>
					<td class="fieldValue">
						<div>FieldValue3</div>
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

				if (event.path[1].attributes[0].value != "test") {
					event.path[1].attributes[0].value = "test";
				} else {
					event.path[1].attributes[0].value = "test2";
				}

				console.log(event.path);

				// ONLY WORKS IF NO TWO FIELD VALUES ARE EXACTLY THE SAME
				for (var node in event.path[2].childNodes) {
					if (
						event.path[2].childNodes[node].innerText != event.path[1].innerText
					) {
						if (
							event.path[2].childNodes[node].attributes[0].value != "fieldLabel"
						) {
							event.path[2].childNodes[node].attributes[0].value = "test2";
						}
					} else {
						event.path[2].childNodes[node].attributes[0].value = "test";
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
