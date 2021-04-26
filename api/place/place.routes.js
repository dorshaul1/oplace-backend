const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getPlace, getPlaces, deletePlace, updatePlace, addPlace} = require('./place.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPlaces)
router.get('/:id', getPlace)
router.put('/:id',  updatePlace)
router.post('/',  addPlace)

// router.put('/:id',  requireAuth, updatePlace)
router.delete('/:id', deletePlace)

module.exports = router