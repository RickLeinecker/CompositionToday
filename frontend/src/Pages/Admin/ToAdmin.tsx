import { Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'

export default function ToAdmin() {
	return (
		<Container>
			<h1 style={{ textAlign: "center" }}>
				Go To...
			</h1>
			<Container style={{ display: "flex", height: "100%", justifyContent: "space-around", alignItems: "center" }}>
				<Link to="/" >
					<Button variant='contained' >
						Main Site
					</Button>
				</Link>
				<Link to="/dashboard" >
					<Button variant='contained' >
						Admin Page
					</Button>
				</Link>
			</Container>
		</Container>
	)
}
