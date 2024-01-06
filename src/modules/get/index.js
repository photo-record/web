import axios from '../axios';

async function getMy() {
  try {
    const result = await axios().get('/user/my');
    return result?.data ?? [];
  } catch (e) {
    console.error({ e });
    return [];
  }
}

async function getContentsLists() {
  try {
    //body?.email
    const result = await axios().get('/contents_list');
    return result?.data ?? [];
  } catch (e) {
    console.error({ e });
    return [];
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

export { getMy, getContentsLists, getContentsDetail };
