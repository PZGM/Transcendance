import React, { useEffect, useState } from 'react';
import './App.css';
import { Helmet } from 'react-helmet';
import ConnectButton from './asset/ConnectButton';



function App() {

	
	
	return (
		<div className="App">
			<Helmet>
				<style>{'body { background-color: black; }'}</style>
			</Helmet>
			<ConnectButton/>


			
			
			
			</div>
	);
}

export default App;
