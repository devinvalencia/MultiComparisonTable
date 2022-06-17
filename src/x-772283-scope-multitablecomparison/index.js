import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";

const { COMPONENT_RENDERED } = actionTypes;

// Uncomment below for test data, then use as default in properties for testing
//const data = require("./data.json");

const TABLE_CELL_SELECTED = "TABLE_CELL_SELECTED";
const HEADER_CELL_SELECTED = "HEADER_CELL_SELECTED";

const view = (state, { dispatch }) => {
	const { properties, records, selectedColumn } = state;

	const updateHeaderSelection = (selectedColumn) => {
		dispatch(HEADER_CELL_SELECTED, { records: state.records, selectedColumn });
	};

	const updateCellSelection = (rowIndex, columnIndex, selected, rowName) => {
		dispatch(TABLE_CELL_SELECTED, {
			records: state.records,
			rowIndex,
			columnIndex,
			selected,
			rowName,
		});
	};

	return (
		<div>
			<table>
				<tr>
					<th className="ignore"></th>
					{properties.records.map((record, index) => (
						<th
							key={index}
							className={
								"recordLabel " +
								(selectedColumn === record._row_data.uniqueValue
									? "selected"
									: "")
							}
						>
							<div
								on-click={() =>
									updateHeaderSelection(record._row_data.uniqueValue)
								}
							>
								{record.number.value}
							</div>
						</th>
					))}
				</tr>

				{records.map((row, rowIndex) => (
					<tr key={rowIndex} className={row.different ? "highlighted" : ""}>
						<td className="fieldLabel">{row.name.replace("_", " ")}</td>
						{row.recordValues.map((recordValue, colIndex) => (
							<td
								key={colIndex}
								className={
									"fieldValue " +
									(recordValue.selected ? "selected " : "") +
									(row.selectionMade ? "selection-made" : "")
								}
								on-click={
									row.different
										? () =>
												updateCellSelection(
													rowIndex,
													colIndex,
													!recordValue.selected
												)
										: undefined
								}
							>
								<div>{recordValue.displayValue}</div>
							</td>
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
		[HEADER_CELL_SELECTED]: ({ action, dispatch, updateState }) => {
			const { records, selectedColumn } = action.payload;
			updateState({ selectedColumn });
			dispatch(TABLE_CELL_SELECTED, { isHeader: true, records });
		},
		[TABLE_CELL_SELECTED]: ({ action, dispatch, state, updateState }) => {
			const { isHeader, records, rowIndex, columnIndex, selected } =
				action.payload;
			const obj = state.selectedColumn ? { record: state.selectedColumn } : {};

			const updatedRecords = [...records];

			if (!isHeader) {
				const updatedRowValues = [...updatedRecords[rowIndex].recordValues];
				updatedRecords[rowIndex].selectionMade = selected;

				for (let i = 0; i < updatedRowValues.length; i++) {
					if (
						i === columnIndex ||
						(updatedRowValues[columnIndex].displayValue ===
							updatedRowValues[i].displayValue &&
							updatedRowValues[columnIndex].value ===
								updatedRowValues[i].value &&
							selected)
					) {
						updatedRowValues[i].selected = selected;
					} else {
						updatedRowValues[i].selected = false;
					}
				}

				updatedRecords[rowIndex].recordValues = updatedRowValues;
			}

			updatedRecords.forEach((record) => {
				if (record.recordValues.some((r) => r.selected)) {
					obj[record.name] = record.recordValues.find((r) => r.selected).value;
				}
			});

			updateState({ records: updatedRecords });
			dispatch("UPDATE_PAYLOAD_OBJECT", { mergeValues: obj });
		},
		// Payload from this action will be used to render new merged form
		UPDATE_PAYLOAD_OBJECT: ({ action }) => {
			const { mergeValues } = action.payload;
		},
		[COMPONENT_RENDERED]: {
			effect({ state, host }) {
				// console.log(state, host);
			},
		},
	},
	initialState: {
		records: [],
		selectedColumn: null,
	},
	transformState(state) {
		// Sets the initial state if data exists
		if (state.properties.records.length && !state.records.length) {
			const fieldRows = [];
			const { properties } = state;

			// For each property in first record AFTER first two props, run loop
			for (var n = 2; n < Object.keys(properties.records[0]).length; n++) {
				var fieldLabel = Object.keys(properties.records[0])[n];

				var rowObj = {};

				rowObj.name = fieldLabel;
				const valuesArr = [];

				for (var record in properties.records) {
					if (!!properties.records[record][fieldLabel].displayValue) {
						valuesArr.push({
							value: properties.records[record][fieldLabel].value,
							displayValue: properties.records[record][fieldLabel].displayValue,
							selected: false,
						});
					} else {
						valuesArr.push({ value: null, displayValue: "", selected: false });
					}
				}

				rowObj.recordValues = valuesArr;
				rowObj.different = valuesArr.some(
					(val, i, arr) => val.displayValue !== arr[0].displayValue
				);
				rowObj.selectionMade = false;
				fieldRows.push(rowObj);
			}

			return { ...state, records: fieldRows };
		}

		return state;
	},
	properties: {
		// Uncomment to test
		//records: { default: data },
		records: {}
	},
});
