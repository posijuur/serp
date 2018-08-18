import {LOAD_BLOG, START, SUCCESS} from '../constants'


const defaultState = {
    defArticles: [],
    isLoading: false
   }     
     
export default (infoBlog = defaultState, action) => {
  const {type, payload} = action;
  
  switch (type) {    
    case LOAD_BLOG + START: return Object.assign({}, infoBlog, { isLoading: true })
    case LOAD_BLOG + SUCCESS: return Object.assign({}, infoBlog, { defArticles: payload.response.blog, isLoading: false })
  }

  return infoBlog
}
