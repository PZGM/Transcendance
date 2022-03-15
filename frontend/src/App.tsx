import './App.css';
import { Stack } from "@mui/material";
import { sizing } from '@mui/system';



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

				<img
				src={require('./asset/images/42connect.png')}
				onClick={() => window.open(process.env.REACT_APP_URL_AUTH, "_self")}
				style={{width: '20%'}}
				/>
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
