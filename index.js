const { getBussinessAPI, getBussinessDetailsAPI, getBussinessReviewsAPI } = require('./serviceApi');

const query_params = {
  term: 'ice cream',
  location: 'Alpharetta GA',
  sort_by: 'review_count',
  limit: 5
}

async function getBussinessData(queryParams)
{
  try {
    let response = await getBussinessAPI(queryParams);
    let data = await response.json();
    data.businesses.map( async(item) =>{
      // console.log(`name:${item.name}`);
      // console.log(`id:${item.id}`);
      response = await getBussinessDetailsAPI(item.id);
      data = await response.json();

      response = await getBussinessReviewsAPI(item.id);
      let reviewData = await response.json();

      console.log(`name: ${item.name}`);
      console.log('\t','address');
      console.log('\t\t',`street: ${data.location.address1}`);
      console.log('\t\t',`city: ${data.location.city}`);

      console.log('\t','reviews');
      for (let i = 0; i<reviewData.reviews.length; i++) {
        console.log('\t\t',`text: ${reviewData.reviews[i].text}`);
        console.log('\t\t' , `name: ${reviewData.reviews[i].user.name}`);
      }
      console.log('*****************************************************************************')
    })
  }
  catch(e) {
    console.log(e);
  }
}

function getBussiness(sort_by) {
  //console.log(`sort_by: ${sort_by}`);
  query_params['sort_by'] = sort_by;
  return getBussinessData(query_params); 
}

// top five ice cream shops in Alpharetta are and why.
// There might be various criteria to selecting them
console.log('************top five ice cream shops in Alpharetta*************');

getBussiness('review_count'); // top by review
//getBussiness('rating'); // top by rating
//getBussiness('anyother'); // top by anyother


