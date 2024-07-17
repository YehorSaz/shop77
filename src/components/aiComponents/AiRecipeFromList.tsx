// import { GOOGLE_API_KEY } from '@env';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
//
// const proxyUrl = 'http://161.35.70.249:3128';
//
// const apiCall = async (prompt: string) => {
//   const data = {
//     'contents': [{ 'role': 'user', 'parts': [{ 'text': prompt }] }],
//   };
//   try {
//     const result = await axios({
//       method: 'post',
//       // eslint-disable-next-line max-len
//       url: `https://generativelanguage.googleapis.com/v1beta/models/geminy-1.5-flash:generateContent`,
//       data: { data },
//       headers: {
//         'Content-Type': 'application/json',
//         'x-goog-api-ke': `${GOOGLE_API_KEY}`,
//       },
//       proxy: {
//         host: '95.111.224.235',
//         port: 3128,
//       },
//     });
//
//     const response = result.data.response;
//     const text = response.text();
//     console.log(text);
//   } catch (err) {
//     console.log(err);
//   }
// };
//
// export const AiRecipeFromList = ({ navigation }: { navigation: any }) => {
//   useEffect(() => {
//     const startChat = async () => {
//       const prompt = 'Привіт';
//       await apiCall(prompt);
//     };
//     startChat();
//   }, []);
//
//   return (
//     <View style={styles.wrapper}>
//       <Text>AI recipe</Text>
//       <Button title={'Go back'} onPress={() => navigation.goBack()} />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//   },
// });
