import './App.css';
import { Stack } from "@mui/material";
import buttons from './style/buttons.module.css'
import './asset/fonts/fonts.module.css'

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
					style={{width: '40%',
							height: '20%',
							fontFamily: 'backto1982',
							fontSize: '3vw',
							border: '0.2vw solid white'
						}}
					className={buttons.conn_button}
					
				>
					<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					sx={{width: '100%', height: '100%'}}>
					Connect
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
