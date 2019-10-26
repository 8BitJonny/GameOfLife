import React from 'react'

export default function Edit(props: {className?: string, fillCurrentColor?: boolean, onClick?: () => void}) {
	return <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick}>
		<path className={(props.fillCurrentColor ? "" : "text-white") + " fill-current"} d="M14.7909 4.35001L19.4511 9.01019L7.65482 20.8065L2.99723 16.1463L14.7909 4.35001ZM22.9873 3.22608L20.9091 1.1478C20.1059 0.344614 18.8017 0.344614 17.9958 1.1478L16.005 3.13859L20.6652 7.79881L22.9873 5.47667C23.6103 4.85367 23.6103 3.84903 22.9873 3.22608ZM0.55844 22.6966C0.473629 23.0783 0.818241 23.4203 1.19997 23.3275L6.39302 22.0684L1.73543 17.4082L0.55844 22.6966Z"/>
	</svg>;
}