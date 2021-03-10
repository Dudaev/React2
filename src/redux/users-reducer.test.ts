import usersReducer, { actions, InitialStateType } from "./users-reducer";



let state: InitialStateType

beforeEach(() => {
    state = {
        users: [{
            name: 'DDDDD',
            id: 0,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null
            },
            status: null,
            followed: false
          },
          {
            name: 'lowgain',
            id: 1,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null
            },
            status: null,
            followed: false
          },
          {
            name: 'timaboi',
            id: 2,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null
            },
            status: null,
            followed: true
          },
          {
            name: 'Alesandr',
            id: 3,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null
            },
            status: null,
            followed: true
          }],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        fake: 10
    }
})

test('followSuccess', () => {
    let newState = usersReducer(state, actions.followSuccess(1))
    
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()

});

test('followSuccess', () => {
    let newState = usersReducer(state, actions.unfollowSuccess(3))
    
    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()

});

