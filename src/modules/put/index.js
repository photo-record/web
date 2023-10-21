import axios from '../axios';

async function joinUser(data) {
  try {
    const result = await axios().put('/user/update', data);
    return result?.data;
  } catch (e) {
    throw e;
  }
}
export { joinUser };
