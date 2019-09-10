// Local
import initialState from './initialState';

// Action Types
import {
    SUCCESS,
    CREATE_SESSION,
    UPDATE_SESSION,
    MAIL_TESTER,
    CREATE_CONTACT_NOTE,
    UPDATE_CONTACT_NOTE,
    REMOVE_CONTACT_NOTE,
    FETCH_TESTER,
    LIST_TESTERS,
    LIST_TESTERS_SEARCH,
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

        case LIST_TESTERS_SEARCH: {
            return isSuccess ? { ...state, search: payload } : state;
        }

        case LIST_INCOMPLETE_PROJECTS: {
            return isSuccess
                ? {
                      ...state,
                      individual: { ...state.individual, projects: payload }
                  }
                : state;
        }

        case MAIL_TESTER:
        case CREATE_CONTACT_NOTE: {
            return isSuccess
                ? {
                      ...state,
                      individual: {
                          ...state.individual,
                          contactNotes: [
                              payload,
                              ...state.individual.contactNotes
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
                          sessions: [payload, ...state.individual.sessions]
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
