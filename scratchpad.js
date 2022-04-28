{fieldRows.map((row) => (
	<tr key={row}>
		<td className="fieldLabel">{row.name}</td>

		{fieldRows.map((innerRow)=>(
			<td key={row.name} className="fieldValue"><div>{innerRow.values}</div></td>
		))}


		{/* FOR EACH fieldRow object, produce an array that collects heach row */}
	</tr>
))}


//////////////////////////////////
{fieldRows.map((innerRow)=>(
	innerRow.recordValues.map((innerRowValue)=>(
		<td key={innerRow.name} className="fieldValue"><div>{innerRowValue}
	</div></td>))
))}
/////////////////////////////////





