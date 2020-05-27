import moment from 'moment'

export const _EditJournal = (body,callback) => {
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

export const FavoriteJournal = (body,callback) => {
  const auth = JSON.parse(localStorage.getItem('auth')) 
  if (auth !== null) {
    fetch(`./api/favorite/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        user_id: auth.id,
        user_uuid: auth.uuid,
        category1: '个人用户',
        ...body
      })
    })
      .then(res => res.json())
      .then(callback)
  }
}

export const _BrowseJournal = (body,callback) => {
  const auth = JSON.parse(localStorage.getItem('auth')) 
  let data
  if (auth !== null) {
    data = {
      common_user_id: auth.id,
      user_uuid: auth.uuid,
      category1: '个人用户',
      datime: moment().format('YYYY-MM-DD HH:mm'),
      ...body
    }
  } else {
    data = {
      common_user_id: 0,
      user_uuid: '',
      category1: '个人用户',
      datime: moment().format('YYYY-MM-DD HH:mm'),
      ...body
    }
  }
  fetch(`./api/journal?uuid=${data.user_uuid}`,{
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(callback)
}