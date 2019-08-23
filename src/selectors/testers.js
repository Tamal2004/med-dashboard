import createCachedSelector from 're-reselect';

// Local
import { mapArray, generateTesterList } from 'libs';

const selectTesters = state => state.testers;

// Tester List
export const selectTesterList = createCachedSelector(
    selectTesters,
    ({ list }) => generateTesterList(list)
)(() => 'placeholder');

export const selectTester = createCachedSelector(
    selectTesters,
    (state, index) => index,
    (state, index) => {
        const newObj = {};
        const rowData = state[index];
        const isEditable = value =>
            Object.prototype.hasOwnProperty.call(value, 'editable');
        if (rowData && typeof rowData === 'object') {
            Object.keys(rowData).forEach(key => {
                if (isEditable(rowData[key]))
                    newObj[key] = rowData[key].value || rowData[key].Component;
            });
        }

        return newObj;
    }
)(() => 'placeholder');
