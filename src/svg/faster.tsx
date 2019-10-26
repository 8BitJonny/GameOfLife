import React from 'react'

export default function Faster(props: {className?: string, fillCurrentColor?: boolean, onClick?: () => void}) {
	return <svg className={props.className} width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick}>
		<path className={(props.fillCurrentColor ? "" : "text-white") + " fill-current"} d="M0.909119 19.2571L14.4208 9.71943L0.909119 0.181763V19.2571ZM15.2156 0.181763V19.2571L28.7273 9.71943L15.2156 0.181763Z"/>
	</svg>;
}