import terser from '@rollup/plugin-terser';
import ts from "rollup-plugin-ts";

export default {
	input: 'script/main.ts',
	output: {
		file: '/dev/stdout',
		format: 'iife',
		plugins: [terser()]
	},
	plugins: [
		ts({
			tsconfig: "tsconfig.json",
			transpiler: "swc",
		})
	],
};
