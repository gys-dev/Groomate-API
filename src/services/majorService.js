import Boom from '@hapi/boom';

import {School, Major} from '../models'
import {compareHash} from '../utils/genHash'



/**
 * Get all schools.
 *
 * @returns {Promise}
 */
export function getAllSchools() {
  return School.fetchAll();
}



/**
 * Get major from school.
 *
 * @returns {Promise}
 */
export function getMajorBySchool(schoolId) {
  return new School({id: schoolId}).majors.fetch();
}
