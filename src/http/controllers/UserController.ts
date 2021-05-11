/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../../models/User'
import { Role, RoleTypes } from '../../models/Role'
import bcrypt from 'bcrypt'

async function hashPassword(pass: string): Promise<string> {
  return await bcrypt.hash(pass, 10)
}

export const store = async (req: Request, res: Response): Promise<Response> => {
  // getting body
  const newUser = req.body;
  const selectedRole: RoleTypes = newUser.role
  try {
    const roleRepository = getRepository(Role)
    const role = await roleRepository.findOne({ slug: selectedRole })
    const userRepository = getRepository(User)
    if (!role) throw new Error('This role does not exist')
    newUser.password = await hashPassword(newUser.password)
    newUser.role = role
    const createdUser = await userRepository.save(newUser)
    return createdUser && role ? res.status(201).send() : res.status(400).send(`User ${role} could not be created`)
  } catch (error) {
    return res.status(500).json({
      err: error.message
    })
  }
}