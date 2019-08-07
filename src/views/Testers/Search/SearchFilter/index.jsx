import React, { Fragment, useState, useEffect } from 'react';
import { FilterProvider, FilterConsumer } from './context';
import { COUNTRIES, GENDERS } from 'libs';
import {
	CheckFilter,
	RadioFilter,
	RangeFilter
} from 'components/FilterComponents';

// COUNTIES,
// COUNTRIES,
// EDUCATION_STAGES,
// EMPLOYEE_COUNTS,
// EMPLOYMENT_SECTORS,
// EMPLOYMENT_STATUSES,
// ETHNICITIES,
// GENDERS,
// MARITAL_STATUSES,
// TITLES

const FILTER_KEY = {
	country: 'Country',
	gender: 'Gender',
	age: 'Age'
};

const SearchFilter = () => {
	const [filterValues, setFilter] = useState({});

	const getFilterValues = (key, type = null) => {
		if (Object.prototype.hasOwnProperty.call(filterValues, key))
			return filterValues[key];

		if (type && type.trim() !== 'checkbox') return '';
		return [];
	};

	const valueSetup = (type, key, eventValue) => {
		let returnVal;
		const stateFilterValue = filterValues[key];

		//checkbox, radio, select. range
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
			case 'select':
				returnVal = eventValue;
				break;
			default:
				break;
		}

		return returnVal;
	};

	const onChange = (e, key, type, value) => {
		console.log('onChange', e.target.value, key, type, value);
		let keyValue = {};
		let initValue;
		let eventValue = e.target.value;

		//checkbox, radio, select. range
		switch (type) {
			case 'checkbox':
				initValue = [eventValue];
				break;
			case 'radio':
			case 'select':
				initValue = eventValue;
				break;
			case 'range':
				initValue = value;
				break;
			default:
				break;
		}

		if (
			getFilterValues &&
			typeof getFilterValues(key) !== 'number' &&
			getFilterValues(key).length
		) {
			keyValue = { [key]: valueSetup(type, key, eventValue) };
		} else if (
			getFilterValues &&
			typeof getFilterValues(key) !== 'number'
		) {
			keyValue = { [key]: valueSetup(type, key, value) };
		} else {
			keyValue = { [key]: initValue };
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
						<CheckFilter
							data={COUNTRIES}
							onChange={e =>
								onChange(e, FILTER_KEY['country'], 'checkbox')
							}
							title={FILTER_KEY['country']}
							checked={getFilterValues(
								FILTER_KEY['country'],
								'checkbox'
							)}
						/>
						<RadioFilter
							data={GENDERS}
							onChange={e =>
								onChange(e, FILTER_KEY['gender'], 'radio')
							}
							title={FILTER_KEY['gender']}
							value={getFilterValues(
								FILTER_KEY['gender'],
								'radio'
							)}
						/>
						<RangeFilter
							title={FILTER_KEY['age']}
							onChange={(e, value) =>
								onChange(e, FILTER_KEY['age'], 'range', value)
							}
							value={getFilterValues(FILTER_KEY['age'], 'range')}
						/>
						Age Marital Status Children Ethnicity Disability
						Employment Status Business Sector Number of Employees
					</Fragment>
				)}
			</FilterConsumer>
		</FilterProvider>
	);
};

export { SearchFilter as default, SearchFilter };
