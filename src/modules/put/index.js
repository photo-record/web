import axios from '../axios';

async function updateUser(data) {
  try {
    const result = await axios().put('/user/update', data);
    return result?.data;
  } catch (e) {
    throw e;
  }
}
export { updateUser };
