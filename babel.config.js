module.exports = (api) => {
	api.cache(true)
	return {
		presets: [
			['babel-preset-expo', { jsxImportSource: 'nativewind' }],
			'nativewind/babel',
		],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@assets': './src/assets/images',
						'@components': './src/components',
						'@store': './src/store',
						'@utils': './src/utils',
						'@': './src',
					},
				},
			],
		],
	}
}
