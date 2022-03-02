import './App.css';
import { Helmet } from 'react-helmet';
import { Stack } from "@mui/material";



function App() {

	
	
	return (

		<div className="App">
			<Helmet>
				<style>{'body { background-color: black; }'}</style>
			</Helmet>
			
			<Stack
				direction="column"
				justifyContent="space-between"
				alignItems="center"
				className="test"
				>
				<img src={require('./asset/images/ft_transcendance.png')} className='fit' alt=""/>

            	<img
                src={require('./asset/images/42.gif')}
                onClick={() => window.open(process.env.REACT_APP_URL_AUTH)}
				className='fit'
				alt=""/>

				<div>
					<img
						src={require('./asset/images/afreire_braimbau.png')}
						className='fit1'
						alt=""/>
					<img
						src={require('./asset/images/fmanetti_selgrabl.png')}
						className='fit2'
						alt=""/>
				</div>
			</Stack>
			
			
			
			</div>
	);
}

export default App;
