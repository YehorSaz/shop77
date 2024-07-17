// import { API_URL, API_URL_UKR, HUGGING_FACE_API_TOKEN } from "@env";
// import axios from 'axios';
//
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
//
// const MAX_RETRIES = 3;
//
// export const apiCall = async (prompt: string) => {
//   let attempt = 0;
//   while (attempt < MAX_RETRIES) {
//     try {
//       const res = await axios.post(
//         API_URL,
//         {
//           inputs: prompt,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       console.log('answer', res.data);
//       return { success: true, data: res.data[0].generated_text };
//     } catch (err: any) {
//       if (err.response && err.response.status === 429) {
//         attempt += 1;
//         console.log(`Attempt ${attempt} failed with status 429. Retrying...`);
//         await delay(1000 * attempt); // Збільшення затримки з кожною спробою
//       } else {
//         console.log('error', err);
//         return { success: false, msg: err.message };
//       }
//     }
//   }
//   return { success: false, msg: 'Exceeded maximum retry attempts' };
// };
