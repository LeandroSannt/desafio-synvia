import Mail from '@ioc:Adonis/Addons/Mail'

interface EmailProps {
  to: string
  subject: string
  htmlView: {
    view: string
    props: Object
  }
}

class SendEmail {
  async email({ to, subject, htmlView }: EmailProps) {
    try {
      await Mail.send((message) => {
        message.from('').to(to).subject(subject).htmlView(htmlView.view, htmlView.props)
      })
    } catch (err) {}

    return
  }
}

export { SendEmail }
