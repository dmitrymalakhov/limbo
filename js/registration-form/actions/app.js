'use strict';

export const APP_GET_MOST_RELEVANT_PROFESSION = "getMostRelevantProfession";

export const getMostRelevantProfession = query => ({
	type: APP_GET_MOST_RELEVANT_PROFESSION,
	query
});
