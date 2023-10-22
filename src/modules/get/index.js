import axios from '../axios';

async function getContentsLists() {
  try {
    //body?.email
    const result = await axios().get('/contents_list');
    return result?.data;
  } catch (e) {
    console.error(e);
    return {
      result: false,
    };
  }
}
async function getContentsDetail(id) {
  try {
    const result = await axios().get(`/content/${id}`);
    return result?.data;
  } catch (e) {
    console.error(e);
    return {
      result: false,
    };
  }
}

export { getContentsLists, getContentsDetail };
