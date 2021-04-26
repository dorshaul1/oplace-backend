const placeService = require('./place.service')
const logger = require('../../services/logger.service')

async function getPlace(req, res) {
    try {
        const place = await placeService.getById(req.params.id)
        // console.log('place:', place)
        res.send(place)
    } catch (err) {
        logger.error('Failed to get place', err)
        res.status(500).send({ err: 'Failed to get place' })
    }
}

async function getPlaces(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0
        }
        const places = await placeService.query(filterBy)
        res.send(places)
    } catch (err) {
        logger.error('Failed to get places', err)
        res.status(500).send({ err: 'Failed to get places' })
    }
}

async function deletePlace(req, res) {
    try {
        await placeService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete place', err)
        res.status(500).send({ err: 'Failed to delete place' })
    }
}

async function updatePlace(req, res) {
    try {
        const place = req.body
        const savedPlace = await placeService.update(place)
        // console.log('savedPlace:', savedPlace)
        res.send(savedPlace)
    } catch (err) {
        logger.error('Failed to update place', err)
        res.status(500).send({ err: 'Failed to update place' })
    }
}

async function addPlace(req, res) {
    try {
        const place = req.body
        const savedPlace = await placeService.add(place)
        res.send(savedPlace)
    } catch (err) {
        logger.error('Failed to update place', err)
        res.status(500).send({ err: 'Failed to update place' })
    }
}

module.exports = {
    getPlace,
    getPlaces,
    deletePlace,
    updatePlace,
    addPlace
}