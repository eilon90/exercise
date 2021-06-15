const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.get('/station/:lat/:lon/:att', async function(req, res) {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const att = req.params.att;
    const results = await axios.get(`https://ravkavonline.co.il/api/pos/service-station/search/?attributes=${att}&lat=${lat}&lon=${lon}`);
    const data = results.data;
    const shortData = data.data.results.map(d => [d.service_station.operating_company, d.service_station.address, d.service_station.activity_hours, d.service_station.comments]);
    res.send(shortData);
})

module.exports = router;