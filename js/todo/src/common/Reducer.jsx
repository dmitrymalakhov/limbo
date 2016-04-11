import * as Const from "./Const.jsx";
import * as LocalStorage from "./LocalStorage.jsx";

import _ from "lodash";

let defaultState = {
	items: [],
	content: "",
	lastID: 0
};

export default (state = _.merge(defaultState, LocalStorage.load()), action) => {
	switch(action.type) {
		case Const.ADD_ITEM:
			if(action.content.length) {
				state.lastID++;

				state.items.push({"id": state.lastID, "content": action.content, "completed": false, "show": true});
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
		case Const.CHANGE_SORT:
			state.items = _.sortBy(state.items, function(item) {
				return [item[action.sort]];
			});
			break;
		case Const.CHANGE_FILTER:
			state.items.map((obj) => {
				obj.show = true;

				if(action.filter == "completed") {
					if(obj.completed == false) {
						obj.show = false;
					}
				} else if(action.filter == "uncompleted") {
					if(obj.completed == true) {
						obj.show = false;
					}
				}

				return obj;
			});
			break;
	}

	LocalStorage.save(state);
	return state;
}