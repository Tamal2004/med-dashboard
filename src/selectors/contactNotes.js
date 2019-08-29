import createCachedSelector from 're-reselect';

// Local
import { selectIndividual as selectTesterIndividual } from './testers';

// Session Id
export const selectContactNoteId = createCachedSelector(
    selectTesterIndividual,
    (state, contactNoteIndex) => contactNoteIndex,
    ({ contactNotes = [] }, contactNoteIndex) => {
        return contactNotes[contactNoteIndex] && contactNotes[contactNoteIndex].id;
    }
)(() => 'placeholder');
