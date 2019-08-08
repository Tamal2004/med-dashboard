import React, { Fragment, useState, useEffect } from 'react';
import { FilterProvider, FilterConsumer } from './context';
import {
	NATIONALITIES,
	COUNTIES,
	EDUCATION_STAGES,
	EMPLOYEE_COUNTS,
	EMPLOYMENT_SECTORS,
	EMPLOYMENT_STATUSES,
	ETHNICITIES,
	GENDERS,
	MARITAL_STATUSES,
	TITLES
} from 'libs';

import {
	CheckFilter,
	RadioFilter,
	RangeFilter
} from 'components/FilterComponents';

const FILTER_KEY = {
	age: 'Age',
	county: 'County',
	country: 'Country',
	education: 'Education Stages',
	'employee-counts': 'Employee Counts',
	'employment-sectors': 'Employment Sectors',
	'employment-statuses': 'Employment Statuses',
	ethnicity: 'Ethnicity',
	'marital-statuses': 'Marital Statuses',
	titles: 'Titles',
	gender: 'Gender'
};

const SearchFilter = () => {
	const [filterValues, setFilter] = useState({});

	const storeKey = key =>
		key
			.split(' ')
			.join('-')
			.toLowerCase();

	const getFilterValues = (key, type = null) => {
		const theKey = storeKey(key);
		if (Object.prototype.hasOwnProperty.call(filterValues, theKey))
			return filterValues[storeKey(theKey)];

		if (type && type.trim() === 'checkbox') return [];
		return '';
	};

	const valueSetup = (type, key, eventValue) => {
		let returnVal;
		const stateFilterValue = filterValues[key];

		//checkbox, radio. range
		switch (type) {
			case 'checkbox':
				const newValueExists = stateFilterValue.indexOf(eventValue);
				if (newValueExists >= 0) {
					stateFilterValue.splice(newValueExists, 1);
				} else {
					stateFilterValue.push(eventValue.trim());
				}
				returnVal = [...stateFilterValue];
				break;
			case 'radio':
			case 'range':
				returnVal = eventValue;
				break;
			default:
				break;
		}

		return returnVal;
	};

	const onChange = (e, key, type, value) => {
		const theKey = storeKey(key);
		let keyValue = {};
		let initValue;
		let eventValue = e.target.value;
		const filterValue = getFilterValues(theKey);

		//checkbox, radio, range
		switch (type) {
			case 'checkbox':
				initValue = [eventValue];
				break;
			case 'radio':
				initValue = eventValue;
				break;
			case 'range':
				initValue = value;
				eventValue = value;
				break;
			default:
				break;
		}

		if (filterValue && filterValue.length) {
			keyValue = { [theKey]: valueSetup(type, theKey, eventValue) };
		} else {
			keyValue = { [theKey]: initValue };
		}

		setFilter({ ...filterValues, ...keyValue });
	};

	useEffect(() => {
		//call API
		console.log('State Updated', filterValues);
	}, [filterValues]);

	return (
		<FilterProvider
			value={{
				onChange
			}}
		>
			<FilterConsumer>
				{({ onChange }) => (
					<Fragment>
						<RangeFilter
							title={FILTER_KEY['age']}
							onChange={(e, value) =>
								onChange(e, FILTER_KEY['age'], 'range', value)
							}
							value={getFilterValues(FILTER_KEY['age'])}
						/>
						<CheckFilter
							data={NATIONALITIES}
							onChange={e =>
								onChange(e, FILTER_KEY['country'], 'checkbox')
							}
							title={FILTER_KEY['country']}
							checked={getFilterValues(
								FILTER_KEY['country'],
								'checkbox'
							)}
						/>
						<CheckFilter
							data={COUNTIES}
							onChange={e =>
								onChange(e, FILTER_KEY['county'], 'checkbox')
							}
							title={FILTER_KEY['county']}
							checked={getFilterValues(
								FILTER_KEY['county'],
								'checkbox'
							)}
						/>
						<RadioFilter
							data={GENDERS}
							onChange={e =>
								onChange(e, FILTER_KEY['gender'], 'radio')
							}
							title={FILTER_KEY['gender']}
							value={getFilterValues(FILTER_KEY['gender'])}
						/>
						Marital Status Children Ethnicity Disability Employment
						Status Business Sector Number of Employees
					</Fragment>
				)}
			</FilterConsumer>
		</FilterProvider>
	);
};

export { SearchFilter as default, SearchFilter };
