import { fetchCall, requestMethod } from "../utils/ajax";


const getAllDishList = () => fetchCall("https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099", requestMethod.GET);

const dashboardService = {

    getAllDishList,

};

export  { dashboardService };
