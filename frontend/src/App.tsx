import React, { useEffect, useState } from 'react';
import './App.css';
import { Helmet } from 'react-helmet';
import ConnectButton from './asset/ConnectButton';



function App() {

	
	
	return (
		<div className="App">
			<div className="font-face-gm" >
				<h1 style={{ color: 'red' }}>ft_transcendence</h1>
			</div>
			<Helmet>
				<style>{'body { background-color: black; }'}</style>
			</Helmet>
			<ConnectButton/>


			
			
			
			</div>
	);
}

export default App;
