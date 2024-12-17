import Patients from '@/models/Patients'
import dbConnection from '@/utils/db'
import { NextResponse } from 'next/server'

export async function POST (request) {
  await dbConnection()

  try {
    const { username, fullName, email, dni, quantity, group, address, place, schedule } = await request.json()

    const order = new Patients({
      username,
      fullName,
      email,
      dni,
      quantity,
      address,
      place,
      schedule,
      group
    })

    await order.save()

    return NextResponse.json(order)
  } catch (error) {
    console.log(error)
  }
}

export async function GET (request) {
  await dbConnection()
  try {
    const getAllPatients = await Patients.find({})
    const getQuantity = getAllPatients.find(patient => patient.quantity === 0)
    if (getQuantity) {
      await Patients.deleteOne(getQuantity)
    }
    return NextResponse.json(getAllPatients)
  } catch (error) {
    console.log(error)
  }
}
