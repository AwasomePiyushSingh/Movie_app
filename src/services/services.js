import { API_KEY,BASE_URL } from "./config";

export const GetMovie = async (url,searchQuery=false) => {
  let API_URL = ''
  if(searchQuery){
    API_URL = `${BASE_URL}${url}?api_key=${API_KEY}&query=${searchQuery}`;
  }else{
    API_URL = `${BASE_URL}${url}?api_key=${API_KEY}`;
  }
  // console.log("api_url\n\n",API_URL)
  let response = await fetch(API_URL, {method: 'GET'});
  response = response.json();
  return response;
};
