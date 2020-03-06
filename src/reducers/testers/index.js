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
    LIST_TESTER_FILTER_DATA,
    LIST_INCOMPLETE_PROJECTS,
    SET_FILTERS,
    RESET_FILTERS,
    SET_PAGE,
    SET_SORT_INDEX,
    SET_SORT_INDICES
} from 'actionTypes';

const testersReducer = (
    state = initialState,
    { type, payload, async, meta, ...action }
) => {
    const {
        search,
        search: { results }
    } = state;
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

        case LIST_TESTERS_SEARCH: {
            const { queryId, isFinal } = meta;
            switch (async) {
                case REQUEST: {
                    return {
                        ...state,
                        search: {
                            ...search,
                            results: [],
                            queryId,
                            isSearching: true
                        }
                    };
                }
                case SUCCESS: {
                    return state.search.queryId === queryId
                        ? {
                              ...state,
                              search: {
                                  ...search,
                                  results: [...results, ...payload],
                                  isSearching: !isFinal
                              }
                          }
                        : state;
                }
                case FAIL: {
                    return {
                        ...state,
                        search: { ...search, isSearching: false }
                    };
                }
                default: {
                    return state;
                }
            }
        }

        case LIST_TESTER_FILTER_DATA: {
            if (isSuccess) {
                const { towns: townsPayload, jobs: jobsPayload } = payload;

                const jobs = jobsPayload
                    ? [...new Set([...search.jobs, ...jobsPayload])]
                    : [];
                const towns = townsPayload
                    ? [...new Set([...search.towns, ...townsPayload])]
                    : [];

                return {
                    ...state,
                    search: {
                        ...search,
                        jobs,
                        towns
                    }
                };
            } else return state;
        }

        case SET_FILTERS: {
            return { ...state, search: { ...search, filters: payload } };
        }

        case RESET_FILTERS: {
            return {
                ...state,
                search: { ...initialState.search }
            };
        }

        case SET_PAGE: {
            return { ...state, search: { ...search, page: payload } };
        }

        case SET_SORT_INDEX: {
            return { ...state, search: { ...search, sortIndex: payload } };
        }

        case SET_SORT_INDICES: {
            return { ...state, search: { ...search, sortIndices: payload } };
        }

        default: {
            return state;
        }
    }
};

export { testersReducer as default, testersReducer };
