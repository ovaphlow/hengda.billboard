import moment from 'moment'

export const EditJournal = (body,callback) => {
  const auth = JSON.parse(localStorage.getItem('auth')) 
  if (auth !== null) {
    fetch(`./api/journal/edit/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        user_id: auth.id,
        user_uuid: auth.uuid,
        datime: moment().format('YYYY-MM-DD HH:mm'),
        category1: '个人用户',
        ...body
      })
    })
      .then(res => res.json())
      .then(callback)
  }
}