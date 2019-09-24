// Local
import initialState from './initialState';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_SESSION,
    UPDATE_SESSION,
    MAIL_TESTER,
    CREATE_CONTACT_NOTE,
    UPDATE_CONTACT_NOTE,
    REMOVE_CONTACT_NOTE,
    FETCH_TESTER,
    LIST_TESTERS,
    LIST_TESTERS_SEARCH,
    LIST_INCOMPLETE_PROJECTS,
    SET_FILTERS,
    SET_PAGE,
    SET_SORT_INDEX
} from 'actionTypes';

const testersReducer = (
    state = initialState,
    { type, payload, async, meta, ...action }
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
            const { queryId, isFinal } = meta;
            switch (async) {
                case REQUEST: {
                    return { ...state, search: [], queryId, isSearching: true };
                }
                case SUCCESS: {
                    return state.queryId === queryId
                        ? {
                              ...state,
                              search: [...state.search, ...payload],
                              isSearching: !isFinal
                          }
                        : state;
                }
                case FAIL: {
                    return { ...state, isSearching: false };
                }
                default: {
                    return state;
                }
            }
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

        case SET_FILTERS: {
            return { ...state, filters: payload };
        }

        case SET_PAGE: {
            return { ...state, page: payload };
        }

        case SET_SORT_INDEX: {
            return { ...state, sortIndex: payload };
        }

        default: {
            return state;
        }
    }
};

export { testersReducer as default, testersReducer };
