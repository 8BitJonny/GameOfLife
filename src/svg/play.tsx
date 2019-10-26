import React from 'react'

export default function Play(props: {className?: string, fillCurrentColor?: boolean, onClick?: () => void}) {
	return <svg className={props.className} width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick}>
		<path className={(props.fillCurrentColor ? "" : "text-white") + " fill-current"} d="M1.63548 1.04061C0.971022 0.596201 0.0795288 1.07245 0.0795288 1.87183V22.1281C0.0795288 22.9274 0.971022 23.4037 1.63548 22.9593L16.7784 12.8312C17.3705 12.4352 17.3705 11.5647 16.7784 11.1687L1.63548 1.04061Z"/>
	</svg>;
}