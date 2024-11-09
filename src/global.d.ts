declare module "*.module.scss" {
	const classes: { [key: string]: string }
	export default classes
}

declare module "*.module.css" {
	const classes: {
		[key: string]: string
	}
	export default classes
}

declare module "*.jpg" {
	const value: string
	export default value
}
declare module "quill-emoji"