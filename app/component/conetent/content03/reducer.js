let initState = {
    data: [{
        name: 'doudou',
        age: 32,
        phone: 123456789,
        email: '123456789@163.com',
        key: 1,
    }]
};

function user(state = initState, action) {
    const data = state.data;
    switch (action.type) {
        case 'ADD_ONE_USER':
            data[data.length] = action.payload;
            return {data: data};
        default:
            return state;
    }
}
export default user;