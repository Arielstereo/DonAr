import Donors from '@/models/Donors'
import Patients from '@/models/Patients'
import dbConnection from '@/utils/db'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function PUT (request) {
  await dbConnection()
  try {
    const { id } = await request.json()

    const patient = await Patients.findById(id).populate('donor')

    const donorId = patient.donor.map(d => d._id)[patient.donor.length - 1]
    const donor = await Donors.findById(donorId)
    if (patient) {
      patient.quantity = patient.quantity - 1
      donor.isConfirmated = true
      await patient.save()
      await donor.save()
      const transporter = nodemailer.createTransport(
        {
          service: 'gmail',
          auth: { user: 'arielstereo21@gmail.com', pass: 'ukzk pxmf ihfd jryk' }
        }
      )
      const mailOptions = {
        from: 'Donar',
        to: patient.email,
        subject: 'Has recibido un donante',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="width=device-width" name="viewport"/><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><meta name="x-apple-disable-message-reformatting"/><meta content="IE=edge" http-equiv="X-UA-Compatible"/><meta name="x-apple-disable-message-reformatting"/><meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection"/><meta content="light" name="color-scheme"/><meta content="light" name="supported-color-schemes"/><!--$--><style>
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      mso-font-alt: 'sans-serif';
      src: url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2');
    }

    * {
      font-family: 'Inter', sans-serif;
    }
  </style><style>blockquote,h1,h2,h3,img,li,ol,p,ul{margin-top:0;margin-bottom:0}</style></head><body style="margin:0"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:600px;min-width:300px;width:100%;margin-left:auto;margin-right:auto;padding:0.5rem"><tbody><tr style="width:100%"><td><h2 style="text-align:left;color:#111827;margin-bottom:12px;margin-top:0;font-size:30px;line-height:36px;font-weight:700"><strong>DonAr</strong></h2><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">Recibiste un donante de sangre.</p><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">${donor.username} ha confirmado la donación!</p><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">Faltan ${patient.quantity} donantes.</p><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">Suerte,<br/>El equipo de DonAr.</p></td></tr></tbody></table><!--/$--></body></html>`
      }
      await transporter.sendMail(mailOptions)
      return NextResponse.json('Quantity updated!')
    } else {
      return NextResponse.json('Patient not found!')
    }
  } catch (error) {
    console.log(error)
  }
}
