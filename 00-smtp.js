try {
    const result = await mailTransport.sendMail({
      from: '"Meadowlark Travel" <info@meadowlarktravel.com>', 
      to: 'yarinko.b@gmail.com',
      subject: 'Ваш тур Meadowlark Travel',
      text: 'Спасибо за заказ поездки в Meadowlark Travel. ' + 
      'Мы ждем Вас с нетерпением!',
    })
    console.log('письмо успешно отправлено: ', result) 
  } catch(err) {
    console.log('невозможно отправить письмо: ' + err.message) 
  }