
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
// const placeService = require('../place/place.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByPlacename,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('place')
        var places = await collection.find(criteria).toArray()
        return places
    } catch (err) {
        logger.error('cannot find places', err)
        throw err
    }
}

async function getById(placeId) {
    try {
        const collection = await dbService.getCollection('place')
        const place = await collection.findOne({ '_id': ObjectId(placeId) })

        return place
    } catch (err) {
        logger.error(`while finding place ${placeId}`, err)
        throw err
    }
}
async function getByPlacename(placename) {
    try {
        const collection = await dbService.getCollection('place')
        const place = await collection.findOne({ placename })
        return place
    } catch (err) {
        logger.error(`while finding place ${placename}`, err)
        throw err
    }
}

async function remove(placeId) {
    try {
        const collection = await dbService.getCollection('place')
        await collection.deleteOne({ '_id': ObjectId(placeId) })
    } catch (err) {
        logger.error(`cannot remove place ${placeId}`, err)
        throw err
    }
}

async function update(place) {
    try {
        const placeToSave = { ...place, _id:ObjectId(place._id)}
        // delete placeToSave._id
        const collection = await dbService.getCollection('place')
        await collection.updateOne({ "_id": placeToSave._id}, { $set: placeToSave })
        // console.log('placeToSave:', placeToSave)
        return placeToSave;
    } catch (err) {
        logger.error(`cannot update place ${place._id}`, err)
        throw err
    }
}

async function add(place) {
    try {
        const placeToAdd = { ...place, createdAt: Date.now() }
        const collection = await dbService.getCollection('place')
        await collection.insertOne(placeToAdd)
        return placeToAdd
    } catch (err) {
        logger.error('cannot insert place', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                placename: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}


