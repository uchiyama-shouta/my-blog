const sortWithProp = (name, reversed) => (a, b) => {
	if (reversed) {
		return a[name] < b[name] ? 1 : -1;
	} else {
		return a[name] < b[name] ? -1 : 1;
	}
};
