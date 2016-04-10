import * as Const from "./Const.jsx";

let defaultState = {
	items: [],
	content: ""
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case Const.ADD_ITEM:
			state.items.push({"id": action.id, "content": action.content});
			break;
		case Const.CHANGE_INPUT:
			state.content = action.content;
			break;
		case Const.REMOVE_ITEM:
			state.items = state.items.filter((obj) => {
				return obj.id != action.id;
			});
			break;
	}

	return state;
}