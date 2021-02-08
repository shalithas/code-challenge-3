
import { ACTION_TYPES } from 'constant';
const INITIAL_STATE = {
    rloader: false,
    floader: false,
    bloader: false,
    released: [],
    featured: [],
    browse: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ACTION_TYPES.RELEASED_REQUEST:
            return { ...state, rloader: true }
        case ACTION_TYPES.RELEASED_SUCCESS:
            return { ...state, rloader: false, released: action.payload }
        case ACTION_TYPES.RELEASED_FAILED:
            return { ...state, rloader: false }

        case ACTION_TYPES.FEATURED_REQUEST:
            return { ...state, floader: true }
        case ACTION_TYPES.FEATURED_SUCCESS:
            return { ...state, floader: false, featured: action.payload }
        case ACTION_TYPES.FEATURED_FAILED:
            return { ...state, rloader: false }

        case ACTION_TYPES.BROWSE_REQUEST:
            return { ...state, bloader: true }
        case ACTION_TYPES.BROWSE_SUCCESS:
            return { ...state, bloader: false, browse: action.payload }
        case ACTION_TYPES.BROWSE_FAILED:
            return { ...state, bloader: false }

            case ACTION_TYPES.RESET:
                return INITIAL_STATE
            case ACTION_TYPES.LOG_OUT:
                return INITIAL_STATE
        default:
            return state;
    }
}
