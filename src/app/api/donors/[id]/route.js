import Donor from '@/models/Donors'
import Patients from '@/models/Patients'
import dbConnection from '@/utils/db'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST (request, { params }) {
  await dbConnection()
  try {
    const { id } = await params
    const { username, email, isConfirmated } = await request.json()
    const donor = new Donor({
      username,
      email,
      patient: id,
      isConfirmated
    })
    await donor.save()

    const patient = await Patients.findById(id)
    patient.donor = [...patient.donor, donor._id]
    const updatePatient = await patient.save()

    const { place, address, schedule } = updatePatient

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'arielstereo21@gmail.com', pass: 'ukzk pxmf ihfd jryk' }
    })
    const mailOptions = {
      from: 'DonAr',
      to: email,
      subject: 'Confirmación de Registro de Donante',
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
  </style><style>blockquote,h1,h2,h3,img,li,ol,p,ul{margin-top:0;margin-bottom:0}</style></head><body style="margin:0"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:600px;min-width:300px;width:100%;margin-left:auto;margin-right:auto;padding:0.5rem"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:0px;margin-bottom:32px"><tbody style="width:100%"><tr style="width:100%"><td align="center" data-id="__react-email-column"></td></tr></tbody></table><h2 style="text-align:left;color:#111827;margin-bottom:12px;margin-top:0;font-size:30px;line-height:36px;font-weight:700"><strong>DonAr</strong></h2><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">Gracias ${username} por registrarte como donante! </p><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">Aqui tienes los datos del lugar donde tienes que presentarte:</p><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">${place}</p><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">${address}</p><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">${schedule}</p><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">Una vez que hayas asistido ingresa al siguiente link para confirmar tu asistencia.</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;text-align:left;margin-bottom:20px"><tbody><tr style="width:100%"><td><a href="http://localhost:3000/donor/${donor._id}" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;color:#ffffff;background-color:#d623a0;border-color:#d623a0;padding:12px 34px 12px 34px;border-width:2px;border-style:solid;font-size:14px;font-weight:500;border-radius:9999px" target="_blank"><span><!--[if mso]><i style="mso-font-width:425%;mso-text-raise:18" hidden>&#8202;&#8202;&#8202;&#8202;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px"> Confirmar</span><span><!--[if mso]><i style="mso-font-width:425%" hidden>&#8202;&#8202;&#8202;&#8202;&#8203;</i><![endif]--></span></a></td></tr></tbody></table><p style="font-size:15px;line-height:24px;margin:16px 0;text-align:left;margin-bottom:20px;margin-top:0px;color:#374151;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">Saludos,<br/>El equipo de DonAr.</p></td></tr></tbody></table><!--/$--></body></html>
  `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      donor,
      updatePatient
    })
  } catch (error) {
    console.log(error)
  }
}

export async function GET (request, { params }) {
  await dbConnection()
  try {
    const { id } = await params
    const donor = await Donor.findById(id).populate('patient')
    return NextResponse.json(donor)
  } catch (error) {
    console.log(error)
  }
}
