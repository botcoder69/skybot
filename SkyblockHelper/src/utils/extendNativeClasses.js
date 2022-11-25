function extendNativeClasses(
	options = { extendArray: false, extendObject: false }
) {
	if (options.extendArray) require('./extend-native/Array');
	if (options.extendObject) require('./extend-native/Object');
}

module.exports = extendNativeClasses;