const test = () => {
	return (
		<div>
			<table>
				{/* Always make table, always make first row
				 ** For each object in data, AFTER th[0], create th forEach data.number.value
				 */}
				<tr>
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

				{/* For data[0], for each prop AFTER the first 2, create a row for each prop
				 ** For Row, for each object in data, create a TD
				 */}
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

export default test;
