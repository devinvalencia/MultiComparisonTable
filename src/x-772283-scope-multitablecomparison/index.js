import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
const {COMPONENT_RENDERED} = actionTypes;
// Uncomment below for test data, then use as default in properties for testing
const data = require("./data.json");
const view = (state, { dispatch, updateState }) => {
    const {properties, records, selectedColumn} = state;
    const updateSelection = (rowIndex, columnIndex, selected) => {
        dispatch('TABLE_CELL_SELECTED', {records: state.records, rowIndex, columnIndex, selected});
    }
    return (
        <div>
            <table>
                <tr>
                    <th className="ignore"></th>
                    {properties.records.map((record, index) => (
                        <th key={index} className={"recordLabel " + (selectedColumn === index ? 'selected' : '')}>
                            <div on-click={() => updateState({selectedColumn: index})}>{record.number.value}</div>
                        </th>
                    ))}
                </tr>
                {records.map((row, rowIndex) => (
                    <tr key={rowIndex} className={(row.different ? 'highligted' : '')}>
                        <td className="fieldLabel">{row.name}</td>
                        {row.recordValues.map((recordValue, colIndex) => (
                            <td key={colIndex} className={"fieldValue " + (recordValue.selected ? 'selected' : '')} on-click={() => updateSelection(rowIndex, colIndex, !recordValue.selected)}>
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
        TABLE_CELL_SELECTED: ({ action, dispatch, updateState }) => {
            const { records, rowIndex, columnIndex, selected } = action.payload;
            const updatedRecords = [...records];
            const updatedRowValues = [...updatedRecords[rowIndex].recordValues];
            for (let i = 0; i < updatedRowValues.length; i++) {
                if (i === columnIndex ||
                        (updatedRowValues[columnIndex].displayValue === updatedRowValues[i].displayValue && selected)) {
                    updatedRowValues[i].selected = selected;
                } else {
                    updatedRowValues[i].selected = false;
                }
            }
            updatedRecords[rowIndex].recordValues = updatedRowValues;
            updateState({records: updatedRecords});
            // if (eventData.path[2].childNodes[0].nodeName != "TR") {
            //  var obj = {};
            //  for (var node in eventData.path[2].childNodes) {
            //      if (
            //          node < eventData.path[2].childNodes.length &&
            //          eventData.path[0].className != "fieldLabel" &&
            //          eventData.path[2].childNodes[node].nodeName != "TR"
            //      ) {
            //          // If node in row matches text of currently selected cell
            //          if (
            //              eventData.path[2].childNodes[node].innerText ==
            //              eventData.path[1].innerText
            //          ) {
            //              // If node already selected, make unselected
            //              if (eventData.path[2].childNodes[node].className == "selected") {
            //                  if (eventData.path[2].childNodes[node].nodeName != "TH") {
            //                      eventData.path[2].childNodes[node].className =
            //                          "notSelectedField";
            //                  } else if (
            //                      eventData.path[2].childNodes[node].className != "ignore"
            //                  ) {
            //                      eventData.path[2].childNodes[node].className =
            //                          "notSelectedRecord";
            //                  }
            //              } else {
            //                  // Select all nodes that match innner text of current node to selected
            //                  eventData.path[2].childNodes[node].className = "selected";
            //              }
            //          } else if (
            //              eventData.path[2].childNodes[node].className != "fieldLabel"
            //          ) {
            //              if (eventData.path[2].childNodes[node].nodeName != "TH") {
            //                  eventData.path[2].childNodes[node].className =
            //                      "notSelectedField";
            //              } else if (
            //                  eventData.path[2].childNodes[node].className != "ignore"
            //              ) {
            //                  eventData.path[2].childNodes[node].className =
            //                      "notSelectedRecord";
            //              }
            //          }
            //      }
            //  }
            //  // Look at each row
            //  for (var outerNode in eventData.path[3].childNodes) {
            //      // Look at each cell in row
            //      for (var innerNode in eventData.path[3].childNodes[outerNode]
            //          .childNodes) {
            //          if (
            //              eventData.path[3].childNodes[outerNode].childNodes[innerNode]
            //                  .className == "selected"
            //          ) {
            //              if (
            //                  eventData.path[3].childNodes[outerNode].childNodes[0]
            //                      .innerText != ""
            //              ) {
            //                  obj[
            //                      eventData.path[3].childNodes[
            //                          outerNode
            //                      ].childNodes[0].innerText
            //                  ] =
            //                      eventData.path[3].childNodes[outerNode].childNodes[
            //                          innerNode
            //                      ].innerText;
            //                  break;
            //              } else {
            //                  obj.record =
            //                      eventData.path[3].childNodes[outerNode].childNodes[
            //                          innerNode
            //                      ].innerText;
            //              }
            //          }
            //      }
            //  }
            //  dispatch("UPDATE_PAYLOAD_OBJECT", { mergeValues: obj });
            // }
        },
        // Payload from this action will be used to render new merged form
        UPDATE_PAYLOAD_OBJECT: ({ action }) => {
            const { mergeValues } = action.payload;
        },
        [COMPONENT_RENDERED]: {
            effect({state, host}) {
                // console.log(state, host);
            }
        }
    },
    initialState: {
        records: [],
        selectedColumn: -1
    },
    transformState(state) {
        // Sets the initial state if data exists
        if (state.properties.records.length && !state.records.length) {
            const fieldRows = [];
            const {properties} = state;
            // For each property in first record AFTER first two props, run loop
            for (var n = 2; n < Object.keys(properties.records[0]).length; n++) {
                var fieldLabel = Object.keys(properties.records[0])[n];
                var rowObj = {};
                rowObj.name = fieldLabel;
                const valuesArr = [];
                for (var record in properties.records) {
                    if (!!properties.records[record][fieldLabel].displayValue) {
                        valuesArr.push({displayValue: properties.records[record][fieldLabel].displayValue, selected: false});
                    } else {
                        valuesArr.push({displayValue: '(empty)', selected: false});
                    }
                }
                rowObj.recordValues = valuesArr;
                rowObj.different =  valuesArr.some((val, i, arr) => val.displayValue !== arr[0].displayValue)
                fieldRows.push(rowObj);
            }
            return {...state, records: fieldRows};
        }
        return state;
    },
    properties: {
        records: {default: data},
    },
});