import React, { useEffect, useState } from 'react';
import './App.css';
import { Helmet } from 'react-helmet';
import ConnectButton from './asset/ConnectButton';



function App() {

	
	
	return (
		<div className="App" min-height="1000px">
			<Helmet>
				<style>{'body { background-color: black; }'}</style>
			</Helmet>
			<ConnectButton/>


			
			
			
			</div>
	);
}

export default App;
