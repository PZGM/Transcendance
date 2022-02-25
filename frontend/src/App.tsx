import './App.css';
import { Helmet } from 'react-helmet';
import ConnectButton from './asset/ConnectButton';
import { Stack } from "@mui/material";



function App() {

	
	
	return (
		<div className="App">
			<div className="font-face-gm" >
				<h1 style={{ color: 'red' }}>ft_transcendence</h1>
			</div>
			<Helmet>
				<style>{'body { background-color: black; }'}</style>
			</Helmet>
			
			<Stack
				direction="column"
				justifyContent="space-between"
				alignItems="center"
				className="test"
				>
				<img
					src={require('./asset/images/ft_transcendance.png')}
					className='fit'>
				</img>

            	<img
                src={require('./asset/images/42.gif')}
                onClick={() => window.open(process.env.REACT_APP_URL_AUTH)}
				className='fit'/>

				<div>
					<img
						src={require('./asset/images/afreire_braimbau.png')}
						className='fit'>
					</img>
					<img
						src={require('./asset/images/fmanetti_selgrabl.png')}
						className='fit'>
					</img>
				</div>
			</Stack>
			
			
			
			</div>
	);
}

export default App;
