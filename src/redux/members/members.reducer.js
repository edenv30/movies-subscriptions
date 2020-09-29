import MembersActionsTypes from './members.types';

const INITIAL_STATE = {
    members: [],
    moviesByMember: []
}

const membersReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case MembersActionsTypes.SET_MEMBERS_FROM_FIREBASE:
            return {
                ...state,
                members: action.payload
            }
        case MembersActionsTypes.SET_MOVIES_BY_MEMBER_FROM_FIREBASE:
            return {
                ...state,
                moviesByMember: action.payload
            }
        default: 
            return state;
    }
}

export default membersReducer;