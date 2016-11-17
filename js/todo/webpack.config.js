module.exports = {
    context: __dirname,
    entry: "./src/app",
    output: {
        path: "./dist/js",
        filename: "bundle.js"
    }
    module: {
			loaders: []
		}
}