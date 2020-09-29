import MembersActionsTypes from './members.types';

export const setMembers = (membersList) => ({
    type: MembersActionsTypes.SET_MEMBERS_FROM_FIREBASE,
    payload: membersList
});

export const setMoviesByMember = (moviesByMember) => ({
    type: MembersActionsTypes.SET_MOVIES_BY_MEMBER_FROM_FIREBASE,
    payload: moviesByMember
})