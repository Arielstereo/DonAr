import { Schema, model, models } from 'mongoose'

const DonorSchema = new Schema(
  {
    username: {
      type: 'string',
      required: [true, 'username is required']
    },
    email: {
      type: 'string',
      required: [true, 'email is required']
    },
    isConfirmated: {
      type: 'boolean',
      default: false
    },

    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
      }
    ]
  },
  {
    versionKey: false
  }
)

export default models?.Donor || model('Donor', DonorSchema)
