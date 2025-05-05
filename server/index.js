require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }

});

app.post("/send-mail/",async(req,res)=>{
    const{to,subject,text,html} = req.body;

    try{
        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        });
        res.json({success:true,message:'Email sent'});
    }catch(error){
        res.status(500).json({success:false,error:error.message})
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`Mail server running on port ${PORT}`));