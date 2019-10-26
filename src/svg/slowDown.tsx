import React from 'react'

export default function SlowDown(props: {className?: string, fillCurrentColor?: boolean, onClick?: () => void}) {
	return <svg className={props.className} width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick}>
		<path className={(props.fillCurrentColor ? "" : "text-white") + " fill-current"} d="M28.0909 0.181875L14.5792 9.71954L28.0909 19.2572L28.0909 0.181875ZM13.7844 19.2572L13.7844 0.181875L0.272701 9.71954L13.7844 19.2572Z"/>
	</svg>;
}