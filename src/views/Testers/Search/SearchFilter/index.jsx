import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { FilterProvider, FilterConsumer } from './context';

import {
    EMPLOYEE_COUNTS,
    EMPLOYMENT_SECTORS,
    EMPLOYMENT_STATUSES,
    ETHNICITIES,
    GENDERS,
    MARITAL_STATUSES
} from 'libs';

import {
    TownCheckFilter,
    JobCheckFilter,
    CheckFilter,
    RangeFilter
} from 'components/FilterComponents';

// Selectors
import { selectFilters } from 'selectors';

// Actions
import { setFilter, listTesterFilterData } from 'actions';

const FILTER_KEY = {
    age: 'Age',
    children: 'Children',
    county: 'County',
    country: 'Country',
    disability: 'Disability',
    education: 'Education Stages',
    'employee-counts': 'Employee Counts',
    'business-sectors': 'Business Sectors',
    'employment-statuses': 'Employment Statuses',
    ethnicities: 'Ethnicities',
    'marital-statuses': 'Marital Statuses',
    titles: 'Titles',
    gender: 'Gender',
    town: 'Town',
    jobTitle: 'Job Title'
};

const TOGGLE_DATA = ['Yes', 'No'];

const SearchFilter = ({ filterValues, setFilter, listTesterFilterData }) => {
    useEffect(() => {
        listTesterFilterData();
    }, [listTesterFilterData]);

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
        let eventValue = e ? e.target.value : null;
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

    return (
        <FilterProvider
            value={{
                onChange
            }}
        >
            <FilterConsumer>
                {({ onChange }) => (
                    <Fragment>
                        <TownCheckFilter
                            onChange={e =>
                                onChange(e, FILTER_KEY['town'], 'checkbox')
                            }
                            title={FILTER_KEY['town']}
                            checked={getFilterValues(
                                FILTER_KEY['town'],
                                'checkbox'
                            )}
                        />
                        <JobCheckFilter
                            onChange={e =>
                                onChange(e, FILTER_KEY['jobTitle'], 'checkbox')
                            }
                            title={FILTER_KEY['jobTitle']}
                            checked={getFilterValues(
                                FILTER_KEY['jobTitle'],
                                'checkbox'
                            )}
                        />

                        <CheckFilter
                            data={GENDERS}
                            onChange={e =>
                                onChange(e, FILTER_KEY['gender'], 'checkbox')
                            }
                            title={FILTER_KEY['gender']}
                            checked={getFilterValues(
                                FILTER_KEY['gender'],
                                'checkbox'
                            )}
                        />

                        <RangeFilter
                            title={FILTER_KEY['age']}
                            onChange={(e, value) =>
                                onChange(e, FILTER_KEY['age'], 'range', value)
                            }
                            onBlur={() => {}}
                            value={getFilterValues(FILTER_KEY['age'])}
                            step={1}
                        />

                        <CheckFilter
                            data={MARITAL_STATUSES}
                            onChange={e =>
                                onChange(
                                    e,
                                    FILTER_KEY['marital-statuses'],
                                    'checkbox'
                                )
                            }
                            title={'Marital Status'}
                            checked={getFilterValues(
                                FILTER_KEY['marital-statuses'],
                                'checkbox'
                            )}
                        />

                        <CheckFilter
                            data={TOGGLE_DATA}
                            onChange={e =>
                                onChange(e, FILTER_KEY['children'], 'checkbox')
                            }
                            title={FILTER_KEY['children']}
                            checked={getFilterValues(
                                FILTER_KEY['children'],
                                'checkbox'
                            )}
                        />

                        <CheckFilter
                            data={ETHNICITIES}
                            onChange={e =>
                                onChange(
                                    e,
                                    FILTER_KEY['ethnicities'],
                                    'checkbox'
                                )
                            }
                            title={'Ethnicity'}
                            checked={getFilterValues(
                                FILTER_KEY['ethnicities'],
                                'checkbox'
                            )}
                        />

                        <CheckFilter
                            data={TOGGLE_DATA}
                            onChange={e =>
                                onChange(
                                    e,
                                    FILTER_KEY['disability'],
                                    'checkbox'
                                )
                            }
                            title={FILTER_KEY['disability']}
                            checked={getFilterValues(
                                FILTER_KEY['disability'],
                                'checkbox'
                            )}
                        />

                        <CheckFilter
                            data={EMPLOYMENT_STATUSES}
                            onChange={e =>
                                onChange(
                                    e,
                                    FILTER_KEY['employment-statuses'],
                                    'checkbox'
                                )
                            }
                            title={'Employment Status'}
                            checked={getFilterValues(
                                FILTER_KEY['employment-statuses'],
                                'checkbox'
                            )}
                        />

                        <CheckFilter
                            data={EMPLOYMENT_SECTORS}
                            onChange={e =>
                                onChange(
                                    e,
                                    FILTER_KEY['business-sectors'],
                                    'checkbox'
                                )
                            }
                            title={'Business Sector'}
                            checked={getFilterValues(
                                FILTER_KEY['business-sectors'],
                                'checkbox'
                            )}
                        />

                        <CheckFilter
                            data={EMPLOYEE_COUNTS}
                            onChange={e =>
                                onChange(
                                    e,
                                    FILTER_KEY['employee-counts'],
                                    'checkbox'
                                )
                            }
                            title={'Employee Count'}
                            checked={getFilterValues(
                                FILTER_KEY['employee-counts'],
                                'checkbox'
                            )}
                        />
                    </Fragment>
                )}
            </FilterConsumer>
        </FilterProvider>
    );
};

const mapState = state => ({
    filterValues: selectFilters(state)
});

const mapDispatch = { setFilter, listTesterFilterData };

const _SearchFilter = connect(
    mapState,
    mapDispatch
)(SearchFilter);

export { _SearchFilter as default, _SearchFilter as SearchFilter };
