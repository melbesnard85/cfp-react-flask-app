import React from 'react';
import { colors, Typography } from '@material-ui/core';
import CSVReader from 'react-csv-reader';
import { isValidCSV } from '../../utilities/csvValidation'
import DataTable from 'react-data-table-component';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file_info: {},
			is_valid_csv: true,
			columns: [],
			data: []
		};
	}
	render() {

		const papaparseOptions = {
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true,
			transformHeader: (header) =>
				header.toLowerCase().replace(/\W/g, '_'),
		};
		const uploadCSV = () => {
			const csvContent = document.getElementById('csv-content');
			document.getElementById('react-csv-reader-input').click();
		};
		const handleForce = (data, file_info) => {
			console.log(data, file_info);
			let columns = [];
			const is_valid_csv = isValidCSV(data);
			const dataKeys = Object.keys(data[0]);
			if (is_valid_csv) {
				console.log(is_valid_csv)
				columns = dataKeys.map(dataKey => {
					return {
						name: dataKey.toUpperCase().replaceAll('_', ' '),
						selector: row => row[dataKey],
						sortable: true
					}
				})
			}
			
			this.setState({
				file_info: file_info,
				is_valid_csv: is_valid_csv,
				columns: columns,
				data: data
			})
		};

		return (
			<>
				<Typography variant="h5">CSV Reader</Typography>
				<div
					className="upload-container"
					id="csv-content"
					onClick={uploadCSV}
				>
					{this.state.file_info.name ? this.state.file_info.name : 'Upload CSV'}
					{this.state.is_valid_csv ? '' : <div className='invalid-csv'>Invalid CSV. Please upload valid CSV again.</div>}
				</div>
				<CSVReader
					cssClass="react-csv-input"
					label="Select CSV with secret Death Star statistics"
					onFileLoaded={handleForce}
					parserOptions={papaparseOptions}
				/>
				<div style={{ display: this.state.is_valid_csv ? "block" : "none" }}>
					<DataTable
						title="Community feedback"
						columns={this.state.columns}
						data={this.state.data}
						pagination
						highlightOnHover
					/>
				</div>
			</>
		);
	}
}

export default Home;
