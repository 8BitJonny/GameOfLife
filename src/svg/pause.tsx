import React from 'react'

export default function Pause(props: {className?: string, fillCurrentColor?: boolean, onClick?: () => void}) {
	return <svg className={props.className} width="23" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick}>
		<path className={(props.fillCurrentColor ? "" : "text-white") + " fill-current"} d="M0.91333 22.9999C0.91333 23.5522 1.36105 23.9999 1.91333 23.9999H6.94927C7.50155 23.9999 7.94927 23.5522 7.94927 22.9999V0.999939C7.94927 0.447655 7.50156 -6.10352e-05 6.94927 -6.10352e-05H1.91333C1.36105 -6.10352e-05 0.91333 0.447654 0.91333 0.999939V22.9999ZM15.9852 -6.10352e-05C15.4329 -6.10352e-05 14.9852 0.447654 14.9852 0.999939V22.9999C14.9852 23.5522 15.4329 23.9999 15.9852 23.9999H21.0212C21.5734 23.9999 22.0212 23.5522 22.0212 22.9999V0.999939C22.0212 0.447655 21.5734 -6.10352e-05 21.0212 -6.10352e-05H15.9852Z"/>
	</svg>;
}