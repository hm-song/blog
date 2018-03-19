
const handleError = (error) => {
    alert(error.response.data.message);
    window.location = '/';
    // return Promise.reject(error);
};

export default handleError;