import {LOAD_BLOG, START, SUCCESS, FAIL} from '../constants'


export function loadBlog() {
  return (dispatch) => {
    dispatch({
      type: LOAD_BLOG + START
    });

    fetch(`https://api.myjson.com/bins/x3g2s`)

    .then(res => {
      return res.json()
    })
    .then(response => dispatch({      
      type: LOAD_BLOG + SUCCESS,
      payload: { response }
    }))
    .catch(error => {
      dispatch({
        type: LOAD_BLOG + FAIL,
        payload: { error }
      })
    })
  }
}


