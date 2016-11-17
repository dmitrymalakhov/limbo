export const save = (state) => {
	localStorage.setItem("state", JSON.stringify(state));
}

export const load = () => {
	return JSON.parse(localStorage.getItem("state"))
}