import { Schema, model, models } from 'mongoose'

const PatientSchema = new Schema(
  {
    username: {
      type: 'string',
      required: [true, 'username is required']
    },
    fullName: {
      type: 'string',
      required: [true, 'fullName is required']
    },
    quantity: {
      type: 'number',
      required: [true, 'quantity is required']
    },
    group: {
      type: 'string',
      required: [true, 'group is required']
    },
    dni: {
      type: 'number',
      required: [true, 'dni is required'],
      unique: true
    },
    email: {
      type: 'string',
      required: [true, 'email is required'],
      unique: true
    },
    place: {
      type: 'string',
      required: [true, 'place is required']
    },
    address: {
      type: 'string',
      required: [true, 'address is required']
    },
    schedule: {
      type: 'string',
      required: [true, 'schedule is required']
    },
    donor: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Donor'
      }
    ]
  },
  {
    versionKey: false
  }
)

export default models?.Patient || model('Patient', PatientSchema)
