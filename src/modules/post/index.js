import axios from '../axios';

async function login(data) {
  try {
    //body?.email
    const result = await axios().post('/login', data);
    return result?.data;
  } catch (e) {
    console.error(e);
    return {
      result: false,
    };
  }
}
async function postContent(data) {
  try {
    const result = await axios().post('/content', data);
  } catch (e) {
    console.error(e);
    return {
      result: false,
    };
  }
}

export { postContent, login };
