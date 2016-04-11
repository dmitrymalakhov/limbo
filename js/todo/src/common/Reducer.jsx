import * as Const from "./Const.jsx";
import * as LocalStorage from "./LocalStorage.jsx";

import _ from "lodash";

let defaultState = {
	items: [],
	content: ""
};

export default (state = _.merge(defaultState, LocalStorage.load()), action) => {
	switch(action.type) {
		case Const.ADD_ITEM:
			if(action.content.length) {
				state.items.push({"id": action.id, "content": action.content, "completed": false});
				state.content = "";
			}
			break;
		case Const.REMOVE_ITEM:
			state.items = state.items.filter((obj) => {
				return obj.id != action.id;
			});
			break;
		case Const.COMPLETE_ITEM:
			state.items = state.items.map((obj) => {
				if(obj.id == action.id) {
					obj.completed = action.completed;
				}
				return obj;
			});
			break;
		case Const.CHANGE_INPUT:
			state.content = action.content;
			break;
	}

	LocalStorage.save(state);
	return state;
}