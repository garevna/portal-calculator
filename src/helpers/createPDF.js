const hr = {
  font: 'Helvetica',
  fontSize: 14,
  text: ' '.repeat(120),
  style: {
    underline: true
  },
  moveDown: 1
}

export const createPDF = async (address, data, result, rent) => {
  const report = []

  report.push({
    font: 'Helvetica-Bold',
    fontSize: 20,
    text: address,
    style: {
      align: 'center'
    },
    moveDown: 1
  })

  report.push({
    font: 'Helvetica',
    fontSize: 12,
    text: new Date().toISOString().slice(0, 10),
    color: '#777',
    style: {
      align: 'right'
    },
    moveDown: 1
  })

  report.push(hr)

  const line = {
    font: 'Helvetica',
    fontSize: 13,
    color: '#444'
  }

  for (const key in data) {
    report.push(Object.assign({}, line, { text: data[key].title, style: { width: 360, align: 'left', continued: true } }))

    const insertion = data[key].cost && data[key].value ? `${data[key].value}   (${data[key].cost})` : data[key].value

    report.push(Object.assign({}, line, { font: 'Helvetica-Bold', style: { align: 'right' }, text: insertion, moveDown: 1 }))
  }

  report.push(hr)

  report.push({
    font: 'Helvetica-Bold',
    fontSize: 16,
    text: 'Total cost',
    style: {
      width: 360,
      align: 'left',
      continued: true
    }
  })

  report.push({
    font: 'Helvetica-Bold',
    style: {
      align: 'right'
    },
    text: result,
    moveDown: 1
  })

  report.push({
    font: 'Helvetica-Bold',
    fontSize: 16,
    text: 'Total duct rental cost per month',
    style: {
      width: 360,
      align: 'left',
      continued: true
    }
  })

  report.push({
    font: 'Helvetica-Bold',
    style: {
      align: 'right'
    },
    text: rent,
    moveDown: 1
  })

  const response = await (await fetch('https://portal.dgtek.net/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BACKEND_API_KEY,
      Credentials: process.env.VUE_APP_CREDENTIALS
    },
    body: JSON.stringify(report)
  })).json()

  window.open(response.data, '_blank')
}
