/* eslint-disable @typescript-eslint/no-explicit-any */
import { Joi } from 'express-validation'
import { getEnumValues } from '../../common/utils'
import { RoleTypes } from '../../models/Role'

export const storeUserValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    role: Joi.string().valid(...getEnumValues(RoleTypes))
  }),
}
