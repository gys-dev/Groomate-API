import * as majorServices from '../services/majorService'


export function getAllSchools(req, res, next) {
    majorServices.getAllSchools()
    .then(data => res.json({data}))
    .catch(error => next(error))
}

export function getMajorsBySchool(req, res, next) {
    const schoolId = req.params.id;
    majorServices.getMajorBySchool(schoolId)
    .then(data => res.json({data}))
    .catch(error => next(error))
}

export function getAllMajors(req, res, next) {
    majorServices.getAll(schoolId)
    .then(data => res.json({data}))
    .catch(error => next(error))
}