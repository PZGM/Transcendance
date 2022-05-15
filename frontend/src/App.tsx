import { Stack } from "@mui/material";
import './style/buttons.css'

function App() {

	return (

		<div
			style={{
						backgroundColor: 'black',
						height: '100vh'
					}}
	  	>

			<Stack
				direction="column"
				justifyContent="space-between"
				alignItems="center"
				className='stack'
			>
				<img	src={require('./asset/images/ft_transcendance.png')}
						style={{width: '100%'}}
				/>
				
				<div
					onClick={() => window.open(process.env.REACT_APP_URL_AUTH, "_self")}
					className="conn_button"
				>
					<Stack
						direction="row"
						justifyContent="center"
						alignItems="center"
						sx={{width: '100%', height: '100%'}}
					>
						CONNECT
					
						<img
							src={require('./asset/images/42_Logo.png')}
							style={{width: '15%', margin: '2%'}}
						/>
					
					</Stack>
				</div>
				
				<div>
					<img
						src={require('./asset/images/afreire_braimbau.png')}
						style={{width: '50%'}}
						/>
					<img
						src={require('./asset/images/fmanetti_selgrabl.png')}
						style={{width: '50%'}}
						/>
				</div>

			</Stack>

		</div>
	);
}



export default App;
