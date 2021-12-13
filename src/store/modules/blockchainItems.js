const namespaced = true


const state = {
	contract:null,
    posts:[
        ['Welcome to the Nobody Decentralized Community!', 'You are seeing this because your are not connected with Metamask. Please click the "Connect Account" button to get started.', '5f0d9404cfd1ebeda471fb3cebd4040e28c80e67']
    ]
};

const getters = {
	getContract: (state) => state.contract,
	getAllPosts: (state) => state.posts
};

const mutations = {
	setContract: (state, contract) => (state.contract = contract),
	setPosts: (state, posts) => (state.posts = posts)
};

const actions = {
};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions,
}
