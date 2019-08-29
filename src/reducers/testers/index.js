// Local
import initialState from './initialState';

// Action Types
import {
    SUCCESS,
    CREATE_SESSION,
    UPDATE_SESSION,
    CREATE_CONTACT_NOTE,
    UPDATE_CONTACT_NOTE,
    REMOVE_CONTACT_NOTE,
    FETCH_TESTER,
    LIST_TESTERS,
    LIST_INCOMPLETE_PROJECTS
} from 'actionTypes';

const testersReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    const isSuccess = async === SUCCESS;
    switch (type) {
        case FETCH_TESTER: {
            return isSuccess ? { ...state, individual: payload } : state;
        }

        case LIST_TESTERS: {
            return isSuccess ? { ...state, list: payload } : state;
        }

        case LIST_INCOMPLETE_PROJECTS: {
            return isSuccess
                ? {
                      ...state,
                      individual: { ...state.individual, projects: payload }
                  }
                : state;
        }

        case CREATE_CONTACT_NOTE: {
            return isSuccess
                ? {
                      ...state,
                      individual: {
                          ...state.individual,
                          contactNotes: [
                              ...state.individual.contactNotes,
                              payload
                          ]
                      }
                  }
                : state;
        }

        case UPDATE_CONTACT_NOTE: {
            return isSuccess
                ? {
                      ...state,
                      individual: {
                          ...state.individual,
                          contactNotes: state.individual.contactNotes.map(
                              contactNote =>
                                  contactNote.id === payload.id
                                      ? payload
                                      : contactNote
                          )
                      }
                  }
                : state;
        }

        case REMOVE_CONTACT_NOTE: {
            return isSuccess
                ? {
                      ...state,
                      individual: {
                          ...state.individual,
                          contactNotes: state.individual.contactNotes.filter(
                              ({ id }) => id !== payload
                          )
                      }
                  }
                : state;
        }

        case CREATE_SESSION: {
            return isSuccess
                ? {
                      ...state,
                      individual: {
                          ...state.individual,
                          sessions: [...state.individual.sessions, payload]
                      }
                  }
                : state;
        }

        case UPDATE_SESSION: {
            return isSuccess
                ? {
                      ...state,
                      individual: {
                          ...state.individual,
                          sessions: state.individual.sessions.map(session =>
                              session.id === payload.id ? payload : session
                          )
                      }
                  }
                : state;
        }

        default: {
            return state;
        }
    }
};

export { testersReducer as default, testersReducer };
