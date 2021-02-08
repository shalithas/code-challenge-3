
import { ACTION_TYPES } from 'constant';
const INITIAL_STATE = {
    token:null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_SPOTIFY_TOKEN:
            return { ...state, token: action.payload }

            case ACTION_TYPES.RESET:
                return INITIAL_STATE
            case ACTION_TYPES.LOG_OUT:
                return INITIAL_STATE
        default:
            return state;
    }
}
