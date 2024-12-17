import Patients from '@/models/Patients'
import dbConnection from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET (request, { params }) {
  await dbConnection()

  try {
    const { id } = await params
    const patient = await Patients.findById(id)
    return NextResponse.json(patient)
  } catch (error) {
    console.log(error)
  }
}
