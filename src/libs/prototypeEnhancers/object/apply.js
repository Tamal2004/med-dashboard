export default (data, callback) =>
	Object.entries(data).reduce(
		(acc, [key, value]) => ({ ...acc, [key]: callback(value, key) }),
		{}
	);