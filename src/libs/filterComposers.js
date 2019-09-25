// Local
import { today } from 'libs';

export const composeFilters = filters => {
    // Local: DB
    const formatFilters = {
        'marital-statuses': 'maritalStatus',
        ethnicities: 'ethnicity',
        'business-sectors': 'employmentSector',
        'employee-counts': 'employeeCount',
        'employment-statuses': 'employmentStatus',
        children: 'hasChildren'
    };

    const localFilters = Object.keys(formatFilters);

    const calculateDob = age => {
        const now = today();

        let nowArray = now.split('-');
        nowArray[0] = nowArray[0] - age;

        return nowArray.join('-');
    };

    return Object.entries(filters).reduce((acm, [key, values]) => {
        if (!!values.length) {
            let filterKey = key;
            let filterValues = values;

            if (localFilters.includes(key)) filterKey = formatFilters[key];

            if (key === 'children') {
                return [
                    ...acm,
                    {
                        or: filterValues.map(filterValue => ({
                            [filterKey]: { eq: filterValue === 'Yes' }
                        }))
                    }
                ];
            }

            if (key === 'disability') {
                const query = {
                    [filterKey]: { between: ['A', 'Z'] }
                };

                return [
                    ...acm,
                    {
                        or: values.map(value =>
                            value === 'Yes' ? query : { not: query }
                        )
                    }
                ];
            }

            if (key === 'age') {
                return [
                    ...acm,
                    {
                        or: {
                            dob: {
                                between: [
                                    calculateDob(filterValues[1]),
                                    calculateDob(filterValues[0])
                                ]
                            }
                        }
                    }
                ];
            }

            return [
                ...acm,
                {
                    or: filterValues.map(filterValue => ({
                        [filterKey]: { contains: filterValue }
                    }))
                }
            ];
        } else return acm;
    }, []);
};

const searchFields = ['firstName', 'surname', 'email'];
export const composeSearch = search => {
    const searchValues = search.split(' or ').map(x => x.trim());

    const searchQueries = searchValues
        .map(searchValue =>
            searchFields.map(searchField => ({
                [searchField]: { contains: searchValue }
            }))
        )
        .flatMap(x => x);
    return search
        ? [
              {
                  or: searchQueries
              }
          ]
        : [];
};
