import './App.css';
import { useState } from 'react';
import { observer } from 'mobx-react';
import Stations from './components/Stations'
import './App.css';
const axios = require('axios');


const App = (observer((props) => {
    
  const [credit, setCredit] = useState(false);
  const [cash, setCash] = useState(false);
  const [ravkav, setRavkav] = useState(false);
  const [sells, setSells] = useState(false);
  const [manned, setManned] = useState(false);
  const [reload, setReload] = useState(false);
  const [stations, setStations] = useState([]);



    const search = async() => {
      navigator.geolocation.getCurrentPosition(success, error);
      async function success(loc) {
        const lat = loc.coords.latitude;
        const lon = loc.coords.longitude;
        let att = '';
        if (credit) {att += 'accepts_credit_card,'}
        if (cash) {att += 'accepts_cash,'}
        if (ravkav) {att += 'ravkav_services,'}
        if (sells) {att += 'sells_ravkav_reader,'}
        if (manned) {att += 'manned,'}
        if (reload) {att += 'reload_reservation,'}
        if (att !== '') {att = att.substring(0, att.length - 1);}
        
        const results = await axios.get(`http://localhost:4000/station/${lat}/${lon}/${att}`);
        results.data.forEach(d => setStations(results.data));
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
    }

    return (
      <div>
        <h1>Search Service Stations nearby</h1>
        <input id = "credit" type = "checkbox" onChange = {() => setCredit(!credit)} />
        <label for="credit">Accepts credit card</label><br></br>
        <input id = "cash" type = "checkbox" value = {false} onChange = {() => setCash(!cash)}/>
        <label for="cash">Accepts cash</label><br></br>
        <input id = "ravkav" type = "checkbox" value = {false} onChange = {() => setRavkav(!ravkav)}/>
        <label for="ravkav">Ravkav service</label><br></br>
        <input id = "sells" type = "checkbox" value = {false} onChange = {() => setSells(!sells)}/>
        <label for="sells">Sells Ravkav Reader</label><br></br>
        <input id = "manned" type = "checkbox" value = {false} onChange = {() => setManned(!manned)}/>
        <label for="manned">Manned</label><br></br>
        <input id = "reload" type = "checkbox" value = {false} onChange = {() => setReload(!reload)}/>
        <label for="reload">Reload reservations</label><br></br>
        <button onClick = {search}>Search</button>
        {stations.map(s => <Stations name = {s[0]} address = {s[1]} hours = {s[2]} comments = {s[3]}/>)}
      </div>

    )
}))

export default App;

