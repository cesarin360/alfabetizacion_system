const usersCtrl = {};

const User = require('../models/User')
const passport = require('passport')
const { PDFDocument, StandardFonts, rgb  } = require('pdf-lib');
const fs = require('fs');

async function editPDF(inputPath, outputPath, replacementWord, replacementWord2, replacementWord3) {
    const pdfBuffer = await fs.promises.readFile(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const font = await pdfDoc.embedFont(StandardFonts.Courier);
    const pages = pdfDoc.getPages();
  
    for (const page of pages) {
      const { width, height } = page.getSize();
      const textSize = 60; // Set your desired font size
      const textSize1 = 17; // Set your desired font size
      const textSize2 = 25; // Set your desired font size
      const textWidth = font.widthOfTextAtSize(replacementWord, textSize);
      const textWidth1 = font.widthOfTextAtSize(replacementWord3, textSize2);
      const x = ((width - textWidth) / 2); // Center the text horizontally
      const x2 = ((width - textWidth1) / 2);
      const y = 240; // Set the vertical position of the text

      page.drawText(replacementWord, {
        x,
        y,
        font: font,
        size: textSize,
        color: rgb(0.5450980392156862, 0.4666666666666667, 0.1568627450980392)
      });

      page.drawText(replacementWord2, {
        x:560,
        y: y-47,
        font: font,
        size: textSize1,
        color: rgb(0.5450980392156862, 0.4666666666666667, 0.1568627450980392)
      });

      page.drawText(replacementWord3, {
        x:x2,
        y: y-170,
        font: font,
        size: textSize2,
        color: rgb(0.5450980392156862, 0.4666666666666667, 0.1568627450980392)
      });
    }
  
    const modifiedPdfBuffer = await pdfDoc.save();
    await fs.promises.writeFile(outputPath, modifiedPdfBuffer);
  }

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup')
}

usersCtrl.signup = async (req, res) => {
    const errors = []
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'La contraseña no coincide.' })
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe de tener al menos 4 caracteres.' })
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        })
    } else {
        const emailUser = await User.findOne({ email })
        if (emailUser) {
            req.flash('error_msg', 'El email ya esta en uso')
            res.redirect('/users/signup')
        } else {
            const newUser = new User({ name, email, password })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', 'Se ha registrado satisfactoriamente.')
            res.redirect("/users/signin")
        }
    }
}

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/users/perfil',
    failureFlash: true
})

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Ha cerrado sesión.');
    res.redirect('/users/signin')
}

usersCtrl.perfil = async (req, res) => {
    if (req.user) {
        const user = await User.findById(req.user.id)
        const firstLette = user.name.charAt(0)
        if (user) {
            const updatedAt= user.updatedAt.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            res.render('users/perfil', { user, updatedAt, firstLette })
        }
    } else {
        res.redirect('/users/signin')
    }
}

usersCtrl.diploma = (req, res) => {
    const {name_p, name, select_etapa} = req.body
    const inputPath = './src/public/docs/template.pdf'; 
    const outputPath = './src/public/docs/diploma.pdf';
    editPDF(inputPath, outputPath, name, select_etapa, name_p)
    setTimeout(() => res.download('./src/public/docs/diploma.pdf', function (error) {
        console.log("Error : ", error)
    }), 10000)
    
}

module.exports = usersCtrl