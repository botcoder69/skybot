function extendNativeClasses(options: ExtendNativeClassesOptions);

interface ExtendNativeClassesOptions {
	extendArray?: boolean;
	extendObject?: boolean;
}

export = extendNativeClasses;