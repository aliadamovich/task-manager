import Card from '@mui/material/Card'

export const Footer = () => {
	return (
		<div style={{marginTop: '20px'}}>
			<Card style={{height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', fontSize: '13px'}}>
				<span>&#169;</span>Created by Alesya Adamovich
			</Card>
		</div>
	)
}


